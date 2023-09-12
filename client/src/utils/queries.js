import {gql} from '@apollo/client'

export const QUERY_MENU_ITEM = gql`
  query menuItems {
    menuItems {
      _id
      menuName
      menuDescription
      menuPrice
      posId

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

  }
}`;