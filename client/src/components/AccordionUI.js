import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useMutation } from "@apollo/client";
import {
  ADD_INGREDIENT_ITEM,
  DELETE_INGREDIENT_ITEM,
} from "../utils/mutations";
import { QUERY_MENU_ITEM } from "../utils/queries";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import { Button, FormControl, InputLabel } from "@mui/material";
import units from "../utils/helpers";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(180deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function BasicAccordion({ menuName, ingredients, menuId, _id }) {
  const [ingredientName, setIngredientName] = useState("");
  const [amount, setAmount] = useState(0);
  const [selectedUnit, setSelectedUnit] = useState("");
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

  const handleRemoveRow = async (event) => {
    const ingredientId = event.target.dataset.ingredientid;
    if (ingredientId) {
      try {
        await deleteIngredientItem({
          variables: {
            menuId: _id,
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
          menuId: _id,
          name: ingredientName,
          amount: parseFloat(amount),
          unit: selectedUnit,
        },
      });
      if (response.errors && response.errors.length > 0) {
        console.error("GraphQL Error:", response.errors);
      } else {
        setIngredientName("");
        setSelectedUnit("");
        setAmount(0);
      }
    } catch (error) {
      console.error("Error adding ingredient:", error);
    }
  };

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1d-content"
        id="panel1d-header"
      >
        <Typography>{menuName}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {ingredients?.map((ingredient, index) => (
          <div key={index} className="input-row">
            <Box
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-basic"
                label="Ingredient"
                value={ingredient.name}
                variant="outlined"
                size="small"
              />
              <TextField
                id="outlined-basic"
                label="Amount"
                variant="outlined"
                value={ingredient.amount}
                size="small"
              />
              <FormControl>
                <InputLabel size="small" id="demo-simple-select-label">
                  Unit
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={ingredient.unit}
                  label="Unit"
                  size="small"
                  onChange={(e) => setSelectedUnit(e.target.value)}
                >
                  {units.map((option) => (
                    <MenuItem value={option.value}>{option.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                onClick={() => handleRowSubmit(menuId)}
                variant="contained"
              >
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
          </div>
        ))}
        <Box
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="Ingredient"
            variant="outlined"
            size="small"
            value={ingredientName}
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
          <Button onClick={() => handleRowSubmit(menuId)} variant="contained">
            Add
          </Button>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
