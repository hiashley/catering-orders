import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Tabs, Tab } from '@mui/material'; // Import Tabs and Tab components
import AccordionItem from '../components/AccordionItem';
import { QUERY_MENU_ITEM, QUERY_MENU_OPTION } from '../utils/queries';

export default function Menu() {
  const { loading: loadingItem, error: errorItem, data: dataItem } = useQuery(QUERY_MENU_ITEM);
  const { loading: loadingOption, error: errorOption, data: dataOption } = useQuery(QUERY_MENU_OPTION);

  const menuItems = dataItem?.menuItems || [];
  const menuOptions = dataOption?.menuOptions || [];

  // State to manage which tab is active
  const [activeTab, setActiveTab] = useState('Tab1');

  // Function to handle tab change
  const handleTabChange = (event, newTab) => {
    setActiveTab(newTab);
  };

  return (
    <div style={{ padding: "3rem" }}>
      <h1>Menu</h1>
      <div>
        {/* Tabs for switching between Menu Items and Menu Options */}
        <Tabs value={activeTab} onChange={handleTabChange} variant="fullWidth">
          <Tab label="Menu Items" value="Tab1" />
          <Tab label="Menu Options" value="Tab2" />
        </Tabs>

        {/* Content for each tab */}
        <div>
          {activeTab === 'Tab1' && !loadingItem && !errorItem && (
            menuItems.map((item) => (
              <AccordionItem isItem={true} price={item.menuPrice} name={item.menuName} posId={item.posId} {...item} />
            ))
          )}

          {activeTab === 'Tab2' && !loadingOption && !errorOption && (
            menuOptions.map((option) => (
              <AccordionItem isItem={false} price={option.optionPrice} name={option.optionValue} posId={option.posModId} {...option} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
