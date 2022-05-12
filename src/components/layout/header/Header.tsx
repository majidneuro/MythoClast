import * as React from 'react';
import { Stack, mergeStyleSets } from '@fluentui/react';
import HeaderLogo from './Header_Logo';
//import { render } from 'react-dom'

import HeaderSearch from './Header_Search';
import HeaderSetting from './Header_Setting';
import HeaderNotify from './Header_Notify';
import HeaderHelp from './Header_Help';
import HeaderUser from './Header_User';

const classNames = mergeStyleSets({
  mcHeaderRight: {
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    height: '100%'
  }  
});

export class Header extends React.Component {
render() {
  return (   
        <>
            <Stack horizontal verticalAlign="center" id="mc-header" className="mc__header">
              <HeaderLogo />               
              <HeaderSearch />          
              <Stack 
                horizontal 
                verticalAlign="center"
                gap="15"                
                horizontalAlign="end"  
                id="mcHeaderRight"
                className="mc-header-right"         
              >
                <HeaderSetting />
                <HeaderNotify />
                <HeaderHelp />
                <HeaderUser />
              </Stack>                            
            </Stack>
        </>
  );
}

}

export default Header;