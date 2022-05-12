import * as React from 'react';
import { } from 'react-router-dom';
import { Stack, mergeStyleSets } from '@fluentui/react'
import BudgetingCommandBar from '../../components/budgeting/CommandBar'
import BudgetingExcelPanel from '../../components/budgeting/BudgetingExcelPanel'

const classNames = mergeStyleSets({
	mcDashboard: {	  
	  width: '100%',
	  height: '100%'
	}
  });

export default class Budgeting extends React.Component {	
	render(){    
		return(
			<>
			<Stack className={classNames.mcDashboard}>	
				<h1 className='ms-page-title ms-fontSize-20 ms-fontWeight-semibold'>Budgeting</h1>
				<BudgetingCommandBar />
				<BudgetingExcelPanel />
			</Stack>
		  </>
		)
	}
}