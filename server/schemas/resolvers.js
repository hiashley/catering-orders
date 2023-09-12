const { User, MenuItem, MenuOption } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find()
    },
    menuItems: async () => {
      return MenuItem.find()
    },
    menuOptions: async () => {
      return MenuOption.find()
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id })
      }
      throw AuthenticationError;
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    addIngredientItem: async (parent, {menuId, name, amount, unit}) => {
      const menuItem = await MenuItem.findOneAndUpdate({ _id: menuId},
        {$addToSet: {ingredients: { name, amount, unit }}}, {
          new: true,
          runValidators: true,
        }
        )
        return menuItem;
    },
    deleteIngredientItem: async (parent, { menuId, ingredientId }) => {
        return MenuItem.findOneAndUpdate(
          { _id: menuId },
          {
            $pull: {
              ingredients: {
                _id: ingredientId,
              },
            },
          },
          { new: true }
        );
    },
    addIngredientOption: async (parent, {optionId, name, amount, unit}) => {
      const menuOption = await MenuOption.findOneAndUpdate({ _id: optionId},
        {$addToSet: {ingredients: { name, amount, unit }}}, {
          new: true,
          runValidators: true,
        }
        )
        return menuOption;
    },
    deleteIngredientOption: async (parent, { optionId, ingredientId }) => {
      return MenuOption.findOneAndUpdate(
        { _id: optionId },
        {
          $pull: {
            ingredients: {
              _id: ingredientId,
            },
          },
        },
        { new: true }
      );
  },
  },
};

module.exports = resolvers;