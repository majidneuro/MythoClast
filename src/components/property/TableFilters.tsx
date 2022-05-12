import React from 'react';
import { Stack, PrimaryButton, ActionButton, Checkbox, TextField, DefaultButton, Panel, IIconProps, IDropdownOption, Dropdown } from '@fluentui/react';
import { useConst, useBoolean } from '@fluentui/react-hooks';

const DropdownFund: IDropdownOption[] = [
    
    { key: 'item1', text: 'Item 1' },
    { key: 'item2', text: 'Item 2' },
    { key: 'item3', text: 'Item 3' },
    { key: 'item4', text: 'Item 4' },
    { key: 'item5', text: 'Item 5' },    
  ];
const ButtonIcon: IIconProps = {iconName: 'Breadcrumb'};

export const TableFilters: React.FunctionComponent = () => {
  const menuProps = useConst(() => ({
    shouldFocusOnMount: true,
    items: [
      { key: 'item1', text: 'Item 1' },
    { key: 'item2', text: 'Item 2' },
    { key: 'item3', text: 'Item 3' },
    { key: 'item4', text: 'Item 4' },
    { key: 'item5', text: 'Item 5' },   
    ],
  }));
const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(false);
const onRenderFooterContent = React.useCallback(
    () => (
      <div dir="rtl">        
        <PrimaryButton onClick={dismissPanel} className="ml-10">
          Apply
        </PrimaryButton>
        <ActionButton onClick={dismissPanel}>Cancel</ActionButton>
      </div>
    ),
    [dismissPanel],
  );
  return (
    <>
      <Stack horizontal gap="10">
      <DefaultButton text="Validations" className="text-medium" menuProps={menuProps} />
      <DefaultButton iconProps={ButtonIcon} onClick={openPanel} title="Notification" text="Add Filters" className="text-medium" />
      </Stack>

      <Panel
        headerText="Filters"
        isOpen={isOpen}        
        onDismiss={dismissPanel}
        closeButtonAriaLabel="Close"
        onRenderFooterContent={onRenderFooterContent}
        isFooterAtBottom={true}
      >
        
         <Dropdown
            placeholder="Select Fund"
            className="mb-10"
            label="Fund"
            options={DropdownFund}           
        />
        <Dropdown
            placeholder="Select Country"
            label="Country"
            className="mb-10"
            options={DropdownFund}           
        />
         <TextField label="Name" className="mb-10" />
         <TextField label="Code" className="mb-10" />
         <Dropdown
            placeholder="Select Category"
            className="mb-20"
            label="Category"
            options={DropdownFund}           
        />
        <Checkbox label="Save this search for future" defaultChecked />

      </Panel>
    </>
  );
};
export default TableFilters;