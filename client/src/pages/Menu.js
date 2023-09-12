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
              <li key={item.menuId}>
                <AccordionItem menuId={item._id} title={item.menuName} content={item.menuDescription} />
              </li>
            ))
          )}

          {activeTab === 'Tab2' && !loadingOption && !errorOption && (
            menuOptions.map((option) => (
              <li key={option._id}>
                <AccordionItem title={option.optionValue} content={option.optionName} />
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

// function AccordionItem({ title, content }) {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleAccordion = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div className={`accordion-item ${isOpen ? 'open' : ''}`}>
//       <div className="accordion-title">
//         <span className="accordion-arrow" onClick={toggleAccordion}>
//           {isOpen ? '▼' : '▶'}
//         </span>
//         <span className="accordion-title-text">{title}</span>
//       </div>
//       <div className="accordion-content">
//         {isOpen && (
//           <div>
//             <label htmlFor="ingredient">Ingredient:</label>
//             <input type="text" id="ingredient" placeholder="Ingredient" />

//             <label htmlFor="amount">Amount:</label>
//             <input type="text" id="amount" placeholder="Amount" />

//             <label htmlFor="unit">Unit:</label>
//             <input type="text" id="unit" placeholder="Unit" />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

