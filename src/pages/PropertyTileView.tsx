import * as React from 'react';
import {  } from 'react-router-dom';
import { Stack, mergeStyleSets, Image, Text, Checkbox, IImageProps, ICheckboxStyles, ImageFit, IconButton, IIconProps, TextField, ITextFieldStyles, ActionButton, SharedColors, DefaultButton} from '@fluentui/react';
import { getTheme, FontWeights, ICommandBarItemProps, CommandBar, IStackStyles, Modal, Label, Pivot, PivotItem, IButtonStyles } from '@fluentui/react';
import { Facepile, OverflowButtonType } from '@fluentui/react/lib/Facepile';
import { IPersonaSharedProps, Persona, PersonaSize, PersonaPresence } from '@fluentui/react/lib/Persona';

import { NeutralColors } from '@fluentui/theme';
import PropertyCommandBar from '../components/property/CommandBar';
import { useBoolean, useId } from '@fluentui/react-hooks';
import TableFilters from '../components/property/TableFilters';
import ManageColumns from '../components/property/ManageColumns';
import DataTable from '../components/property/DataTable.json';

document.addEventListener('DOMContentLoaded', event => {  
  const sidebarDrawerToggle = document.body.querySelector('#btnFullScreen');
  if (sidebarDrawerToggle) {
      if (localStorage.getItem('sb|modalFullscreen') === 'true') {
           document.body.classList.toggle('sb-modalFullscreen');
      }
      sidebarDrawerToggle.addEventListener('click', event => {
          event.preventDefault();
          document.body.classList.toggle('sb-modalFullscreen');          
      });
  }
});


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
  stackItemValueStyles: {
    fontSize: '12px',
    fontWeight: '600'
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
    borderRight: 'solid 1px rgba(0,0,0,0.1)',
    paddingRight: '15px'
    },
    stackItemSidebar : {
      minWidth : '320px',
      padding : '10px 0 0 20px',
      borderLeft: 'solid 1px rgba(0,0,0,0.1)',
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
      width: '150px',
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
    const forwardIcon: IIconProps = { iconName: 'ChromeBackMirrored' };

export const PropertyTileView: React.FunctionComponent<IButtonPropertyProps> = props => {
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
          <h1 className='ms-page-title ms-fontSize-20 ms-fontWeight-semibold'>Property</h1> 
          
         

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
              <IconButton iconProps={ListViewIcon} href="/property" allowDisabledFocus className="btn-white shadow" />
              <IconButton iconProps={TileViewIcon} allowDisabledFocus className="btn-white is-active shadow" />  
              </Stack>
              <ManageColumns />              
            </Stack>
          </Stack>
        </Stack.Item>
        <Stack.Item grow className={classNames.mcDashboardScroll}>
          <div className="ms-Grid" dir="ltr">
                <div className="ms-Grid-row">

                { DataTable.map(item => {
            return (   
                    <div className="ms-Grid-col ms-sm6 ms-md4" style={{margin:'0 0 15px'}} key={item.id}>
                    <Stack gap="20" className={classNames.mcCard}> 
                        <Stack className={classNames.mcCardHeader}>
                          <Stack horizontal verticalAlign="center" horizontalAlign="space-between" className={classNames.mcCardHeaderAction}>
                          <Checkbox label="" styles={checkStyles} /> 
                          <Stack horizontal verticalAlign="center" gap="5">
                            <div className={classNames.mcCardHeaderActionIcon}>!</div>
                            <div className={classNames.mcCardHeaderActionIcon}><img src="img/workflow-icon.svg" width="14" alt="workflow" /></div>
                          </Stack>                     
                        </Stack>

                       

                        {(item.propertyImage)?
                          <Image
                            {...imageProps}
                            className={classNames.mcCardImage}
                            src={item.propertyImage}
                            alt=''
                          />                        
                          : 
                          <Image
                          {...imageProps}
                          className={classNames.mcCardImage}
                          src="http://via.placeholder.com/600x400"
                          alt=''
                        />                        
                      }   
                          
                          <Stack horizontal verticalAlign="center" horizontalAlign="space-between" className={classNames.mcCardHeaderTitle}>
                            <h4 style={{margin:'0', cursor: 'pointer'}} onClick={showModal}>{item.propertyName}</h4>                            
                            <IconButton
                                toggle
                                checked={favorate || checked}                                  
                                iconProps={favorate ? favFillIcon : favOutlineIcon}
                                onClick={setFav}                                    
                                allowDisabledFocus
                                disabled={disabled}
                                styles={buttonStyles}
                                style={{color:'white'}}
                              />
                          </Stack>
                        
                        </Stack>
                        
                        <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
                            <Stack.Item style={{ color: NeutralColors.gray100 }}>{item.propertyCode}</Stack.Item>
                            <Stack.Item className="ms-fontSize-18">{item.propertyAmount}</Stack.Item>
                        </Stack>
                        <Stack className="ms-Grid" gap="15" dir="ltr">
                          <Stack.Item className="ms-Grid-row">
                              <Stack className="ms-Grid-col ms-sm6 ms-md4">
                                  <Stack gap="5">
                                      <Stack.Item className={classNames.stackItemLabelStyles} style={{ color: NeutralColors.gray100 }}>Fund</Stack.Item>
                                      <Stack.Item className={classNames.stackItemValueStyles}>{item.propertyFund}</Stack.Item>
                                  </Stack>                                 
                              </Stack>
                              <Stack className="ms-Grid-col ms-sm6 ms-md4">
                                  <Stack gap="5">
                                      <Stack.Item className={classNames.stackItemLabelStyles} style={{ color: NeutralColors.gray100 }}>Total NRA (Local)</Stack.Item>
                                      <Stack.Item className={classNames.stackItemValueStyles}>{item.propertyNra}</Stack.Item>
                                  </Stack>                                 
                              </Stack> 
                              <Stack className="ms-Grid-col ms-sm6 ms-md4">
                                  <Stack gap="5">
                                      <Stack.Item className={classNames.stackItemLabelStyles} style={{ color: NeutralColors.gray100 }}>Year Built</Stack.Item>
                                      <Stack.Item className={classNames.stackItemValueStyles}>{item.propertyBuiltYear}</Stack.Item>
                                  </Stack>                                 
                              </Stack>
                            </Stack.Item>                              
                            <Stack.Item className="ms-Grid-row">
                              <Stack className="ms-Grid-col ms-sm6 ms-md4">
                                  <Stack gap="5">
                                      <Stack.Item className={classNames.stackItemLabelStyles} style={{ color: NeutralColors.gray100 }}>Assets ID (External)</Stack.Item>
                                      <Stack.Item className={classNames.stackItemValueStyles}>{item.propertyAssetId}</Stack.Item>
                                  </Stack>                                 
                              </Stack>
                              <Stack className="ms-Grid-col ms-sm6 ms-md4">
                                  <Stack gap="5">
                                      <Stack.Item className={classNames.stackItemLabelStyles} style={{ color: NeutralColors.gray100 }}>Total GFA (Local)</Stack.Item>
                                      <Stack.Item className={classNames.stackItemValueStyles}>{item.propertyGfa}</Stack.Item>
                                  </Stack>                                 
                              </Stack>
                              <Stack className="ms-Grid-col ms-sm6 ms-md4">
                                  <Stack gap="5">
                                      <Stack.Item className={classNames.stackItemLabelStyles} style={{ color: NeutralColors.gray100 }}>Disposition Date</Stack.Item>
                                      <Stack.Item className={classNames.stackItemValueStyles}>{item.propertyDispositionDate}</Stack.Item>
                                  </Stack>                                 
                              </Stack>
                            </Stack.Item>
                            <Stack.Item className="ms-Grid-row">
                              <Stack className="ms-Grid-col ms-sm6 ms-md4">
                                  <Stack gap="5">
                                      <Stack.Item className={classNames.stackItemLabelStyles} style={{ color: NeutralColors.gray100 }}>Acquisition Date</Stack.Item>
                                      <Stack.Item className={classNames.stackItemValueStyles}>{item.propertyAcquisitionDate}</Stack.Item>
                                  </Stack>                                 
                              </Stack> 
                              <Stack className="ms-Grid-col ms-sm6 ms-md8">
                                  <Stack gap="5">
                                    <Stack.Item className={classNames.stackItemLabelStyles} style={{ color: NeutralColors.gray100 }}>Property Type</Stack.Item>
                                    <Stack.Item className={classNames.stackItemValueStyles}>
                                      <span className={classNames.stackItemColor}></span>{item.propertyType}</Stack.Item>
                                  </Stack>
                              </Stack>                       
                          </Stack.Item>
                      </Stack>
                      <Stack horizontal verticalAlign="center" gap="5" className={classNames.mcCardFooter}>
                        <i className="ms-Icon ms-Icon--POI ms-fontSize-18" aria-hidden="true"></i>
                        <span>{item.propertyLocation}</span>
                      </Stack>
                    </Stack>
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
        <Stack className={contentStyles.header} horizontal horizontalAlign='space-between'>
          <Stack>
            <span id={titleId}>123 Peachtree</span>
            <Text style={{ color: NeutralColors.gray100 }}>123 Peachtree St, Atlanta, CA, United States - 30303</Text>
          </Stack> 
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

        <div className={contentStyles.body} >
        <CommandBar          
          className="ms-actionbar"						
          items={_items}          				
          ariaLabel="Modal Commandbar"
          />
          <Stack horizontal verticalAlign="center" horizontalAlign="space-between" className={classNames.modalTitleBar}>        
            <Stack horizontal gap="30">
              <Stack gap="5">
                  <Stack.Item className={classNames.stackItemLabelStyles} style={{ color: NeutralColors.gray100 }}>Asses ID in JVP/External System</Stack.Item>
                  <Stack.Item className={classNames.stackItemValueStyles}>0006</Stack.Item>
              </Stack>
              <Stack gap="5">
                  <Stack.Item className={classNames.stackItemLabelStyles} style={{ color: NeutralColors.gray100 }}>Code</Stack.Item>
                  <Stack.Item className={classNames.stackItemValueStyles}>CC-CPU530</Stack.Item>
              </Stack>
              <Stack gap="5">
                  <Stack.Item className={classNames.stackItemLabelStyles} style={{ color: NeutralColors.gray100 }}>Acquisition Price</Stack.Item>
                  <Stack.Item className={classNames.stackItemValueStyles}>$2,400,000</Stack.Item>
              </Stack>
              <Stack gap="5">
                  <Stack.Item className={classNames.stackItemLabelStyles} style={{ color: NeutralColors.gray100 }}>Region &amp; Sub-Region</Stack.Item>
                  <Stack.Item className={classNames.stackItemValueStyles}>North California</Stack.Item>
              </Stack>
            </Stack>
            <Stack horizontal gap="30">
              <Stack gap="3" className={classNames.stackItemDevider}>
                  <Stack.Item className="ms-fontSize-18 ms-fontWeight-semibold">05</Stack.Item>
                  <Stack.Item className={classNames.stackItemLabelStyles} style={{ color: NeutralColors.gray100 }}>Tenants</Stack.Item>                  
              </Stack>
              <Stack gap="3" className={classNames.stackItemDevider}>
                  <Stack.Item className="ms-fontSize-18 ms-fontWeight-semibold">24</Stack.Item>
                  <Stack.Item className={classNames.stackItemLabelStyles} style={{ color: NeutralColors.gray100 }}>Units</Stack.Item>                  
              </Stack>
              <Stack gap="3" className={classNames.stackItemDevider}>
                  <Stack.Item className="ms-fontSize-18 ms-fontWeight-semibold">08</Stack.Item>
                  <Stack.Item className={classNames.stackItemLabelStyles} style={{ color: NeutralColors.gray100 }}>Leases Active</Stack.Item>                  
              </Stack>
              <Stack gap="3" className={classNames.stackItemDevider}>
                  <Stack.Item className="ms-fontSize-18 ms-fontWeight-semibold">15.2K</Stack.Item>
                  <Stack.Item className={classNames.stackItemLabelStyles} style={{ color: NeutralColors.gray100 }}>NRA (cubic)</Stack.Item>                  
              </Stack>
              <Stack gap="3">
                  <Stack.Item className="ms-fontSize-18 ms-fontWeight-semibold">82%</Stack.Item>
                  <Stack.Item className={classNames.stackItemLabelStyles} style={{ color: NeutralColors.gray100 }}>Unit Occupancy</Stack.Item>                  
              </Stack>
            </Stack>
          </Stack>
          

          
          
          <Pivot className="pivotControl">
            {/* Summary Tab */}
            <PivotItem headerText="Summary">         
            <Stack horizontal horizontalAlign="space-between" style={{margin:'10px 0'}}>
              <Stack.Item style={{width:'100%', padding: '0 20px 0 0'}}>     
                <Stack wrap horizontal>
                  <Stack gap="5" styles={sectionStackTokens}>
                      <Stack.Item className={classNames.stackItemLabelStyles} style={{ color: NeutralColors.gray100 }}>Property Type</Stack.Item>
                      <Stack.Item className={classNames.stackItemValueStyles}>Office</Stack.Item>
                  </Stack>
                  <Stack gap="5" styles={sectionStackTokens}>
                      <Stack.Item className={classNames.stackItemLabelStyles} style={{ color: NeutralColors.gray100 }}>Property Sub Type</Stack.Item>
                      <Stack.Item className={classNames.stackItemValueStyles}>--</Stack.Item>
                  </Stack>
                  <Stack gap="5" styles={sectionStackTokens}>
                      <Stack.Item className={classNames.stackItemLabelStyles} style={{ color: NeutralColors.gray100 }}>Property Category</Stack.Item>
                      <Stack.Item className={classNames.stackItemValueStyles}>--</Stack.Item>
                  </Stack>
                  <Stack gap="5" styles={sectionStackTokens}>
                      <Stack.Item className={classNames.stackItemLabelStyles} style={{ color: NeutralColors.gray100 }}>Completion Date</Stack.Item>
                      <Stack.Item className={classNames.stackItemValueStyles}>--</Stack.Item>
                  </Stack>
                  <Stack gap="5" styles={sectionStackTokens}>
                      <Stack.Item className={classNames.stackItemLabelStyles} style={{ color: NeutralColors.gray100 }}>Year Built</Stack.Item>
                      <Stack.Item className={classNames.stackItemValueStyles}>1981</Stack.Item>
                  </Stack>
                  <Stack gap="5" styles={sectionStackTokens}>
                      <Stack.Item className={classNames.stackItemLabelStyles} style={{ color: NeutralColors.gray100 }}>Year Renovated</Stack.Item>
                      <Stack.Item className={classNames.stackItemValueStyles}>1999</Stack.Item>
                  </Stack>
                  <Stack gap="5" styles={sectionStackTokens}>
                      <Stack.Item className={classNames.stackItemLabelStyles} style={{ color: NeutralColors.gray100 }}>Local Area Metric</Stack.Item>
                      <Stack.Item className={classNames.stackItemValueStyles}>Square Feet</Stack.Item>
                  </Stack>
                  <Stack gap="5" styles={sectionStackTokens}>
                      <Stack.Item className={classNames.stackItemLabelStyles} style={{ color: NeutralColors.gray100 }}>Property Life Cycle Stage</Stack.Item>
                      <Stack.Item className={classNames.stackItemValueStyles}>Office</Stack.Item>
                  </Stack>
                  <Stack gap="5" styles={sectionStackTokens}>
                      <Stack.Item className={classNames.stackItemLabelStyles} style={{ color: NeutralColors.gray100 }}>No. of Floors</Stack.Item>
                      <Stack.Item className={classNames.stackItemValueStyles}>40</Stack.Item>
                  </Stack>
                  <Stack gap="5" styles={sectionStackTokens}>
                      <Stack.Item className={classNames.stackItemLabelStyles} style={{ color: NeutralColors.gray100 }}>No. of Parking Spaces</Stack.Item>
                      <Stack.Item className={classNames.stackItemValueStyles}>1920</Stack.Item>
                  </Stack>
                  <Stack gap="5" styles={sectionStackTokens}>
                      <Stack.Item className={classNames.stackItemLabelStyles} style={{ color: NeutralColors.gray100 }}>No. of Basement</Stack.Item>
                      <Stack.Item className={classNames.stackItemValueStyles}>3</Stack.Item>
                  </Stack>
                  <Stack gap="5" styles={sectionStackTokens}>
                      <Stack.Item className={classNames.stackItemLabelStyles} style={{ color: NeutralColors.gray100 }}>Floor Description</Stack.Item>
                      <Stack.Item className={classNames.stackItemValueStyles}>20,000 Square Feet Floor Plates</Stack.Item>
                  </Stack>
                  <Stack gap="5" styles={sectionStackTokens}>
                      <Stack.Item className={classNames.stackItemLabelStyles} style={{ color: NeutralColors.gray100 }}>Local Area (Local Unit)</Stack.Item>
                      <Stack.Item className={classNames.stackItemValueStyles}>32000</Stack.Item>
                  </Stack>
                  <Stack gap="5" styles={sectionStackTokens}>
                      <Stack.Item className={classNames.stackItemLabelStyles} style={{ color: NeutralColors.gray100 }}>Local GPA (Local Unit)</Stack.Item>
                      <Stack.Item className={classNames.stackItemValueStyles}>500000</Stack.Item>
                  </Stack>
                  <Stack gap="5" styles={sectionStackTokens}>
                      <Stack.Item className={classNames.stackItemLabelStyles} style={{ color: NeutralColors.gray100 }}>Local NRA (Local Unit)</Stack.Item>
                      <Stack.Item className={classNames.stackItemValueStyles}>152360.2</Stack.Item>
                  </Stack>
                  <Stack gap="5" styles={sectionStackTokens}>
                      <Stack.Item className={classNames.stackItemLabelStyles} style={{ color: NeutralColors.gray100 }}>Local NRA (SQF)</Stack.Item>
                      <Stack.Item className={classNames.stackItemValueStyles}>--</Stack.Item>
                  </Stack>
                  <Stack gap="5" styles={sectionStackTokens}>
                      <Stack.Item className={classNames.stackItemLabelStyles} style={{ color: NeutralColors.gray100 }}>Local Area (SQF)</Stack.Item>
                      <Stack.Item className={classNames.stackItemValueStyles}>--</Stack.Item>
                  </Stack>
                  <Stack gap="5" styles={sectionStackTokens}>
                      <Stack.Item className={classNames.stackItemLabelStyles} style={{ color: NeutralColors.gray100 }}>Local GPA (SQF)</Stack.Item>
                      <Stack.Item className={classNames.stackItemValueStyles}>--</Stack.Item>
                  </Stack>
                </Stack>                             
              </Stack.Item>
              <Stack.Item className={classNames.stackItemSidebar}>

              <Stack gap={30}>
                <Stack horizontal verticalAlign="center" horizontalAlign="space-between">
                  <Facepile
                    className="overflowPersonaCoin"
                    overflowButtonType={OverflowButtonType.descriptive}
                    maxDisplayablePersonas={4}
                    personas={personas}
                    overflowButtonProps={overflowButtonProps}                
                  />    
                  <ActionButton style={{ color: SharedColors.cyanBlue10 }}>View All Contacts</ActionButton>
                </Stack>
                <div className={classNames.stackItemSidebarMap}>
                  <iframe className={classNames.stackItemSidebarMapIframe} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224346.48129412968!2d77.06889969035102!3d28.52728034389636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204dce!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1650827034745!5m2!1sen!2sin" width="100%" height="100%" loading="lazy"></iframe>
                </div>
              </Stack>
            </Stack.Item>
            </Stack>
            </PivotItem>
            {/* Summary Tab */}

            <PivotItem headerText="Finance">
            <Label>Finance</Label>
            </PivotItem>
            <PivotItem headerText="MRI">
              <Label>MRI</Label>
            </PivotItem>
            <PivotItem headerText="Structure Chart">
              <Label>Structure Chart</Label>
            </PivotItem>
            {/* Contact Tab */}
            <PivotItem headerText="Contacts" itemCount={11}>

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
            {/* Contact Tab */}
            <PivotItem headerText="Bank Accounts">
              <Label>Bank Accounts</Label>
            </PivotItem>
            <PivotItem headerText="Pictures">
              <Label>Pictures</Label>
            </PivotItem>
          </Pivot>
          
        </div>
      </Modal>
		  </>
		)	
}

const _items: ICommandBarItemProps[] = [
	{
	  key: 'newItem',
	  text: 'Create New',
	  iconProps: { iconName: 'Add' }	  
	},
	{
	  key: 'button_1',
	  text: 'Action Item 1',	  
	  href: 'https://www.google.com/',
	},
	{
	key: 'button_2',
	text: 'Action Item 2',	  
	href: 'https://www.google.com/',
	}
  ];

const cancelIcon: IIconProps = { iconName: 'Cancel' };
const fullScreenIcon: IIconProps = { iconName: 'FullScreen' };

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
      flex: '1 1 auto',
      borderTop: `4px solid ${theme.palette.themePrimary}`,
      color: theme.palette.neutralPrimary,
      display: 'flex',
      alignItems: 'start',
      fontWeight: FontWeights.semibold,
      padding: '12px 12px 14px 24px',
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
export default PropertyTileView