import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_INGREDIENT_ITEM, DELETE_INGREDIENT_ITEM } from '../utils/mutations'; // Replace with your actual import path

function AccordionItem({ title, content, menuId }) {
  const [isOpen, setIsOpen] = useState(false);

  const [addIngredientItem] = useMutation(ADD_INGREDIENT_ITEM);
  const [deleteIngredientItem] = useMutation(DELETE_INGREDIENT_ITEM);

  const createInputRow = () => {
    return {
      ingredient: '',
      amount: '',
      unit: '',
    };
  };
  const [inputRows, setInputRows] = useState([createInputRow()]);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const handleAddRow = () => {
    setInputRows([...inputRows, createInputRow()]);
  };

  const handleRemoveRow = async (index) => {
    const ingredientId = inputRows[index]._id; // Replace with your actual logic to get the ingredientId
    console.log(ingredientId)
    if (ingredientId) {
      // Use the deleteIngredientItem mutation to remove the ingredient
      try {
        await deleteIngredientItem({
          variables: {
            menuId,
            ingredientId,
          },
        });
      } catch (error) {
        console.error('Error deleting ingredient:', error);
        return;
      }
    }
    const updatedRows = [...inputRows];
    updatedRows.splice(index, 1);
    setInputRows(updatedRows);
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedRows = [...inputRows];
    updatedRows[index][name] = value;
    setInputRows(updatedRows);
  };

  const handleRowSubmit = async (index) => {
    const {ingredient, amount, unit } = inputRows[index];
    try {
      const response = await addIngredientItem({
        variables: {
          menuId: menuId,
          name: ingredient,
          amount: parseFloat(amount),
          unit: unit,
        },
      });
  console.log(response)
      // Check for GraphQL errors
      if (response.errors && response.errors.length > 0) {
        console.error('GraphQL Error:', response.errors);
        // Handle GraphQL errors here
      } else {
        // Handle successful submission, e.g., clear form fields or show a success message
      }
    } catch (error) {
      console.error('Error adding ingredient:', error);
      // Handle other errors, such as network errors
    }
  };
  

  return (
    <div data-id={menuId} className={`accordion-item ${isOpen ? 'open' : ''}`}>
      <div className="accordion-title">
        <span className="accordion-arrow" onClick={toggleAccordion}>
          {isOpen ? '▼' : '▶'}
        </span>
        <span className="accordion-title-text">{title}</span>
      </div>
      <div className="accordion-content">
        {isOpen && (
          <div>
            {inputRows.map((row, index) => (
              <div key={index} className="input-row">
                <label htmlFor={`ingredient-${index}`}>Ingredient:</label>
                <input
                  type="text"
                  id={`ingredient-${index}`}
                  name="ingredient"
                  value={row.ingredient}
                  onChange={(event) => handleInputChange(index, event)}
                  placeholder="Ingredient"
                />

                <label htmlFor={`amount-${index}`}>Amount:</label>
                <input
                  type="text"
                  id={`amount-${index}`}
                  name="amount"
                  value={row.amount}
                  onChange={(event) => handleInputChange(index, event)}
                  placeholder="Amount"
                />

                <label htmlFor={`unit-${index}`}>Unit:</label>
                <input
                  type="text"
                  id={`unit-${index}`}
                  name="unit"
                  value={row.unit}
                  onChange={(event) => handleInputChange(index, event)}
                  placeholder="Unit"
                />

                <button onClick={() => handleRowSubmit(index, menuId)}>Submit</button>
                {inputRows.length > 1 && (
                  <button onClick={() => handleRemoveRow(index, menuId)}>Remove Row</button>
                )}
              </div>
            ))}
            <button onClick={handleAddRow}>Add Row</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AccordionItem;
