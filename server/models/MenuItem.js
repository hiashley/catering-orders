const { Schema, model } = require("mongoose");

const menuItemSchema = new Schema({
  menuId: {
    type: Schema.Types.Number,
    required: true,
  },
  menuName: {
    type: String,
    required: "You need to provide a menuName!",
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  menuDescription: {
    type: String,
    required: false,
    trim: true,
  },
  menuPrice: {
    type: Schema.Types.Number,
    required: "You need to provide a price!",
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  posId: {
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
    }
  ]
});

const MenuItem = model("MenuItem", menuItemSchema);

module.exports = MenuItem;
