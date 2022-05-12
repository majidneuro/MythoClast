import * as React from 'react';
import {IButtonStyles, PrimaryButton, IconButton, ActionButton } from '@fluentui/react/lib/Button';
import { useId, useBoolean } from '@fluentui/react-hooks';
import { IIconProps,getTheme, FontWeights, ContextualMenu, IDragOptions,IStackStyles, IStackProps, mergeStyles, Stack, mergeStyleSets, IStackTokens, Modal, } from '@fluentui/react';
import { Text } from '@fluentui/react/lib/Text';
import { NeutralColors } from '@fluentui/theme';
import { TextField, MaskedTextField } from '@fluentui/react/lib/TextField';


const columnProps: Partial<IStackProps> = {
  tokens: { childrenGap: 15 },
 // styles: { root: { width: '100%' } },
};
const clickableStackTokens: IStackTokens = {
	padding: 10,	
};
const buttonStackTokens: IStackTokens = {
  padding: 30,    
};
const stackItemStyles2 = mergeStyles({
  display:'flex',
  justifyContent:'center',
  maxWidth:'500px',
  textAlign:'center',
});
const stackItemStyles: IStackStyles = {
  root: {
    alignItems:'center',
    display:'flex',
    justifyContent:'center',
    padding:20,
  },
};
const mailIcon: IIconProps = { iconName: 'Add' };
const stackTokens: IStackTokens = { childrenGap:5, padding:10, };
export const NoDashboard: React.FunctionComponent = () => { 
/*-Modale start-*/
const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] = useBoolean(false);
const [isDraggable, { toggle: toggleIsDraggable }] = useBoolean(false);
const [keepInBounds, { toggle: toggleKeepInBounds }] = useBoolean(false);
// Normally the drag options would be in a constant, but here the toggle can modify keepInBounds
const dragOptions = React.useMemo(
  (): IDragOptions => ({
    moveMenuItemText: 'Move',
    closeMenuItemText: 'Close',
    menu: ContextualMenu,
    keepInBounds,
  }),
  [keepInBounds],
);

// Use useId() to ensure that the IDs are unique on the page.
// (It's also okay to use plain strings and manually ensure uniqueness.)
const titleId = useId('title');
/*-Modale end-*/
  return (
    <>
      <Stack horizontal verticalAlign="center" tokens={clickableStackTokens}>
      <img src="img/no-dashboard.svg" alt="No Dashboard"></img>
      </Stack>
      <h2 className='ms-page-title ms-fontSize-20 ms-fontWeight-bold'>NO DASHBOARD CONFIGURED</h2>
      <Stack horizontal verticalAlign="center" className={stackItemStyles2}>
        <Text style={{ color: NeutralColors.gray130 }}>Please create a new dashboard and configure it with available widgets. You can create multiple dashboards.</Text>
      </Stack>
      <Stack horizontal verticalAlign="center" tokens={buttonStackTokens}>
        <PrimaryButton text="Create New" iconProps={mailIcon} onClick={showModal} allowDisabledFocus />
      </Stack>
      <Modal
        titleAriaId={titleId}
        isOpen={isModalOpen}
        onDismiss={hideModal}
        isBlocking={false}
        containerClassName={contentStyles.container}
        dragOptions={isDraggable ? dragOptions : undefined}
      >
        <div className={contentStyles.header}>
          <span id={titleId}>New Dashboard</span>
          <IconButton
            styles={iconButtonStyles}
            iconProps={cancelIcon}
            ariaLabel="Close popup modal"
            onClick={hideModal}
          />
        </div>
        <div className={contentStyles.body} >
        <Stack>
        <Stack gap='15'>
        <TextField label="Dashboard Name" placeholder="My Dashboard"/>
        <TextField label="Dashboard Desciption" multiline rows={3} />
        </Stack>
        </Stack>
        <Stack horizontal verticalAlign="center"  tokens={stackTokens} styles={stackItemStyles}> 
        <ActionButton text="Cancel" onClick={hideModal} allowDisabledFocus />
          <PrimaryButton text="Create Dashboard" allowDisabledFocus />
        </Stack>
        </div>
      </Modal>
        
    </>
  );
};

const cancelIcon: IIconProps = { iconName: 'Cancel' };

const theme = getTheme();
const contentStyles = mergeStyleSets({
  container: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'stretch',
    minWidth:'500px'
  },
  header: [
    
    theme.fonts.xLargePlus,
    {
      flex: '1 1 auto',
      borderTop: `4px solid ${theme.palette.themePrimary}`,
      color: theme.palette.neutralPrimary,
      display: 'flex',
      alignItems: 'center',
      fontWeight: FontWeights.semibold,
      padding: '12px 12px 14px 24px',
    },
  ],
  body: {
    flex: '4 4 auto',
    padding: '0 24px 24px 24px',
    overflowY: 'hidden',
    selectors: {
      p: { margin: '14px 0' },
      'p:first-child': { marginTop: 0 },
      'p:last-child': { marginBottom: 0 },
    },
  },
});
const stackStylesModalBtn: IStackStyles = {
  root: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
};
const stackProps: Partial<IStackProps> = {
  horizontal: true,
  tokens: { childrenGap: 40 },
  styles: { root: { marginBottom: 20 } },
};
const iconButtonStyles: Partial<IButtonStyles> = {
  root: {
    color: theme.palette.neutralPrimary,
    marginLeft: 'auto',
    marginTop: '4px',
    marginRight: '2px',
  },
  rootHovered: {
    color: theme.palette.neutralDark,
  },
};
  
export default NoDashboard;