import * as React from 'react';
import { Link } from 'react-router-dom';
import { ActionButton, Stack } from '@fluentui/react';
export class HeaderLogo extends React.Component {
render() {
  return (   
        <>
            <Stack horizontal className="mc__logo">
              <ActionButton className="btn-hamburger" id="sidebarToggle"></ActionButton>
              <Link className="navbar-brand" to="/dashboard">TDL</Link>
            </Stack>
        </>
  );
}

}

export default HeaderLogo;