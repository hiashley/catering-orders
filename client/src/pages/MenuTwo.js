import React, { useState } from 'react';
import { QUERY_MENU_OPTION } from '../utils/queries';
import { useQuery } from '@apollo/client';

export default function Menu() {
  const { loading, error, data } = useQuery(QUERY_MENU_OPTION);

  const menuOptions = data?.menuOptions || [];
  console.log(menuOptions);

  // State to manage whether the list is visible
  const [isListVisible, setListVisible] = useState(false);

  // Function to toggle the list visibility
  const toggleListVisibility = () => {
    setListVisible(!isListVisible);
  };

  return (
    <div>
      <h1>Menu</h1>
      <div>
        {/* Button to toggle the list visibility */}
        <button onClick={toggleListVisibility}>Menu Options</button>

        {/* List of items (revealed when button is clicked) */}
        {isListVisible && (
          <ul>
            {menuOptions.map((item) => (
              <li>{item.optionValue}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
