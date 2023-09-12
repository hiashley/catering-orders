import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import {
  ADD_INGREDIENT_ITEM,
  DELETE_INGREDIENT_ITEM,
} from "../utils/mutations"; // Replace with your actual import path
import { QUERY_MENU_ITEM } from "../utils/queries";
import BasicAccordion from "./AccordionUI";

function AccordionItem({ title, content, menuId, ingredients }) {
  const [isOpen, setIsOpen] = useState(false);

  const [addIngredientItem] = useMutation(ADD_INGREDIENT_ITEM, {
    update(cache, { data: { addIngredientItem } }) {
      try {
        const { menuItem } = cache.readQuery({ query: QUERY_MENU_ITEM });

        cache.writeQuery({
          query: QUERY_MENU_ITEM,
          data: { menuItem: [addIngredientItem, ...menuItem] },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const [deleteIngredientItem] = useMutation(DELETE_INGREDIENT_ITEM, {
    update(cache, { data: { deleteIngredientItem } }) {
      try {
        const { menuItem } = cache.readQuery({ query: QUERY_MENU_ITEM });

        cache.writeQuery({
          query: QUERY_MENU_ITEM,
          data: { menuItem: [deleteIngredientItem, ...menuItem] },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const createInputRow = () => {
    return {
      ingredient: "",
      amount: "",
      unit: "",
    };
  };
  const [inputRows, setInputRows] = useState([createInputRow()]);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const handleAddRow = () => {
    setInputRows([...inputRows, createInputRow()]);
  };

  const handleRemoveRow = async (event) => {
    const ingredientId = event.target.dataset.ingredientid; // Replace with your actual logic to get the ingredientId
    console.log(ingredientId);
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
        console.error("Error deleting ingredient:", error);
        return;
      }
    }
  };
  const handleRowSubmit = async (index) => {
    try {
      const response = await addIngredientItem({
        variables: {
          menuId: "6500a4db493f8bc4519c5fc9",
          name: "hello",
          amount: parseFloat(1.2),
          unit: "oz",
        },
      });
      // Check for GraphQL errors
      if (response.errors && response.errors.length > 0) {
        console.error("GraphQL Error:", response.errors);
        // Handle GraphQL errors here
      } else {
        // Handle successful submission, e.g., clear form fields or show a success message
      }
    } catch (error) {
      console.error("Error adding ingredient:", error);
      // Handle other errors, such as network errors
    }
  };

  return (
    <>
    <div data-id={menuId} className={`accordion-item ${isOpen ? "open" : ""}`}>
      <div className="accordion-title">
        <span className="accordion-arrow" onClick={toggleAccordion}>
          {isOpen ? "▼" : "▶"}
        </span>
        <span className="accordion-title-text">{title}</span>
      </div>
      <div className="accordion-content">
        {isOpen && (
          <div>
            {ingredients?.map((ingredient, index) => (
              <div key={index} className="input-row">
                <label htmlFor={`ingredient-${index}`}>Ingredient:</label>
                <input
                  type="text"
                  id={`ingredient-${index}`}
                  name="ingredient"
                  value={ingredient.name}
                  placeholder="Ingredient"
                />

                <label htmlFor={`amount-${index}`}>Amount:</label>
                <input
                  type="text"
                  id={`amount-${index}`}
                  name="amount"
                  value={ingredient.amount}
                  placeholder="Amount"
                />

                <label htmlFor={`unit-${index}`}>Unit:</label>
                <input
                  type="text"
                  id={`unit-${index}`}
                  name="unit"
                  value={ingredient.unit}
                  placeholder="Unit"
                />

                <button onClick={() => handleRowSubmit(index, menuId)}>
                  Save
                </button>
                <button
                  data-ingredientid={ingredient._id}
                  onClick={(event) => handleRemoveRow(event)}
                >
                  Delete
                </button>
              </div>
            ))}
            <div className="input-row">
              <label htmlFor={`ingredien`}>Ingredient:</label>
              <input
                type="text"
                id={`ingredient`}
                name="ingredient"
                placeholder="Ingredient"
              />

              <label htmlFor={`amount`}>Amount:</label>
              <input
                type="text"
                id={`amount`}
                name="amount"
                placeholder="Amount"
              />

              <label htmlFor={`unit`}>Unit:</label>
              <input type="text" id={`unit`} name="unit" placeholder="Unit" />

              <button onClick={() => handleRowSubmit(menuId)}>Add</button>
            </div>
          </div>
        )}
      </div>
    </div>
<BasicAccordion />
    </>
  );
}

export default AccordionItem;

