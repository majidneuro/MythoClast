import * as React from 'react';
import {  } from 'react-router-dom';
import { Stack, mergeStyleSets, IconButton, IIconProps, TextField, Text, ITextFieldStyles, DetailsList, IColumn} from '@fluentui/react';
import PropertyCommandBar from '../components/contact/CommandBar';
import TableFilters from '../components/contact/TableFilters';
import ManageColumns from '../components/contact/ManageColumns';
import ContactData from '../components/contact/Contacts.json';

const textFieldStyles: Partial<ITextFieldStyles> = { root: { maxWidth: '300px' } };

export interface IButtonContactProps {
  disabled?: boolean;
  checked?: boolean;
}
const classNames = mergeStyleSets({
	mcDashboard: {	  
	  width: '100%',
	  height: '100%'
	},
  mcCard: {
      borderRadius: '4px',
      boxShadow:'0 0 5px rgba(0,0,0,0.1)',
      padding:'10px 10px 0'
  },
  mcDashboardScroll : {
    overflowX : 'hidden',
    overflowY  : 'auto',
    padding: '0 15px',
    margin: '0 -15px'
    
  }  
  }); 

  const columns = [
    {key: 'column1', name: 'Code', fieldName: 'code', minWidth: 100, maxWidth:300, isResizable: true},
    {key: 'column2', name: 'Contact Name', fieldName: 'contactName', minWidth: 100, maxWidth:300, isResizable: true},
    {key: 'column3', name: 'Category', fieldName: 'category', minWidth: 100, maxWidth:300, isResizable: true},
    {key: 'column4', name: 'Email', fieldName: 'email', minWidth: 100, maxWidth:300, isResizable: true},
    {key: 'column5', name: 'Group', fieldName: 'group', minWidth: 100, maxWidth:300, isResizable: true},
    {key: 'column6', name: 'Industry Group', fieldName: 'industryGroup', minWidth: 100, maxWidth:300, isResizable: true},
    {key: 'column7', name: 'Industry', fieldName: 'industry', minWidth: 100, maxWidth:300, isResizable: true},
    {key: 'column8', name: 'Country', fieldName: 'country', minWidth: 100, maxWidth:300, isResizable: true},
    {key: 'column9', name: 'Status', fieldName: 'status', minWidth: 100, maxWidth:300, isResizable: true},
    {key: 'column10', name: 'Type', fieldName: 'type', minWidth: 100, maxWidth:300, isResizable: true},
    {key: 'column11', name: 'Bank Account', fieldName: 'bankAccount', minWidth: 100, maxWidth:300, isResizable: true}    
]

export const Contacts: React.FunctionComponent<IButtonContactProps> = props => { 
  const iconProps = { iconName: 'Search' };
  const ListViewIcon: IIconProps = { iconName: 'BulletedList2' };
  const TileViewIcon: IIconProps = { iconName: 'GridViewMedium' };
		return(
			<>
			<Stack className={classNames.mcDashboard}>	
      <Stack.Item>
          <h1 className='ms-page-title ms-fontSize-20 ms-fontWeight-semibold'>Contacts</h1> 
          

          <PropertyCommandBar />                        
          <Stack horizontal verticalAlign="center" horizontalAlign="space-between" className="ms__table-filter" style={{margin:'0 -15px'}}>
            <Stack horizontal verticalAlign="center" gap="10">
              <TextField
                label=""
                className="ms__table-search"
                placeholder="Search Here"
                //onChange={this._onFilter}
                iconProps={iconProps}
                styles={textFieldStyles}
              />
              <TableFilters />
            </Stack>
            <Stack horizontal verticalAlign="center" horizontalAlign="space-between" gap="10" className="ms__table-view">
                <Text className="record-no">Total Record: {ContactData.length}</Text>            
              <Stack horizontal className="btn-group">
              <IconButton iconProps={ListViewIcon} allowDisabledFocus className="btn-white is-active shadow" />
              <IconButton iconProps={TileViewIcon} href="/contactsTileView" allowDisabledFocus className="btn-white shadow" />  
              </Stack>
              <ManageColumns />              
            </Stack>
          </Stack>
        </Stack.Item>
        <Stack.Item grow className={classNames.mcDashboardScroll}>
            <div className='ms__table'>
              <div className='ms__table-grid'>
                <DetailsList 
                  items={ContactData}
                  columns={columns}                    
                /> 
              </div>
            </div>
            
        </Stack.Item>
			</Stack>
		  </>
		)	


    

}




export default Contacts