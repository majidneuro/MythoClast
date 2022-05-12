import * as React from 'react';
import { } from 'react-router-dom';
import { Stack, DirectionalHint, FontWeights, Text, mergeStyleSets, IIconProps, Callout, Link} from '@fluentui/react';
import { useBoolean, useId } from '@fluentui/react-hooks';
import { ActionButton } from '@fluentui/react/lib/Button';
import { NeutralColors, SharedColors } from '@fluentui/theme';
import DashboardCommandBar from '../components/dashboard/CommandBar'
import NoDashboard from '../components/dashboard/NoDashboard';

export interface IButtonExampleProps {
  disabled?: boolean;
  checked?: boolean;
}
const addIcon: IIconProps = { iconName: 'Add' };
const ButtonIcon: IIconProps = {iconName: 'ChevronUnfold10'};
  const classNames = mergeStyleSets({
	dashboardheading: {
		fontWeight: FontWeights.semibold,
		fontSize:'20px',
		color: SharedColors.cyanBlue20,
		padding: '0'
	},
	callout: {
		width: 320,
		borderRadius: '6px',
		overflow: 'hidden',
		padding: '0',
	},
	calloutLink: {	  
		padding: 20,
		borderBottom:'solid 1px',
		borderBottomColor: NeutralColors.gray30,
		selectors: {
			'&:hover': {
			  textDecoration: 'none',	
			  background: NeutralColors.gray10		  
			}
		  }	
	},
	calloutLinkTitle: {
		marginBottom: '10px',
		fontWeight: FontWeights.semibold
	},
	calloutFooter : {
		padding: 10,
		textAlign: 'center'
	},
	calloutActionBtn: {
		display: 'block',
		color: '#4285f4'
	}	
});
export const Dashboard: React.FunctionComponent = () => {
  const [isCalloutVisible, { toggle: toggleIsCalloutVisible }] = useBoolean(false);
  const [directionalHint] = React.useState<DirectionalHint>(DirectionalHint.bottomLeftEdge);
  const labelId = useId('callout-label');
  const descriptionId = useId('callout-description');
  const buttonId = useId('callout-button');
  return(
	  <>
	  	<Stack horizontal horizontalAlign="space-between" >
		  <ActionButton dir="rtl" iconProps={ButtonIcon} allowDisabledFocus className={classNames.dashboardheading} id={buttonId} onClick={toggleIsCalloutVisible}>Dashboard</ActionButton>
		  <DashboardCommandBar />
		</Stack>
		
		<Stack verticalAlign="center" horizontalAlign="center" className="wh-100">
			<NoDashboard />
		</Stack>
	<>
	{isCalloutVisible ? (
		<Callout
          ariaLabelledBy={labelId}
          ariaDescribedBy={descriptionId}
          className={classNames.callout}          
          target={`#${buttonId}`}
          onDismiss={toggleIsCalloutVisible}
          directionalHint={directionalHint}
		  isBeakVisible={false}
          setInitialFocus
        >			
			<Stack>
				<Link to="#" className={classNames.calloutLink}>
					<Text block variant="medium" className={classNames.calloutLinkTitle} id={labelId} >Dashboard 2</Text>
					<Text block variant="small" style={{ color: NeutralColors.gray100 }} id={descriptionId}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
				</Link>
			</Stack>
			<Stack>
				<Link to="#" className={classNames.calloutLink}>
					<Text block variant="medium" className={classNames.calloutLinkTitle} id={labelId} >Dashboard 1</Text>
					<Text block variant="small" style={{ color: NeutralColors.gray100 }} id={descriptionId}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
				</Link>
			</Stack>	
			<Stack horizontal horizontalAlign="center" className={classNames.calloutFooter}>
				<ActionButton iconProps={addIcon} text="Create New Dashboard" className={classNames.calloutActionBtn} />
			</Stack>
        </Callout>
		) : null}
	  </>
	</>
	)
} 
export default Dashboard;