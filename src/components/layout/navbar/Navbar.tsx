import * as React from 'react';
import { Stack } from '@fluentui/react';
import { Link } from 'react-router-dom';
import BottomLinks from './Bottom_Links';
import navs from './navbar.json';
import CalloutDropdown from './callout';
import { Scrollbars } from 'react-custom-scrollbars';
//import {  } from 'react-router-dom'

window.addEventListener('DOMContentLoaded', event => {  
  const sidebarToggle = document.body.querySelector('#sidebarToggle');
  if (sidebarToggle) {
      if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
           document.body.classList.toggle('sb-sidenav-toggled');
      }
      sidebarToggle.addEventListener('click', event => {
          event.preventDefault();
          document.body.classList.toggle('sb-sidenav-toggled');
          //localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
      });
  }
  const sidebarDrawerToggle = document.body.querySelector('#sidebar-drawer');
  if (sidebarDrawerToggle) {
      if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
           document.body.classList.toggle('sb-sidenav-toggled');
      }
      sidebarDrawerToggle.addEventListener('click', event => {
          event.preventDefault();
          document.body.classList.toggle('sb-sidenav-toggled');
          //localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
      });
  }

});

export default class SidebarNavbar extends React.Component {
  render() {
  return (
    <>
    <Stack id="mc-sidebar">      
            <Stack className="mc-sidebar-drawer" id="sidebar-drawer">&nbsp;</Stack>    
            <Stack horizontal id="mc-sidebar__Stack" className="sidebar__nav"> 
            <Scrollbars autoHide autoHeightMax={1000} autoHideTimeout={1000}>
              <ul className="nav">              
              { navs.map(item => {
                return (
                  
                  <li className="nav__item" key={item.id}>                     
                    <Link className="nav__link" to={item.url}>
                      <div className="nav__link-icon">
                      {(item.icon)?
                        <img src={item.icon} alt="" className="icon-default"></img> 
                        : ''}
                      {(item.iconHover)?
                        <img src={item.iconHover} alt="" className="icon-hover"></img> 
                        : ''}                     
                      </div>
                      <span className="nav__link-text">{item.title}</span>                    
                    </Link>
                    {
                      (item.dropdownShow)?                      
                   <>
                   <CalloutDropdown 
                   title={item.title} 
                   icon={item.iconHover} 
                   link={item.url} 
                   dropdown={item.dropdown} 
                   visited={item.visited}
                   />
          </>
      : ''}
          </li> 
          
          )
      })}  
              </ul>
             
              </Scrollbars>
              <BottomLinks />   
    </Stack>                       
  </Stack>
  </>
  );
}
}