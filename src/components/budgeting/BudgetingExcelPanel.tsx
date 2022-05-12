import * as React from 'react';
import { IgrExcelXlsxModule } from 'igniteui-react-excel';
import { IgrExcelCoreModule, NamedReferenceCollection } from 'igniteui-react-excel';
import { IgrExcelModule } from 'igniteui-react-excel';
import { IgrSpreadsheetActionExecutedEventArgs, IgrSpreadsheetModule, SpreadsheetAction } from 'igniteui-react-spreadsheet';
import { IgrSpreadsheet } from 'igniteui-react-spreadsheet';
import { ExcelUtility } from '../../utils/ExcelUtility';
import { Workbook } from 'igniteui-react-excel';
import { SpreadsheetCellRange } from 'igniteui-react-spreadsheet';
import { IDropdownOption, Dropdown } from '@fluentui/react';

import { connect } from 'react-redux';

import {
  selectProperty,
  updateData
} from './budgetingSlice';

IgrExcelCoreModule.register();
IgrExcelModule.register();
IgrExcelXlsxModule.register();
IgrSpreadsheetModule.register();

const Properties: IDropdownOption[] = [

  { key: 'item1', text: 'Property 1' },
  { key: 'item2', text: 'Property 2' },
  { key: 'item3', text: 'Property 3' },
  { key: 'item4', text: 'Property 4' },
  { key: 'item5', text: 'Property 5' },
];
class BudgetingExcelPanel extends React.Component<any, any> {
  public spreadsheet!: IgrSpreadsheet;
  public mastDataObject!: object;
  constructor(props: {}) {
    super(props);

    this.onSpreadsheetRef = this.onSpreadsheetRef.bind(this);
    this.openFile = this.openFile.bind(this);

    this.state = {
      updatedData: {},
      allRanges: {},
      editedDataInfo: {}
    }
  }

  public findAllRanges = () => {
    let nameRef = new NamedReferenceCollection(this.spreadsheet.workbook);
    let allRangeInfo = [];
    for (let i = 0; i < nameRef.workbook._namedReferences$i.count; i++) {
      // for (let i = 0; i < 1; i++) {
      let singleRangeName = nameRef.workbook._namedReferences$i.item(i).name;
      let rangeAddress = nameRef.find(singleRangeName).formula;
      let onlyCellAddress = rangeAddress.split("!");
      let rangeInfo = new SpreadsheetCellRange(onlyCellAddress[1]);

      console.log("Range name " + i + ' : ' + singleRangeName)
      console.log("Range address" + i + ' : ' + rangeAddress)
      let rangeValues = []
      if (rangeInfo.firstColumn === rangeInfo.lastColumn || singleRangeName.includes("row")) {

        for (let regionCell = rangeInfo.firstRow; regionCell <= rangeInfo.lastRow; regionCell++) {
          let value = this.spreadsheet.workbook.worksheets(0).rows(regionCell).getCellText(rangeInfo.firstColumn);
          if (value == "") {
            rangeValues.push(this.spreadsheet.workbook.worksheets(0).rows(0).getCellText(0))
          } else {
            rangeValues.push(value)
          }

        }
      } else {
        for (let regionCell1 = rangeInfo.firstColumn; regionCell1 <= rangeInfo.lastColumn; regionCell1++) {
          let value = this.spreadsheet.workbook.worksheets(0).rows(rangeInfo.firstRow).getCellText(regionCell1);
          if (value == "") {
            rangeValues.push(this.spreadsheet.workbook.worksheets(0).rows(rangeInfo.firstRow).getCellText(rangeInfo.firstColumn))
          } else {
            rangeValues.push(value)
          }
        }
      }

      let rangeObj = {
        rangeName: singleRangeName,
        rangeObject: rangeInfo,
        rangeValues,
        rangeInfo: {
          firstRow: rangeInfo.firstRow,
          lastRow: rangeInfo.lastRow,
          firstColumn: rangeInfo.firstColumn,
          lastColumn: rangeInfo.lastColumn,
        }
      }
      allRangeInfo.push(rangeObj);
    }
    console.table(allRangeInfo);
    this.setState({ allRanges: allRangeInfo })
  }

  public changeWorkSheet(wb: Workbook) {
    this.spreadsheet.workbook = wb;

  }

  public isAnyCellOfRangeIsLocked = (cellRange: string) => {
    let returnValue = false;
    let activeWorkSheetIndex = this.spreadsheet.activeWorksheet.sheetIndex;
    let cellValueAndAddress = this.getCellValueAndAddress(cellRange);
    cellValueAndAddress.forEach(({ row, column }) => {
      if (this.spreadsheet.workbook.worksheets(activeWorkSheetIndex).rows(row).getCellFormat(column).locked === null) {
        returnValue = true;
      }
    })
    return returnValue;
  }

  public validateDataBeforeUpdate = (s: IgrSpreadsheet) => {
    let activeWorkSheetIndex = this.spreadsheet.activeWorksheet.sheetIndex;
    let addressString: string = s.activeSelection.cellRangesAddress;
    let isAnySelectedCellLock = this.isAnyCellOfRangeIsLocked(addressString)
    //s.activeSelectionCellRangeFormat.locked == true *ISSUE only works when first selected cell is locked*
    if (this.spreadsheet.workbook.worksheets(activeWorkSheetIndex).isProtected == true && isAnySelectedCellLock == true) {
      return false;
    }else{
      return true;
    }
  }

  public onSpreadsheetActionExecuted = (s: IgrSpreadsheet, e: IgrSpreadsheetActionExecutedEventArgs) => {
    // console.log(s.activeSelection.cellRangesAddress);
    if(!this.validateDataBeforeUpdate(s)){
      return false;
    }
    // console.log("Total number of worksheets", this.spreadsheet.workbook._worksheets$i.count)
    // console.log(s.activeSelection.cellRangesAddress, SpreadsheetAction, e.command);
    if (e.command === SpreadsheetAction.Paste || e.command === SpreadsheetAction.Cut || e.command === SpreadsheetAction.ClearContents || e.command === SpreadsheetAction.ExitEditModeAndUpdateSelectedCells) {
      let addressString: string = s.activeSelection.cellRangesAddress;
      let cellInfo: Array<object> = this.getCellValueAndAddress(addressString);
      if (cellInfo.length > 0) {
        cellInfo.forEach((cell: any) => {
          this.setCellUpdatedData(cell.cellValue, cell.row, cell.column);
        })
      }
    }
  }

  public getCellValueAndAddress(updatedCellRangeAdedress: string) {
    let rangeInfo = new SpreadsheetCellRange(updatedCellRangeAdedress);
    let { firstRow, lastRow, firstColumn, lastColumn } = rangeInfo;

    let resultSet = [];

    for (let row = firstRow; row <= lastRow; row++) {
      for (let column = firstColumn; column <= lastColumn; column++) {
        let cellValue = this.spreadsheet.workbook.worksheets(0).rows(row).getCellValue(column) == null ? "" : this.spreadsheet.workbook.worksheets(0).rows(row).getCellValue(column);
        resultSet.push({ cellValue, row, column });
      }
    }
    return resultSet;
  }

  public setCellUpdatedData(cellValue: any, updatedRowNumber: any, updatedColumnNumber: any) {
    let targetedRangeNames: Array<any> = [];
    this.state.allRanges.forEach((range: any) => {
      if (updatedRowNumber >= range.rangeInfo.firstRow && updatedRowNumber <= range.rangeInfo.lastRow && (updatedColumnNumber >= range.rangeInfo.firstColumn && updatedColumnNumber <= range.rangeInfo.lastColumn)) {
        targetedRangeNames.push(range.rangeValues[updatedRowNumber - range.rangeInfo.firstRow] || range.rangeValues[0]);
      } else if (updatedColumnNumber >= range.rangeInfo.firstColumn && updatedColumnNumber <= range.rangeInfo.lastColumn) {
        targetedRangeNames.push(range.rangeValues[updatedColumnNumber - range.rangeInfo.firstColumn]);
      }
    })
    let editedDataInfo = { [targetedRangeNames.join(",")]: cellValue };
    this.props.updateData(editedDataInfo);
  }

  public editModeExited = (s: IgrSpreadsheet, ui: any) => {
    if(!this.validateDataBeforeUpdate(s)){
      return false;
    }
    let updatedColumnNumber = ui.cell.column;
    let updatedRowNumber = ui.cell.row;
    let cellValue = this.spreadsheet.workbook.worksheets(0).rows(updatedRowNumber).getCellValue(updatedColumnNumber);
    this.setCellUpdatedData(cellValue, ui.cell.row, ui.cell.column);
  }

  public openFile(selectorFiles: FileList) {
    if (selectorFiles != null && selectorFiles.length > 0) {
      ExcelUtility.load(selectorFiles[0]).then((w) => {
        this.spreadsheet.workbook = w;
        this.findAllRanges();
      }, (e) => {
        console.error("Workbook Load Error");
      });
    }
  }

  public handlePropertyChange = (event: any, item: any): void => {
    this.props.selectProperty(item.key)
  };

  public onSpreadsheetRef(spreadsheet: IgrSpreadsheet) {
    if (!spreadsheet) { return; }

    this.spreadsheet = spreadsheet;

    const url = "./demoData.xlsx"
    ExcelUtility.loadFromUrl(url).then((w) => {
      this.spreadsheet.workbook = w;
      this.findAllRanges(); 
    });
  }

  public render(): JSX.Element {
    return (
      <div className="ms__table d-flex flex-column">
        <div className='d-flex ms__table-filter align-items-center justify-content-space-between'>
          <input type="file" onChange={(e) => this.openFile(e.target.files as FileList)} accept=".xls, .xlt, .xlsx, .xlsm, .xltm, .xltx" />
          {/* <Dropdown
            placeholder="Select Property"
            className="mb-10 col-md-5"
            options={Properties}
            onChange={this.handlePropertyChange}
          /> */}
           <Dropdown
            placeholder="Select Property"
            className="mb-10 col-md-5"
            options={Properties}
            onChange={this.handlePropertyChange}
          />
        </div>
        {/* <div className="d-flex align-items-center ms__table-filter">
        

        </div> */}
        <div className="ms__table-grid d-flex flex-column wh-100">
          <IgrSpreadsheet ref={this.onSpreadsheetRef} height="100%" width="100%" ActionExecuted={this.onSpreadsheetActionExecuted} editModeExited={this.editModeExited} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = function (state: any) {
  return {
    selectedProfile: state.selectProperty
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    selectProperty: (property: any) => { dispatch(selectProperty(property)) },
    updateData: (data: any) => { dispatch(updateData(data)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BudgetingExcelPanel);