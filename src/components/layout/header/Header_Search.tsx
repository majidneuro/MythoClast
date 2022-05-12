import React from 'react';
import { Stack, SearchBox, Dropdown } from '@fluentui/react';
import { withTranslation, WithTranslation } from 'react-i18next';

const dropdownControlled = [ 
  { key: 'all', text: 'All' },
  { key: 'report', text: 'Report' },
  { key: 'property', text: 'Property' }  
];

export class HeaderSearch extends React.Component<any, any> {  
render() {
  const { t } = this.props;
  return (   
        <>
            <Stack horizontal className="mc__search">
              <SearchBox placeholder={t("search_TDL")}/>  
              <Dropdown placeholder="All" label="" options={dropdownControlled} /> 
            </Stack>
        </>
  );
}

}

export default withTranslation()(HeaderSearch);