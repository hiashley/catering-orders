const db = require("../config/connection");
const { MenuItem, MenuOption } = require("../models");
require("dotenv").config();
const API_KEY = process.env.API_KEY;

// db.once("open", async () => {
//   try {
//     const response = await fetch(`https://d1.getdaves.com/menu/${API_KEY}`);
//     const data = await response.json();
//     const menu = data.menu.map((item) => {
//         return {
//             menuName: item.menu_name,
//             menuDescription: item.menu_description,
//             menuPrice: item.menu_price,
//             posId: item.plum_pos_id,
//         }
//     })
//     const cateringDb = await MenuItem.insertMany(menu);

//     console.log("games seeded!");
//     process.exit(0);
//   } catch (err) {
//     console.log(err);
//   }
// });

db.once("open", async () => {
  try {
    const response = await fetch(`https://d1.getdaves.com/menu/${API_KEY}`);
    const data = await response.json();
    const option = data.options.map((item) => {
        return {
            optionValueId: item.option_value_id,
            optionName: item.option_name,
            optionValue: item.value,
            optionPrice: item.price,
            posModId: item.plum_pos_mod_id
        }
    })
    const cateringDb = await MenuOption.insertMany(option);
    console.log("games seeded!");
    process.exit(0);
  } catch (err) {
    console.log(err);
  }
});
