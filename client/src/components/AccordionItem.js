import React, { useState } from 'react';

function AccordionItem({ title, content }) {
  const [isOpen, setIsOpen] = useState(false);

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

  const handleRemoveRow = (index) => {
    if (inputRows.length > 1) {
      const updatedRows = [...inputRows];
      updatedRows.splice(index, 1);
      setInputRows(updatedRows);
    }
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedRows = [...inputRows];
    updatedRows[index][name] = value;
    setInputRows(updatedRows);
  };

  return (
    <div className={`accordion-item ${isOpen ? 'open' : ''}`}>
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

                {inputRows.length > 1 && (
                  <button onClick={() => handleRemoveRow(index)}>Remove Row</button>
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
