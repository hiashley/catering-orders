const { Schema, model } = require("mongoose");

const menuOptionSchema = new Schema({
  optionValueId: {
    type: Schema.Types.Number,
    required: true,
  },
  optionName: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  optionValue: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  optionPrice: {
    type: Schema.Types.Number,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  posModId: {
    type: String,
    required: true
  },
  ingredients: [
    {
      name: {
        type: String,
        required: true,
      },
      amount: {
        type: Schema.Types.Number,
        required: true,
      },
      unit: {
        type: String,
        required: true,
      },
    },
  ],
});

const MenuOption = model("MenuOption", menuOptionSchema);

module.exports = MenuOption;
