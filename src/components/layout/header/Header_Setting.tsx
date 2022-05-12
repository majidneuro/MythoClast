import React from 'react';
import { ActionButton, Panel, IIconProps, IButtonStyles } from '@fluentui/react';
import { useBoolean } from '@fluentui/react-hooks';

const ButtonIcon: IIconProps = {iconName: 'Settings'};
export const HeaderSetting: React.FunctionComponent = () => {
const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(false);
  return (
    <>
      <ActionButton iconProps={ButtonIcon} onClick={openPanel} title="Notification" />
      <Panel
        headerText="Settings"
        isOpen={isOpen}
        onDismiss={dismissPanel}
        closeButtonAriaLabel="Close"
      >
        <p>Content goes here.</p>
      </Panel>
    </>
  );
};



export default HeaderSetting;
