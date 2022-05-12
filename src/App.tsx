import * as React from 'react';
import { Stack, mergeStyleSets } from '@fluentui/react';
import './scss/main.scss';
import Header from './components/layout/header/Header';
import SidebarNavbar from './components/layout/navbar/Navbar';
import Main from './Main';

import { store } from './app/store';
import { Provider } from 'react-redux';
import './i18n'

const classNames = mergeStyleSets({
  mcDashboard: {
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    height: '100%'
  },
  mcDashboardContainer: {
    overflowY: 'auto',
    overflowX: 'hidden',
    width: '100%',
    padding: '15px'
  }
});

function App() {
  return (
      <>
      <Provider store={store}>
        <Header />
        <Stack id="mc-dashboard" horizontal className={classNames.mcDashboard}>
          <SidebarNavbar />
          <Stack id="mc-container" className={classNames.mcDashboardContainer}>
            <Main />
          </Stack>
        </Stack>
        </Provider>
      </>
      );
}
      export default App;