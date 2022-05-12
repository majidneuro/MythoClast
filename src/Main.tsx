import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Property from './pages/Property';
import PropertyTileView from './pages/PropertyTileView';
import Budgeting from './pages/Budgeting/Budgeting';
import Contacts from './pages/Contacts';
import ContactsTileView from './pages/ContactTileView';
//import Reports from './pages/Reports';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
initializeIcons();

const Main = () => (
	<>
	<Switch>
        <Route exact path="/dashboard" component={Dashboard}/> 				
		<Route  path="/property" component={Property}/>
		<Route  path="/propertyTileView" component={PropertyTileView}/>
		<Route  path="/budgeting" component={Budgeting}/>
		<Route  path="/contacts" component={Contacts}/>
		<Route  path="/contactsTileView" component={ContactsTileView}/>
    </Switch>		
	</>
)
export default Main