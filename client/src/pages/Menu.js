import React, { useState } from 'react';
import { QUERY_MENU_ITEM, QUERY_MENU_OPTION } from '../utils/queries';
import { useQuery } from '@apollo/client';
import AccordionItem from '../components/AccordionItem';

export default function Menu() {
  const { loading: loadingItem, error: errorItem, data: dataItem } = useQuery(QUERY_MENU_ITEM);
  const { loading: loadingOption, error: errorOption, data: dataOption } = useQuery(QUERY_MENU_OPTION);

  const menuItems = dataItem?.menuItems || [];
  const menuOptions = dataOption?.menuOptions || [];

  // State to manage which tab is active
  const [activeTab, setActiveTab] = useState('Tab1');

  // Function to toggle the active tab
  const toggleTab = (tabName) => {
    setActiveTab(tabName === activeTab ? null : tabName);
  };

  return (
    <div style={{padding: "3rem"}}>
      <h1>Menu</h1>
      <div>
        {/* First tab button */}
        <button onClick={() => toggleTab('Tab1')}>Tab 1</button>

        {/* Second tab button */}
        <button onClick={() => toggleTab('Tab2')}>Tab 2</button>

        {/* List of items (revealed based on the active tab) */}
        <div>
          {activeTab === 'Tab1' && !loadingItem && !errorItem && (
            menuItems.map((item) => (
                <AccordionItem price={item.menuPrice} name={item.menuName} posId={item.posId}{...item} />
            ))
          )}

          {activeTab === 'Tab2' && !loadingOption && !errorOption && (
            menuOptions.map((option) => (
              <AccordionItem price={option.optionPrice} name={option.optionValue} posId={option.posModId} {...option} />
            ))   
          )}
        </div>
      </div>
    </div>
  );
}


