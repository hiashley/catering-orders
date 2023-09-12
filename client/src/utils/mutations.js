import { gql } from "@apollo/client";

export const ADD_INGREDIENT_ITEM = gql`
mutation addIngredientItem($menuId: ID!, $name: String!, $amount: Float!, $unit: String!) {
    addIngredientItem(menuId: $menuId, name: $name, amount: $amount, unit: $unit) {
      _id
      menuId
      menuName
      menuDescription
      menuPrice
      posId
      ingredients {
        _id
        name
        amount
        unit
      }
    }
  }
`;

export const DELETE_INGEDIENT_ITEM = gql`
mutation deleteIngredientItem($menuId: ID!, $ingredientId: ID!) {
    deleteIngredientItem(menuId: $menuId, ingredientId: $ingredientId) {
      _id
      menuId
      menuName
      menuDescription
      menuPrice
      posId
      ingredients {
        _id
        name
        amount
        unit
      }
    }
  }
`;

export const ADD_INGREDIENT_OPTION = gql`
mutation addIngredientOption($optionId: ID!, $name: String!, $amount: Float!, $unit: String!) {
    addIngredientOption(optionId: $optionId, name: $name, amount: $amount, unit: $unit) {
      _id
      optionValueId
      optionName
      optionValue
      optionPrice
      posModId
      ingredients {
        _id
        name
        amount
        unit
      }
    }
  }
`
export const DELETE_INGEDIENT_OPTION = gql`
mutation DeleteIngredientOption($optionId: ID!, $ingredientId: ID!) {
    deleteIngredientOption(optionId: $optionId, ingredientId: $ingredientId) {
      _id
      optionValueId
      optionName
      optionValue
      optionPrice
      posModId
      ingredients {
        _id
        name
        amount
        unit
      }
    }
  }
`;