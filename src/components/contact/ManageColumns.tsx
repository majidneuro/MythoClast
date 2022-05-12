import * as React from 'react';
import { Stack, PrimaryButton, NeutralColors, mergeStyleSets, SearchBox, ActionButton, Text, IStackTokens, Checkbox, IconButton, Panel, IIconProps, ISearchBoxStyles, FontIcon } from '@fluentui/react';
import { useBoolean } from '@fluentui/react-hooks';

const searchBoxStyles: Partial<ISearchBoxStyles> = { 
    root: {         
        borderRadius: '4px',
        borderColor: '#ccc',
        fontSize: '12px'
    } 
};
const classNames = mergeStyleSets({
    cardColumns : {
        borderRadius: '6px',
        backgroundColor: '#f5f9ff'
    },
    cardHeader : {
        borderBottom: 'solid 1px rgba(0,0,0,0.05)',
        padding: '10px 15px'
    },
    cardBody: {       
        padding: '15px'
    },
    dragIcon: {       
        color: '#4285f4',
        opacity: '0.6',
        cursor: 'pointer',
        fontSize: '16px',
        '&:hover': {
            opacity: '1',
        }
    },
    badge : {
        padding: '2px 6px',
        fontSize: '10px',
        fontWeight: 'bold',
        borderRadius: '10px',
        color : 'white',           
        backgroundColor: 'black'              
    }
});

const SettingViewIcon: IIconProps = { iconName: 'Settings' };
const stackTokens: IStackTokens = { childrenGap: 15 };

export const ManageColumns: React.FunctionComponent = () => {
const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(false);
const onRenderFooterContent = React.useCallback(
    () => (
      <div dir="rtl">        
        <PrimaryButton onClick={dismissPanel} className="ml-10">
          Save
        </PrimaryButton>
        <ActionButton onClick={dismissPanel}>Cancel</ActionButton>
      </div>
    ),
    [dismissPanel],
  );
  return (
    <>

<IconButton iconProps={SettingViewIcon} onClick={openPanel} title="Notification" allowDisabledFocus className="btn-white shadow ml-10" />
      <Panel
        headerText="Manage Columns"
        isOpen={isOpen}        
        onDismiss={dismissPanel}
        closeButtonAriaLabel="Close"
        onRenderFooterContent={onRenderFooterContent}
        isFooterAtBottom={true}
      >
        <Text className="mb-20" style={{ color: NeutralColors.gray100 }} variant={'small'} block>Select the columns you want to have visible in the grid. To change the column order, drag and drop the visible fields.</Text>

       

    <Stack className={classNames.cardColumns}>
        <Stack horizontal verticalAlign="center" gap="20" className={classNames.cardHeader}>
            <span className="ms-fontWeight-semibold ms-fontSize-12">All Columns</span>
            <span className={classNames.badge}>11</span>
        </Stack>
        <Stack grow tokens={stackTokens} className={classNames.cardBody}>        
            <SearchBox placeholder="Filter Columns" styles={searchBoxStyles} onSearch={newValue => console.log('value is ' + newValue)} />

            <Stack horizontal verticalAlign="center" horizontalAlign="space-between">
                <Checkbox label="Code" defaultChecked />                
                <FontIcon aria-label="Drag" iconName="GripperDotsVertical" className={classNames.dragIcon} />
            </Stack>
            <Stack horizontal verticalAlign="center" horizontalAlign="space-between">
                <Checkbox label="Contact Name" defaultChecked />              
                <FontIcon aria-label="Drag" iconName="GripperDotsVertical" className={classNames.dragIcon} />
            </Stack>
            <Stack horizontal verticalAlign="center" horizontalAlign="space-between">
                <Checkbox label="Category" defaultChecked />
                <FontIcon aria-label="Drag" iconName="GripperDotsVertical" className={classNames.dragIcon} />
            </Stack>
            <Stack horizontal verticalAlign="center" horizontalAlign="space-between">
                <Checkbox label="Email" defaultChecked />
                <FontIcon aria-label="Drag" iconName="GripperDotsVertical" className={classNames.dragIcon} />
            </Stack>
            <Stack horizontal verticalAlign="center" horizontalAlign="space-between">
                <Checkbox label="Group" defaultChecked />
                <FontIcon aria-label="Drag" iconName="GripperDotsVertical" className={classNames.dragIcon} />
            </Stack>
            <Stack horizontal verticalAlign="center" horizontalAlign="space-between">
            <Checkbox label="Industry Group" defaultChecked />
                <FontIcon aria-label="Drag" iconName="GripperDotsVertical" className={classNames.dragIcon} />
            </Stack>
            <Stack horizontal verticalAlign="center" horizontalAlign="space-between">
                <Checkbox label="Industry" defaultChecked />
                <FontIcon aria-label="Drag" iconName="GripperDotsVertical" className={classNames.dragIcon} />
            </Stack>
            <Stack horizontal verticalAlign="center" horizontalAlign="space-between">
                <Checkbox label="Country" />               
            </Stack> 
            <Stack horizontal verticalAlign="center" horizontalAlign="space-between">
                <Checkbox label="Status" />               
            </Stack>
            <Stack horizontal verticalAlign="center" horizontalAlign="space-between">
                <Checkbox label="Type" />               
            </Stack> 
            <Stack horizontal verticalAlign="center" horizontalAlign="space-between">
                <Checkbox label="Bank Account" />               
            </Stack> 
        </Stack>
        </Stack>

      </Panel>
    </>
  );
};
export default ManageColumns;