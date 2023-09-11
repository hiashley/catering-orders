import gql from '@apollo/client'

export const QUERY_MENU = gql`
  query menu {
    menu {
      menu_id
      option_id
    }
  }`;

export const QUERY_MENU_ITEM = gql`
  query menuItem {
    menuItem {
      menu_id
      menu_name
    }
  }`;

export const QUERY_MENU_OPTION = gql`
  query menuOption {
    menuOption {
      option_id
      option_name
    }
  }`;