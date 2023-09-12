import React, { useState } from 'react';
import { QUERY_MENU_ITEM, QUERY_MENU_OPTION } from '../utils/queries';
import { useQuery } from '@apollo/client';

export default function Menu() {
  const { loading: loadingItem, error: errorItem, data: dataItem } = useQuery(QUERY_MENU_ITEM);
  const { loading: loadingOption, error: errorOption, data: dataOption } = useQuery(QUERY_MENU_OPTION);

  const menuItems = dataItem?.menuItems || [];
  const menuOptions = dataOption?.menuOptions || [];
  console.log(menuOptions);

  // State to manage whether the list is visible and which tab is active
  const [activeTab, setActiveTab] = useState('Tab1');

  // Function to toggle the active tab
  const toggleTab = (tabName) => {
    setActiveTab(tabName === activeTab ? null : tabName);
  };

  return (
    <div>
      <h1>Menu</h1>
      <div>
        {/* First tab button */}
        <button onClick={() => toggleTab('Tab1')}>Tab 1</button>

        {/* Second tab button */}
        <button onClick={() => toggleTab('Tab2')}>Tab 2</button>

        {/* List of items (revealed based on the active tab) */}
        <ul>
          {activeTab === 'Tab1' && !loadingItem && !errorItem && (
            menuItems.map((item) => (
              <li key={item._id}>
                {item.menuName}
              </li>
            ))
          )}

          {activeTab === 'Tab2' && !loadingOption && !errorOption && (
            menuOptions.map((option) => (
              <li key={option._id}>
                {option.optionValue}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
