import * as React from 'react';
import { Link, Label, DelayedRender, Callout, Text, ActionButton, DirectionalHint } from '@fluentui/react';
import { useBoolean, useId } from '@fluentui/react-hooks';
import { DefaultButton } from '@fluentui/react/lib/Button';

interface Props {
  title: string;
  dropdown: any;
  link: any;
  icon: any;
  visited: any;
}

export const CalloutDropdown: React.FunctionComponent<Props> = ({title, dropdown, link, icon, visited}) => {
  const [isCalloutVisible, { toggle: toggleIsCalloutVisible }] = useBoolean(false);
  const buttonId = useId('callout-button');
  //console.log("Hi", dropdown)
  return (
    <>
      <DefaultButton
          id={buttonId}
          onClick={toggleIsCalloutVisible}
          text={'...'}
          className="callout-toggle"                    
        />
      
      {isCalloutVisible && (
        <Callout
        className="calloutnav"        
        gapSpace={0}
        target={`#${buttonId}`}
        onDismiss={toggleIsCalloutVisible}
        directionalHint={DirectionalHint.bottomLeftEdge}
        setInitialFocus
        //coverTarget
      >
          <DelayedRender>
          

            
            <Text>
            <div className="calloutnav__header d-flex align-items-center">
              <div className="calloutnav__header-icon">   
                {
                (icon)?
                <img src={icon} alt=""></img> 
                : ''}             
              </div>
              <div className="calloutnav__header-title">
                {title}
              </div> 
              <ActionButton href={link} allowDisabledFocus className="calloutnav__header-link text-primary">View</ActionButton>                          
            </div> 
            <div className="calloutnav__body">                       
                    <div className="ms-Grid" dir="ltr">   
                      <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-Grid-col ms-sm6">
                          <Label>Quick Links</Label>
                          <ul className="calloutnav__nav">
                            {  
                              dropdown.map((data:any) =>
                              <li><a href={data.url}>{data.title}</a></li>
                              )
                            }
                            </ul>
                        </div>
                        <div className="ms-Grid-col ms-Grid-col ms-sm6">
                          <Label>Most Visited</Label> 
                          <ul className="calloutnav__nav">                 
                          {                          
                            visited.map((links:any) =>
                            <li className="calloutnav__nav-item"><Link className="calloutnav__nav-link" href={links.url}>{links.title}</Link></li>
                            )
                          }   
                          </ul>         
                        </div>
                      </div>   
                    </div>       
                  </div>             

            </Text>
          </DelayedRender>
        </Callout>
      )}
    </>
  );
};

export default CalloutDropdown;