import {gql} from '@apollo/client'

export const QUERY_MENU_ITEM = gql`
  query menuItems {
    menuItem {
      _id
      menuName
      menuDescription
      menuPrice
      posId
      ingredients
    }
  }`;

export const QUERY_MENU_OPTION = gql`
query menuOption {
  menuOptions {
    _id
    optionValueId
    optionName
    optionValue
    optionPrice
    posModId
    ingredients
  }
}`;