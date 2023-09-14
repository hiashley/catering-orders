import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Tabs, Tab, Button, CircularProgress } from '@mui/material';
import AccordionItem from '../components/AccordionItem';
import { QUERY_MENU_ITEM, QUERY_MENU_OPTION } from '../utils/queries';
import RefreshIcon from '@mui/icons-material/Refresh';
import { syncDatabase } from '../utils/api';
import LoadingSpinner from '../components/UI/LoadingSpinner';
export default function Menu() {
  const { loading: loadingItem, error: errorItem, data: dataItem, refetch: refetchMenuItem } = useQuery(QUERY_MENU_ITEM);
  const { loading: loadingOption, error: errorOption, data: dataOption, refetch: refetchMenuOption } = useQuery(QUERY_MENU_OPTION);
  const [isLoading, setIsLoading] = useState(false);
  const menuItems = dataItem?.menuItems || [];
  const menuOptions = dataOption?.menuOptions || [];

  // State to manage which tab is active
  const [activeTab, setActiveTab] = useState('Tab1');

  // Function to handle tab change
  const handleTabChange = (event, newTab) => {
    setActiveTab(newTab);
  };

  const handleSyncDatabase = async () => {
    try {
      setIsLoading(true);
      const reponse = await syncDatabase(); 
      setIsLoading(false);
        refetchMenuItem();
        refetchMenuOption();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  if (loadingItem && loadingOption) {
    return <><LoadingSpinner/></>
  }

  return (
    <div style={{ padding: "3rem" }}>
      <div className="menu-header">      
      <h1 className="text-3xl font-bold">Menu</h1>
      <Button onClick={handleSyncDatabase} variant="contained" disabled={isLoading}>
          {isLoading ? <CircularProgress size={24} /> : <RefreshIcon />}
        </Button>
      </div>
      <div>
        {/* Tabs for switching between Menu Items and Menu Options */}
        <Tabs className="tabs"  value={activeTab} onChange={handleTabChange} variant="fullWidth">
          <Tab label="Menu Items" value="Tab1" />
          <Tab label="Menu Options" value="Tab2" />
        </Tabs>

        {/* Content for each tab */}
        <div>
          {activeTab === 'Tab1' && (
            menuItems.map((item) => (
              <AccordionItem isItem={true} price={item.menuPrice} name={item.menuName} posId={item.posId} {...item} />
            ))
          )}

          {activeTab === 'Tab2' && (
            menuOptions.map((option) => (
              <AccordionItem isItem={false} price={option.optionPrice} name={option.optionValue} posId={option.posModId} {...option} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
