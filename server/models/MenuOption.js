const { Schema, model } = require("mongoose");

const menuOptionSchema = new Schema({
  optionValueId: {
    type: Schema.Types.Number,
    required: false,
  },
  optionName: {
    type: String,
    required: false,
    minlength: 1,
    maxlength: 280,
  },
  optionValue: {
    type: String,
    required: false,
    minlength: 1,
    maxlength: 280,
  },
  optionPrice: {
    type: Schema.Types.Number,
    required: false,
    minlength: 1,
    maxlength: 280,
  },
  posModId: {
    type: String,
    required: false
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
