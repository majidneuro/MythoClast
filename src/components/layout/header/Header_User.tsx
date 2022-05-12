import React from 'react';
import { Persona, PersonaSize, ContextualMenu, ContextualMenuItemType, IContextualMenuItem} from '@fluentui/react';

export const HeaderUser: React.FunctionComponent = () => {  
    const linkRef = React.useRef(null);
    const [showContextualMenu, setShowContextualMenu] = React.useState(false);
    const onShowContextualMenu = React.useCallback((ev: React.MouseEvent<HTMLElement>) => {
      ev.preventDefault(); // don't navigate
      setShowContextualMenu(true);
    }, []);
    const onHideContextualMenu = React.useCallback(() => setShowContextualMenu(false), []);
    const menuItems: IContextualMenuItem[] = [
        {
            key: 'profile',
            text: 'My Profile',
            href: '#', 
            target: '',
          },
         {
            key: 'prefrenses',
            text: 'My Prefenses',
            href: '#', 
            target: '',
          },
        {
          key: 'divider_1',
          itemType: ContextualMenuItemType.Divider,
        },        
        {
          key: 'logout',
          text: 'Logout',
          href: '#', 
          target: '',       
        }, 
       
        
      ];
  return (   
        <>
            <div onClick={onShowContextualMenu} ref={linkRef} className='btn-user d-flex align-items-center'>
            <Persona text="Jitendra Singh Chaudhary" size={PersonaSize.size32}  />
            <ContextualMenu
                items={menuItems}
                hidden={!showContextualMenu}
                target={linkRef}
                onItemClick={onHideContextualMenu}
                onDismiss={onHideContextualMenu}
            />
            <i className="ms-Icon ms-Icon--ChevronDown" aria-hidden="true"></i>
            </div>
        </>
  );
}
export default HeaderUser;