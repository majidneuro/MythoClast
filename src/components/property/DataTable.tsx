import * as React from 'react';
import { Stack, IconButton, IIconProps, Text, TextField, ITextFieldStyles, MarqueeSelection, DetailsList, DetailsListLayoutMode, Selection, IColumn } from '@fluentui/react';
import TableFilters from './TableFilters';
import ManageColumns from './ManageColumns';
import ContactData from '../../components/contact/Contacts.json';
// Validation Button

const textFieldStyles: Partial<ITextFieldStyles> = { root: { maxWidth: '300px' } };
export interface IDetailsListBasicGridItem {
  key: number;
  name: string;
  value: number;  
}
export interface IDetailsListBasicGridState {
  items: IDetailsListBasicGridItem[];
  selectionDetails: string;
  columns: IColumn[];
}
export class PropertyDataTable extends React.Component<{}, IDetailsListBasicGridState> {
  private _selection: Selection;
  private _allItems: IDetailsListBasicGridItem[];
  //private _columns: IColumn[];
  constructor(props: {}) {
    super(props);
    this._selection = new Selection({
      onSelectionChanged: () => this.setState({ selectionDetails: this._getSelectionDetails() }),
    });
    // Populate with items for demos.
    this._allItems = [];
    for (let i = 0; i < 45; i++) {
      this._allItems.push({
        key: i,
        name: 'Item ' + i,
        value: i,
      });
    }
    const columns: IColumn[] = [
      { key: 'column1', name: 'Property Name', fieldName: 'name', minWidth: 100, maxWidth: 200, isResizable: true, isSorted: true, onColumnClick: this._onColumnClick },
      { key: 'column2', name: 'Property Code', fieldName: 'value', minWidth: 100, maxWidth: 200, isResizable: true, onColumnClick: this._onColumnClick },
      { key: 'column3', name: 'Fund', fieldName: 'value', minWidth: 100, maxWidth: 200, isResizable: true, onColumnClick: this._onColumnClick },
      { key: 'column4', name: 'Asset ID (External)', fieldName: 'value', minWidth: 100, maxWidth: 200, isResizable: true, onColumnClick: this._onColumnClick },
      { key: 'column5', name: 'Type', fieldName: 'value', minWidth: 100, maxWidth: 200, isResizable: true, onColumnClick: this._onColumnClick },
      { key: 'column6', name: 'Total NRA (Local)', fieldName: 'value', minWidth: 100, maxWidth: 200, isResizable: true, onColumnClick: this._onColumnClick },
      { key: 'column7', name: 'Total GFA (Local)', fieldName: 'value', minWidth: 100, maxWidth: 200, isResizable: true, onColumnClick: this._onColumnClick },
      { key: 'column8', name: 'Year Built', fieldName: 'value', minWidth: 100, maxWidth: 200, isResizable: true, onColumnClick: this._onColumnClick },
      { key: 'column9', name: 'Acquisition Date', fieldName: 'value', minWidth: 100, maxWidth: 200, isResizable: true, onColumnClick: this._onColumnClick },
      { key: 'column10', name: 'Disposition Date', fieldName: 'value', minWidth: 100, maxWidth: 200, isResizable: true, onColumnClick: this._onColumnClick },
      { key: 'column11', name: 'Acquisition Price', fieldName: 'value', minWidth: 100, maxWidth: 200, isResizable: true, onColumnClick: this._onColumnClick },
      { key: 'column12', name: 'Location', fieldName: 'value', minWidth: 100, maxWidth: 200, isResizable: true },
    ];
    this.state = {
      items: this._allItems,
      columns: columns,
      selectionDetails: this._getSelectionDetails(),
    };    
  }
  public render(): JSX.Element {
    const { items, selectionDetails, columns } = this.state;
    const iconProps = { iconName: 'Search' };
    const ListViewIcon: IIconProps = { iconName: 'BulletedList2' };
    const TileViewIcon: IIconProps = { iconName: 'GridViewMedium' };
      //console.log("Hi", items.length)
    return (
      <Stack className="ms__table">
      <Stack horizontal verticalAlign="center" horizontalAlign="space-between" className="ms__table-filter">
      <Stack horizontal verticalAlign="center" gap="10">
          <TextField          
            label=""
            className="ms__table-search"      
            placeholder="Search Here"
            onChange={this._onFilter}
            iconProps={iconProps}          
            styles={textFieldStyles}
          />
          <TableFilters />
        </Stack>

        <Stack horizontal verticalAlign="center" horizontalAlign="space-between" gap="10" className="ms__table-view">
         <Text className="record-no">Total Record: {ContactData.length}</Text>
         <Stack horizontal className="btn-group">
         <IconButton iconProps={ListViewIcon} allowDisabledFocus className="btn-white is-active shadow" />
         <IconButton iconProps={TileViewIcon} href="/propertyTileView" allowDisabledFocus className="btn-white shadow" />  
         </Stack>
         <ManageColumns />
        </Stack>
        {/*<div>{selectionDetails}</div>
        <Announced message={selectionDetails} />        
        <Announced message={`Number of items after filter applied: ${items.length}.`} />*/}
        </Stack>

        <MarqueeSelection selection={this._selection} className="ms__table-grid d-flex flex-column wh-100">
          <DetailsList
            items={items}
            columns={columns}
            setKey="set"
            layoutMode={DetailsListLayoutMode.justified}
            selection={this._selection}
            selectionPreservedOnEmptyClick={true}
            ariaLabelForSelectionColumn="Toggle selection"
            ariaLabelForSelectAllCheckbox="Toggle selection for all items"
            checkButtonAriaLabel="select row"
            onItemInvoked={this._onItemInvoked}
          />
        </MarqueeSelection>
      </Stack>
    );
  }

  private _getSelectionDetails(): string {
    const selectionCount = this._selection.getSelectedCount();

    switch (selectionCount) {
      case 0:
        return 'No items selected';
      case 1:
        return '1 item selected: ' + (this._selection.getSelection()[0] as IDetailsListBasicGridItem).name;
      default:
        return `${selectionCount} items selected`;
    }
  }
  private _onColumnClick = (ev: React.MouseEvent<HTMLElement>, column: IColumn): void => {
    const { columns, items } = this.state;
    const newColumns: IColumn[] = columns.slice();
    const currColumn: IColumn = newColumns.filter(currCol => column.key === currCol.key)[0];
    newColumns.forEach((newCol: IColumn) => {
      if (newCol === currColumn) {
        currColumn.isSortedDescending = !currColumn.isSortedDescending;
        currColumn.isSorted = true;        
      } else {
        newCol.isSorted = false;
        newCol.isSortedDescending = true;
      }
    });
    const newItems = _copyAndSort(items, currColumn.fieldName!, currColumn.isSortedDescending);
    this.setState({
      //columns: newColumns,
      items: newItems,
    });
  }

  private _onFilter = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, text: any): void => {
    this.setState({
      items: text ? this._allItems.filter(i => i.name.toLowerCase().indexOf(text) > -1) : this._allItems,
    });
  };

  private _onItemInvoked = (item: IDetailsListBasicGridItem): void => {
    alert(`Item invoked: ${item.name}`);
  };
}

function _copyAndSort<T>(items: T[], columnKey: string, isSortedDescending?: boolean): T[] {
  const key = columnKey as keyof T;
  return items.slice(0).sort((a: T, b: T) => ((isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1));
}


export default PropertyDataTable;