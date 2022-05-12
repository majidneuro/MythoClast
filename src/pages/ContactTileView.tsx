import * as React from 'react';
import { Link } from 'react-router-dom';
import { Stack, mergeStyleSets, Image, Text, Checkbox, IImageProps, ICheckboxStyles, ImageFit, IconButton, IIconProps, TextField, ITextFieldStyles, ActionButton, SharedColors, getTheme, FontWeights, ICommandBarItemProps, CommandBar, IStackStyles, Modal, Label, Pivot, PivotItem, IButtonStyles} from '@fluentui/react';
import { Facepile, OverflowButtonType } from '@fluentui/react/lib/Facepile';
import { Persona, PersonaSize, PersonaPresence } from '@fluentui/react/lib/Persona';
import { useBoolean, useId } from '@fluentui/react-hooks';
import { NeutralColors } from '@fluentui/theme';
import PropertyCommandBar from '../components/contact/CommandBar';
import TableFilters from '../components/contact/TableFilters';
import ManageColumns from '../components/contact/ManageColumns';
import ContactData from '../components/contact/Contacts.json';

const textFieldStyles: Partial<ITextFieldStyles> = { root: { maxWidth: '300px' } };

export interface IButtonPropertyProps {
  disabled?: boolean;
  checked?: boolean;
}
const favOutlineIcon: IIconProps = { iconName: 'FavoriteStar' };
const favFillIcon: IIconProps = { iconName: 'FavoriteStarFill' };


const classNames = mergeStyleSets({
	mcDashboard: {	  
	  width: '100%',
	  height: '100%'
	},
  mcCard: {
      borderRadius: '4px',
      boxShadow:'0 0 5px rgba(0,0,0,0.1)',
      padding:'10px 10px 0'
  },
  mcDashboardScroll : {
    overflowX : 'hidden',
    overflowY  : 'auto',
    padding: '20px 8px',
    margin: '0 -15px'
  },
  mcCardHeader: {
    position: 'relative',
    borderRadius: '4px',
    background: '#ddd',
    padding:'0 0 50%',
    overflow: 'hidden'
  },
  mcCardImage: {
    position: 'absolute',
    height: '100%',
    width: '100%'
  },
  mcCardHeaderAction: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    padding: '5px 10px 0',
    color: '#fff',
    zIndex: '2',
    background: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 100%)'
  },
  mcCardHeaderActionIcon : {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    background:'#ffffff',
    textAlign: 'center',
    lineHeight: '20px',
    color: 'black',
    cursor: 'pointer'
  },
  mcCardHeaderTitle: {
    position: 'absolute',
    bottom: '0',
    left: '0',
    width: '100%',
    padding: '5px 10px',
    color: '#fff',
    background: 'linear-gradient(0deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 100%)'
  },
  mcCardFooter: {
    background: '#f5f9ff',
    color:'#0b49ae',
    margin: '0 -10px',
    padding: '10px',
    borderRadius: '0 0 4px 4px',
    fontSize: '12px'
  },
  modalTitleBar: {
    background: '#f5f9ff',
    padding: '10px 24px',
    margin: '0 -24px',
  },
  stackItemLabelStyles: {
    fontSize: '11px'
  },
  stackItemCardValueStyles: {
    fontSize: '12px',
    fontWeight: '600',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  stackItemValueStyles: {
    fontSize: '12px',
    fontWeight: '600',
  },
  stackItemColor : {
    width: '14px',
    height: '14px',
    borderRadius: '4px',
    marginRight: '5px',
    verticalAlign: 'middle',
    display: 'inline-block',
    backgroundColor: '#0b49ae'
  },
  stackItemDevider : {
    borderTop: 'solid 1px rgba(0,0,0,0.1)',
    paddingTop: '15px'
    },
    stackItemSidebar : {
      minWidth : '180px',
      padding : '10px 30px 0 0',
      borderRight: 'solid 1px rgba(0,0,0,0.1)',
    },
    stackItemSidebarMap : {
      overflow: 'hidden',
      borderRadius: '10px',
      position: 'relative',
      height: '200px'
    },
    stackItemSidebarMapIframe : {
      position: 'absolute',
      width: '100%',
      height: '100%',
      border: 'none',
      top: 0,
      left: 0
    },
    iconRed : {
      color: 'red',
      icon: {color: 'white', fontSize: 72},
    },
    iconBlue : {
      color: 'blue'
    }
  });
  const imageProps: IImageProps = {
    imageFit: ImageFit.cover,
  };
  const buttonStyles = {
    root: { backgroundColor: 'transparent' },
    rootHovered: { backgroundColor: 'transparent' },
    rootChecked: { backgroundColor: 'transparent' }
  };
  const checkStyles: ICheckboxStyles = {
    checkbox: { 
      borderRadius: '4px',
      height: '17px',
      width: '17px',      
      borderColor: '#ffffff'    	
    }
  };
  const sectionStackTokens: IStackStyles = { 
    root : {      
      width: '25%',
      padding: '10px 20px 20px 0'
    },
   };

   let personas = [
    {personaName: "fadi elias"},
    {imageUrl: "https://liv-magazine.com/wp-content/uploads/2021/04/Profile-Photo-small-size-Michelle-Leung.jpg"},
    {personaName: "Katy Lien"},
    {imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN3-b6hE_5K-l4bv_gBuFtF5zWoPEhSkLsuw&usqp=CAU"},
    {imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8FuEJbKwDdaz1h387130xmYkAIQbZpahhbQ&usqp=CAU"},
    {personaName: "John Carter"}                 
    ]

    const deleteIcon: IIconProps = { iconName: 'Delete' };
    const workFlowIcon: IIconProps = { iconName: 'WorkFlow' };
    const forwardIcon: IIconProps = { iconName: 'ChromeBackMirrored' };

export const ContactTileView: React.FunctionComponent<IButtonPropertyProps> = props => {
 /*Descriptive*/ 
  const overflowButtonProps = {
    ariaLabel: 'More users',
    onClick: (ev: React.MouseEvent<HTMLButtonElement>) => alert('overflow icon clicked'),
  };
 /*Descriptive*/ 

  const { disabled, checked } = props;
  const [favorate, { toggle: setFav }] = useBoolean(false);
  const iconProps = { iconName: 'Search' };
  const ListViewIcon: IIconProps = { iconName: 'BulletedList2' };
  const TileViewIcon: IIconProps = { iconName: 'GridViewMedium' };
  /*-Modal start-*/
const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] = useBoolean(false);
const titleId = useId('title');
/*-Modal end-*/

		return(
			<>
			<Stack className={classNames.mcDashboard}>	
      <Stack.Item>
          <h1 className='ms-page-title ms-fontSize-20 ms-fontWeight-semibold'>Contacts</h1> 
          

          <PropertyCommandBar />                        
          <Stack horizontal verticalAlign="center" horizontalAlign="space-between" className="ms__table-filter" style={{margin:'0 -15px'}}>
            <Stack horizontal verticalAlign="center" gap="10">
              <TextField
                label=""
                className="ms__table-search"
                placeholder="Search Here"
                //onChange={this._onFilter}
                iconProps={iconProps}         
                styles={textFieldStyles}
              />
              <TableFilters />
            </Stack>
            <Stack horizontal verticalAlign="center" horizontalAlign="space-between" gap="10" className="ms__table-view">            
              <Stack horizontal className="btn-group">
              <IconButton iconProps={ListViewIcon} href="/contacts" allowDisabledFocus className="btn-white shadow" />
              <IconButton iconProps={TileViewIcon} allowDisabledFocus className="btn-white is-active shadow" />  
              </Stack>
              <ManageColumns />              
            </Stack>
          </Stack>
        </Stack.Item>
        <Stack.Item grow className={classNames.mcDashboardScroll}>
          <div className="ms-Grid" dir="ltr">
                <div className="ms-Grid-row">

                { ContactData.map(item => {
            return (   
                    <div className="ms-Grid-col ms-sm6 ms-md4" style={{margin:'0 0 15px'}} key={item.id}>
                        <div className="personaCard" style={{borderColor: item.typeStatusColor}}>
                            <Stack gap={20}>
                            <Stack.Item>
                            <Stack horizontal horizontalAlign='space-between'>
                            <Stack.Item>
                                {console.log(PersonaPresence.online)}
                                <Persona                   
                                    imageUrl={item.profileImg}    
                                    text={item.contactName}
                                    secondaryText={item.contactNameLanguage}
                                    tertiaryText={item.country}                  
                                    presence={item.status}
                                    // Status if value 1 = offline
                                    // Status if value 2 = online
                                    // Status if value 3 = away
                                    // Status if value 4 = dnd
                                    // Status if value 5 = not allowed
                                    // Status if value 5 = busy
                                    imageAlt={item.contactName}      
                                    size={PersonaSize.size48}
                                />
                                </Stack.Item>    
                                <Stack.Item>            
                                    <Stack horizontal verticalAlign='center'>                                      
                                    <IconButton iconProps={workFlowIcon} title="Workflow" className={classNames.iconRed} ariaLabel="Delete" styles={{ icon: {color: 'blue', fontSize: '12'} }} />
                                    <IconButton
                                      toggle
                                      checked={favorate || checked}                                  
                                      iconProps={favorate ? favFillIcon : favOutlineIcon}
                                      onClick={setFav}     
                                      title='Add to Favorate'                               
                                      allowDisabledFocus
                                      disabled={disabled}
                                      
                                      style={{color:'blue'}}
                                    />
                                    <IconButton onClick={showModal} iconProps={forwardIcon} title="View Detail" ariaLabel="View Detail" styles={{ icon: {color: '#0b49ae', fontSize: '12'} }} />
                                    </Stack>
                                </Stack.Item>
                            </Stack>                      
                            </Stack.Item>                                   
                            <Stack.Item className={classNames.stackItemDevider}>                                 
                                    <Stack horizontal gap="10" horizontalAlign='space-between'>                                      
                                      <Stack gap="5" style={{maxWidth: '40%'}}>
                                          <Stack.Item className={classNames.stackItemLabelStyles} style={{ color: NeutralColors.gray100 }}>Category</Stack.Item>
                                          <Stack.Item className={classNames.stackItemCardValueStyles}>{item.category} </Stack.Item>
                                      </Stack>
                                      <Stack gap="5">
                                          <Stack.Item className={classNames.stackItemLabelStyles} style={{ color: NeutralColors.gray100 }}>Email Address</Stack.Item>
                                          <Stack.Item className={classNames.stackItemCardValueStyles}>{item.email}</Stack.Item>
                                      </Stack> 
                                      <Stack gap="5">
                                          <Stack.Item className={classNames.stackItemLabelStyles} style={{ color: NeutralColors.gray100 }}>Code</Stack.Item>
                                          <Stack.Item className={classNames.stackItemCardValueStyles}>{item.code}</Stack.Item>
                                      </Stack> 
                                    </Stack>
                               
                            </Stack.Item>                    
                            </Stack>                    
                            </div> 
                   
                    </div>
                    )
                  })}  
                  
                  </div> 
          </div>
        </Stack.Item>
			</Stack>

      <Modal
        titleAriaId={titleId}
        isOpen={isModalOpen}
        onDismiss={hideModal}
        isBlocking={false}
        containerClassName={contentStyles.container}        
      >
        <Stack className={contentStyles.header}>
          <Stack horizontal horizontalAlign='space-between'>
            <Persona        
              className='tertiaryTextEnable mt-10'           
              //imageUrl=''  
              text='Ambition Co. Ltd.'
              secondaryText='アンビション株式会社'
              tertiaryText='Japan'                  
              presence={PersonaPresence.online}          
              imageAlt='Acme Inc'
              size={PersonaSize.size48}
            />
              
              <Stack horizontal>
              <IconButton
                  id='btnFullScreen'
                  styles={iconButtonStyles}
                  iconProps={fullScreenIcon}
                  ariaLabel="Fullscreen popup modal"              
                />            
                <IconButton
                  styles={iconButtonStyles}
                  iconProps={cancelIcon}
                  ariaLabel="Close popup modal"
                  onClick={hideModal}
                />
              </Stack>
          </Stack>
          
          <Stack horizontal horizontalAlign='end'>
            <ActionButton className='btn-link' allowDisabledFocus disabled={disabled} checked={checked}>
                Submit For Approval
            </ActionButton>
          </Stack>

        </Stack>
        <div className={contentStyles.body} >
         
          <Pivot className="pivotControl">
            {/* Summary Tab */}
            <PivotItem headerText="Summary">         
            <Stack horizontal horizontalAlign="space-between" style={{margin:'10px 0'}}>
              <Stack.Item className={classNames.stackItemSidebar}>
                Sidebar
              </Stack.Item>

              <Stack.Item style={{width:'100%', padding: '0 0 0 30px'}}>     
                <Stack wrap horizontal>
                  <Stack gap="5" styles={sectionStackTokens}>
                      <Stack.Item className={classNames.stackItemLabelStyles} style={{ color: NeutralColors.gray100 }}>Company Name</Stack.Item>
                      <Stack.Item className={classNames.stackItemValueStyles}>Ambition Co. Ltd.<br />アンビション株式会社</Stack.Item>
                  </Stack>
                  <Stack gap="5" styles={sectionStackTokens}>
                      <Stack.Item className={classNames.stackItemLabelStyles} style={{ color: NeutralColors.gray100 }}>Category</Stack.Item>
                      <Stack.Item className={classNames.stackItemValueStyles}>Cash Management Company, Property Management Company, Tenant, Vendor</Stack.Item>
                  </Stack>
                  <Stack gap="5" styles={sectionStackTokens}>
                      <Stack.Item className={classNames.stackItemLabelStyles} style={{ color: NeutralColors.gray100 }}>Email Address</Stack.Item>
                      <Stack.Item className={classNames.stackItemValueStyles}>sales@ambitionco.com</Stack.Item>
                  </Stack>
                  <Stack gap="5" styles={sectionStackTokens}>
                      <Stack.Item className={classNames.stackItemLabelStyles} style={{ color: NeutralColors.gray100 }}>Address</Stack.Item>
                      <Stack.Item className={classNames.stackItemValueStyles}>アンビション株式会社 ビショ ビショビショ </Stack.Item>
                  </Stack>
                  <Stack gap="5" styles={sectionStackTokens}>
                      <Stack.Item className={classNames.stackItemLabelStyles} style={{ color: NeutralColors.gray100 }}>Telephone No.</Stack.Item>
                      <Stack.Item className={classNames.stackItemValueStyles}>03-68998-9845</Stack.Item>
                  </Stack>
                  <Stack gap="5" styles={sectionStackTokens}>
                      <Stack.Item className={classNames.stackItemLabelStyles} style={{ color: NeutralColors.gray100 }}>Fax No.</Stack.Item>
                      <Stack.Item className={classNames.stackItemValueStyles}>1999</Stack.Item>
                  </Stack>
                  <Stack gap="5" styles={sectionStackTokens}>
                      <Stack.Item className={classNames.stackItemLabelStyles} style={{ color: NeutralColors.gray100 }}>Group</Stack.Item>
                      <Stack.Item className={classNames.stackItemValueStyles}>--</Stack.Item>
                  </Stack>
                  <Stack gap="5" styles={sectionStackTokens}>
                      <Stack.Item className={classNames.stackItemLabelStyles} style={{ color: NeutralColors.gray100 }}>Zip Code</Stack.Item>
                      <Stack.Item className={classNames.stackItemValueStyles}>150-0001</Stack.Item>
                  </Stack>
                  <Stack gap="5" styles={sectionStackTokens}>
                      <Stack.Item className={classNames.stackItemLabelStyles} style={{ color: NeutralColors.gray100 }}>Country</Stack.Item>
                      <Stack.Item className={classNames.stackItemValueStyles}>Japan</Stack.Item>
                  </Stack>
                  <Stack gap="5" styles={sectionStackTokens}>
                      <Stack.Item className={classNames.stackItemLabelStyles} style={{ color: NeutralColors.gray100 }}>Industry Group</Stack.Item>
                      <Stack.Item className={classNames.stackItemValueStyles}>Real Estate</Stack.Item>
                  </Stack>
                  <Stack gap="5" styles={sectionStackTokens}>
                      <Stack.Item className={classNames.stackItemLabelStyles} style={{ color: NeutralColors.gray100 }}>Local NRA (Local Unit)</Stack.Item>
                      <Stack.Item className={classNames.stackItemValueStyles}>152360.2</Stack.Item>
                  </Stack>
                  <Stack gap="5" styles={sectionStackTokens}>
                      <Stack.Item className={classNames.stackItemLabelStyles} style={{ color: NeutralColors.gray100 }}>Name Value Pair 01</Stack.Item>
                      <Stack.Item className={classNames.stackItemValueStyles}>Value</Stack.Item>
                  </Stack>
                  <Stack gap="5" styles={sectionStackTokens}>
                      <Stack.Item className={classNames.stackItemLabelStyles} style={{ color: NeutralColors.gray100 }}>Name Value Pair 02</Stack.Item>
                      <Stack.Item className={classNames.stackItemValueStyles}>Value</Stack.Item>
                  </Stack>
                  <Stack gap="5" styles={sectionStackTokens}>
                      <Stack.Item className={classNames.stackItemLabelStyles} style={{ color: NeutralColors.gray100 }}>Name Value Pair 03</Stack.Item>
                      <Stack.Item className={classNames.stackItemValueStyles}>Value</Stack.Item>
                  </Stack>                  
                  <Stack gap="5" styles={sectionStackTokens}>
                      <Stack.Item className={classNames.stackItemLabelStyles} style={{ color: NeutralColors.gray100 }}>Name Value Pair 04</Stack.Item>
                      <Stack.Item className={classNames.stackItemValueStyles}>Value</Stack.Item>
                  </Stack>
                  <Stack gap="5" styles={sectionStackTokens}>
                      <Stack.Item className={classNames.stackItemLabelStyles} style={{ color: NeutralColors.gray100 }}>Name Value Pair 05</Stack.Item>
                      <Stack.Item className={classNames.stackItemValueStyles}>Value</Stack.Item>
                  </Stack>
                </Stack>                             
              </Stack.Item>              
            </Stack>
            </PivotItem>
            {/* Summary Tab */}            
           
            {/* Associated Contacts */}
            <PivotItem headerText="Associated Contacts" itemCount={7}>
            <div className="pt-20">
            <div className="ms-Grid" dir="ltr">
              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm6 ms-md4">
                  <div className="personaCard"> 
                    <Stack gap={20}>
                    <Stack.Item>
                    <Stack horizontal horizontalAlign='space-between'>
                    <Stack.Item>
                      <Persona
                          text="Acme Inc"
                          secondaryText="Japan"
                          tertiaryText="Manager Accounts, Ambition Co. Ltd."                    
                          presence={PersonaPresence.online}
                          imageAlt="Acme Inc"      
                          size={PersonaSize.size48}
                        />  
                      </Stack.Item>    
                      <Stack.Item> 
                        <Stack horizontal verticalAlign='center'>
                          <div className={classNames.mcCardHeaderActionIcon}><img src="img/workflow-icon.svg" width="14" alt="workflow" /></div>
                          <IconButton iconProps={deleteIcon} title="Delete" className={classNames.iconRed} ariaLabel="Delete" styles={{ icon: {color: 'red', fontSize: '12'} }} />
                          <IconButton iconProps={forwardIcon} title="View Detail" className={classNames.iconBlue} ariaLabel="View Detail" styles={{ icon: {color: '#0b49ae', fontSize: '12'} }} />
                        </Stack>
                      </Stack.Item>
                    </Stack>

                      
                    </Stack.Item>
                    <Stack.Item>
                      <Stack horizontal horizontalAlign='end'>
                        <span className="personaCardBadge">External</span>
                      </Stack>
                    </Stack.Item>                    
                  </Stack>                    
                  </div>
                </div> 
                <div className="ms-Grid-col ms-sm6 ms-md4">
                  <div className="personaCard"> 
                    <Stack gap={20}>
                    <Stack.Item>
                    <Stack horizontal horizontalAlign='space-between'>
                    <Stack.Item>
                    <Persona
                          text="John Deo"
                          secondaryText="Japan"
                          tertiaryText="Jr. Fund Manager, Acme Inc"                    
                          presence={PersonaPresence.busy}
                          imageAlt="John Deo"      
                          size={PersonaSize.size48}
                        />
                      </Stack.Item>    
                      <Stack.Item>            
                       <Stack horizontal verticalAlign='center'>                          
                          <IconButton iconProps={deleteIcon} title="Delete" className={classNames.iconRed} ariaLabel="Delete" styles={{ icon: {color: 'red', fontSize: '12'} }} />
                          <IconButton iconProps={forwardIcon} title="View Detail" className={classNames.iconBlue} ariaLabel="View Detail" styles={{ icon: {color: '#0b49ae', fontSize: '12'} }} />
                        </Stack>
                      </Stack.Item>
                    </Stack>                      
                    </Stack.Item>
                    <Stack.Item>
                      <Stack horizontal horizontalAlign='end'>
                        <span className="personaCardBadge">Internal</span>
                      </Stack>
                    </Stack.Item>                    
                  </Stack>                    
                  </div>                  
                </div>
                <div className="ms-Grid-col ms-sm6 ms-md4">
                  <div className="personaCard"> 
                    <Stack gap={20}>
                    <Stack.Item>
                    <Stack horizontal horizontalAlign='space-between'>
                    <Stack.Item>
                      <Persona
                          text="Dean Jones"
                          secondaryText="USA"
                          tertiaryText="Jr. Fund Manager, Acme Inc"                    
                          presence={PersonaPresence.offline}
                          imageAlt="Dean Jones"      
                          size={PersonaSize.size48}
                        />
                      </Stack.Item>    
                      <Stack.Item>            
                        <Stack horizontal verticalAlign='center'>                          
                            <IconButton iconProps={deleteIcon} title="Delete" className={classNames.iconRed} ariaLabel="Delete" styles={{ icon: {color: 'red', fontSize: '12'} }} />
                            <IconButton iconProps={forwardIcon} title="View Detail" className={classNames.iconBlue} ariaLabel="View Detail" styles={{ icon: {color: '#0b49ae', fontSize: '12'} }} />
                          </Stack>
                      </Stack.Item>
                    </Stack>                      
                    </Stack.Item>
                    <Stack.Item>
                      <Stack horizontal horizontalAlign='end'>
                        <span className="personaCardBadge">Internal</span>
                      </Stack>
                    </Stack.Item>                    
                  </Stack>                    
                  </div>                  
                </div>
                <div className="ms-Grid-col ms-sm6 ms-md4">
                  <div className="personaCard"> 
                    <Stack gap={20}>
                    <Stack.Item>
                    <Stack horizontal horizontalAlign='space-between'>
                    <Stack.Item>
                      <Persona
                          imageUrl= "https://liv-magazine.com/wp-content/uploads/2021/04/Profile-Photo-small-size-Michelle-Leung.jpg"
                          text="Paul Jeams"
                          secondaryText="USA"
                          tertiaryText="Jr. Fund Manager, Acme Inc"                    
                          presence={PersonaPresence.online}
                          imageAlt="Paul Jeams"      
                          size={PersonaSize.size48}
                        />
                      </Stack.Item>    
                      <Stack.Item>            
                          <Stack horizontal verticalAlign='center'>                          
                            <IconButton iconProps={deleteIcon} title="Delete" className={classNames.iconRed} ariaLabel="Delete" styles={{ icon: {color: 'red', fontSize: '12'} }} />
                            <IconButton iconProps={forwardIcon} title="View Detail" className={classNames.iconBlue} ariaLabel="View Detail" styles={{ icon: {color: '#0b49ae', fontSize: '12'} }} />
                          </Stack>
                      </Stack.Item>
                    </Stack>                      
                    </Stack.Item>
                    <Stack.Item>
                      <Stack horizontal horizontalAlign='end'>
                        <span className="personaCardBadge">Internal</span>
                      </Stack>
                    </Stack.Item>                    
                  </Stack>                    
                  </div>
                </div>
                <div className="ms-Grid-col ms-sm6 ms-md4">
                  <div className="personaCard"> 
                    <Stack gap={20}>
                    <Stack.Item>
                    <Stack horizontal horizontalAlign='space-between'>
                    <Stack.Item>
                      <Persona                          
                          text="Reality Inc"
                          secondaryText="USA"
                          tertiaryText="Jr. Fund Manager, Acme Inc"                    
                          presence={PersonaPresence.online}
                          imageAlt="Reality Inc"      
                          size={PersonaSize.size48}
                        />
                      </Stack.Item>    
                      <Stack.Item>            
                          <Stack horizontal verticalAlign='center'>                          
                            <IconButton iconProps={deleteIcon} title="Delete" className={classNames.iconRed} ariaLabel="Delete" styles={{ icon: {color: 'red', fontSize: '12'} }} />
                            <IconButton iconProps={forwardIcon} title="View Detail" className={classNames.iconBlue} ariaLabel="View Detail" styles={{ icon: {color: '#0b49ae', fontSize: '12'} }} />
                          </Stack>
                      </Stack.Item>
                    </Stack>                      
                    </Stack.Item>
                    <Stack.Item>
                      <Stack horizontal horizontalAlign='end'>
                        <span className="personaCardBadge">Internal</span>
                      </Stack>
                    </Stack.Item>                    
                  </Stack>                    
                  </div>                  
                </div>
                <div className="ms-Grid-col ms-sm6 ms-md4">
                  <div className="personaCard"> 
                    <Stack gap={20}>
                    <Stack.Item>
                    <Stack horizontal horizontalAlign='space-between'>
                    <Stack.Item>
                      <Persona                          
                          text="Jane Newmane"
                          secondaryText="Japan"
                          tertiaryText="Jr. Fund Manager, Acme Inc"                    
                          presence={PersonaPresence.dnd}
                          imageAlt="Jane Newmane"      
                          size={PersonaSize.size48}
                        />
                      </Stack.Item>    
                      <Stack.Item>            
                          <Stack horizontal verticalAlign='center'>                          
                            <IconButton iconProps={deleteIcon} title="Delete" className={classNames.iconRed} ariaLabel="Delete" styles={{ icon: {color: 'red', fontSize: '12'} }} />
                            <IconButton iconProps={forwardIcon} title="View Detail" className={classNames.iconBlue} ariaLabel="View Detail" styles={{ icon: {color: '#0b49ae', fontSize: '12'} }} />
                          </Stack>
                      </Stack.Item>
                    </Stack>                      
                    </Stack.Item>
                    <Stack.Item>
                      <Stack horizontal horizontalAlign='end'>
                        <span className="personaCardBadge">External</span>
                      </Stack>
                    </Stack.Item>                    
                  </Stack>                    
                  </div>                 
                </div>            
              </div>
            </div>
            </div>            
            </PivotItem>
            {/* Associated Contacts */}
            
            {/* Bank Accounts */}
            <PivotItem headerText="Bank Accounts" itemCount={2}>
            <div className="pt-20">
            <div className="ms-Grid" dir="ltr">
              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm6 ms-md4">
                  <div className="personaCard"> 
                    <Stack gap={20}>
                    <Stack.Item>
                    <Stack horizontal horizontalAlign='space-between'>
                    <Stack.Item>
                      <Persona
                          text="Bank of Japan"
                          secondaryText="8073058"
                          tertiaryText="ン株式会社"                    
                          presence={PersonaPresence.online}
                          imageAlt="Bank of Japan"      
                          size={PersonaSize.size48}
                        />  
                      </Stack.Item>    
                      <Stack.Item> 
                        <Stack horizontal verticalAlign='center'>                         
                          <IconButton iconProps={deleteIcon} title="Delete" className={classNames.iconRed} ariaLabel="Delete" styles={{ icon: {color: 'red', fontSize: '12'} }} />
                          <IconButton iconProps={forwardIcon} title="View Detail" className={classNames.iconBlue} ariaLabel="View Detail" styles={{ icon: {color: '#0b49ae', fontSize: '12'} }} />
                        </Stack>
                      </Stack.Item>
                    </Stack>

                      
                    </Stack.Item>
                    <Stack.Item>
                      <Stack horizontal horizontalAlign='end'>
                        <span className="personaCardBadge">External</span>
                      </Stack>
                    </Stack.Item>                    
                  </Stack>                    
                  </div>
                </div>
                <div className="ms-Grid-col ms-sm6 ms-md4">
                  <div className="personaCard"> 
                    <Stack gap={20}>
                    <Stack.Item>
                    <Stack horizontal horizontalAlign='space-between'>
                    <Stack.Item>
                      <Persona
                          text="Bank of Spain"
                          secondaryText="3205412512"
                          tertiaryText="banco de españa"                    
                          presence={PersonaPresence.online}
                          imageAlt="Bank of Spain"      
                          size={PersonaSize.size48}
                        />  
                      </Stack.Item>    
                      <Stack.Item> 
                        <Stack horizontal verticalAlign='center'>                         
                          <IconButton iconProps={deleteIcon} title="Delete" className={classNames.iconRed} ariaLabel="Delete" styles={{ icon: {color: 'red', fontSize: '12'} }} />
                          <IconButton iconProps={forwardIcon} title="View Detail" className={classNames.iconBlue} ariaLabel="View Detail" styles={{ icon: {color: '#0b49ae', fontSize: '12'} }} />
                        </Stack>
                      </Stack.Item>
                    </Stack>

                      
                    </Stack.Item>
                    <Stack.Item>
                      <Stack horizontal horizontalAlign='end'>
                        <span className="personaCardBadge">External</span>
                      </Stack>
                    </Stack.Item>                    
                  </Stack>                    
                  </div>
                </div>   
                           
              </div>
            </div>
            </div>
            </PivotItem>
            {/* Bank Accounts */}

            
          </Pivot>
          
        </div>
      </Modal>
		  </>
		)	
}

const fullScreenIcon: IIconProps = { iconName: 'FullScreen' };
const cancelIcon: IIconProps = { iconName: 'Cancel' };

const theme = getTheme();
const contentStyles = mergeStyleSets({
  container: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'stretch',
    minWidth:'80%',
    maxWidth: 'calc(80% - 32px)'
  },
  header: [    
    theme.fonts.xLargePlus,
    {      
      borderTop: `4px solid ${theme.palette.themePrimary}`,
      borderBottom: 'solid 1px #ddd',
      color: theme.palette.neutralPrimary,
      fontWeight: FontWeights.semibold,
      padding: '12px 12px 8px 24px',
    },
  ],
  body: {
    flex: '4 4 auto',
    padding: '0 24px 24px 24px',
    overflowY: 'hidden',
    selectors: {
      p: { margin: '14px 0' },
      'p:first-child': { marginTop: 0 },
      'p:last-child': { marginBottom: 0 },
    },
  },
});


const iconButtonStyles: Partial<IButtonStyles> = {
  root: {
    color: theme.palette.neutralPrimary,
    marginLeft: 'auto',
    marginTop: '4px',
    marginRight: '2px',
  },
  rootHovered: {
    color: theme.palette.neutralDark,
  },
};
export default ContactTileView