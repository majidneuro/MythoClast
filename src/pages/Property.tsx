import * as React from 'react';
import { } from 'react-router-dom';
import { Stack, mergeStyleSets } from '@fluentui/react'
import PropertyCommandBar from '../components/property/CommandBar'
import PropertyDataTable from '../components/property/DataTable'

const classNames = mergeStyleSets({
	mcDashboard: {	  
	  width: '100%',
	  height: '100%'
	}
  });

export default class Property extends React.Component {	
	render(){    
		return(
			<>
			<Stack className={classNames.mcDashboard}>	
				<h1 className='ms-page-title ms-fontSize-20 ms-fontWeight-semibold'>Property</h1>
				<PropertyCommandBar />
				<PropertyDataTable />
			</Stack>
		  </>
		)
	}
}
