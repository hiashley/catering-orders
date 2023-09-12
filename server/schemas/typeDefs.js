const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
  }
  
  type MenuOption {
    _id: ID
    optionValueId: Int
    optionName: String
    optionValue: String
    optionPrice: Float
    posModId: String
    ingredients: [Ingredient]!
  }

  type MenuItem {
    _id: ID
    menuId: Int
    menuName: String
    menuDescription: String
    menuPrice: Float
    posId: String
    ingredients: [Ingredient]!
  }

  type Ingredient {
    _id: ID
    name: String
    amount: Float
    unit: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    menuItems:[MenuItem]
    menuOptions: [MenuOption]
    user(username: String!): User
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addIngredientItem(menuId: ID!, name: String!, amount: Float!, unit: String!) : MenuItem
    deleteIngredientItem(menuId: ID!, ingredientId: ID!) : MenuItem
    addIngredientOption(optionId: ID!, name: String!, amount: Float!, unit: String!) : MenuOption
    deleteIngredientOption(optionId: ID!, ingredientId: ID!) : MenuOption
  }
`;

module.exports = typeDefs;