import {gql} from '@apollo/client'

export const QUERY_MENU_ITEM = gql`
  query menuItems {
    menuItems {
      _id
      menuId
      menuName
      menuDescription
      menuPrice
      posId
      ingredients{
        _id
        name
        amount
        unit
      }
    }
  }`;

export const QUERY_MENU_OPTION = gql`
query menuOptions {
  menuOptions {
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
}`;