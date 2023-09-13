import { Button, FormControl, InputLabel } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import {
  DELETE_INGREDIENT_ITEM,
  UPDATE_INGREDIENT_ITEM,
} from "../utils/mutations";
import { QUERY_MENU_ITEM } from "../utils/queries";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import units from "../utils/helpers";
import Select from "@mui/material/Select";
const IngredientItem = ({ ingredient, menuId }) => {
  const [ingredientName, setIngredientName] = useState(ingredient?.name);
  const [amount, setAmount] = useState(ingredient?.amount);
  const [selectedUnit, setSelectedUnit] = useState(ingredient?.unit);
  const [updateIngredientItem] = useMutation(UPDATE_INGREDIENT_ITEM, {
    update(cache, { data: { updateIngredientItem } }) {
      try {
        const { menuItem } = cache.readQuery({ query: QUERY_MENU_ITEM });

        cache.writeQuery({
          query: QUERY_MENU_ITEM,
          data: { menuItem: [updateIngredientItem, ...menuItem] },
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
  const handleRemoveRow = async (event) => {
    const ingredientId = event.target.dataset.ingredientid;
    if (ingredientId) {
      try {
        await deleteIngredientItem({
          variables: {
            menuId: menuId,
            ingredientId,
          },
        });
      } catch (error) {
        console.error("Error deleting ingredient:", error);
        return;
      }
    }
  };
  const handleSaveRow = async (event) => {
    if (ingredient._id) {
      try {
        await updateIngredientItem({
          variables: {
            menuId: menuId,
            ingredientId: ingredient._id,
            name: ingredientName,
            amount: parseFloat(amount),
            unit: selectedUnit,
          },
        });
      } catch (error) {
        console.error("Error deleting ingredient:", error);
        return;
      }
    }
  };
  return (
    <Box
      sx={{
        "& > :not(style)": { m: 1, width: "23ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-basic"
        label="Ingredient"
        value={ingredientName}
        variant="outlined"
        size="small"
        onChange={(e) => setIngredientName(e.target.value)}
      />
      <TextField
        id="outlined-basic"
        label="Amount"
        variant="outlined"
        value={amount}
        size="small"
        onChange={(e) => setAmount(e.target.value)}
      />
      <FormControl>
        <InputLabel size="small" id="demo-simple-select-label">
          Unit
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedUnit}
          label="Unit"
          size="small"
          onChange={(e) => setSelectedUnit(e.target.value)}
        >
          {units.map((option) => (
            <MenuItem value={option.value}>{option.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button onClick={handleSaveRow} variant="contained">
        Save
      </Button>
      <Button
        data-ingredientid={ingredient._id}
        onClick={(event) => handleRemoveRow(event)}
        variant="outlined"
      >
        Delete
      </Button>
    </Box>
  );
};

export default IngredientItem;
