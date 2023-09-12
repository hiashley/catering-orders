const router = require('express').Router();
require("dotenv").config();
const API_KEY = process.env.API_KEY
const { MenuItem, MenuOption } = require("../models");
router.get("/getAllMenuItems", async (req, res) => {
    try {
    const response = await fetch(`https://d1.getdaves.com/menu/${API_KEY}`);
    const data = await response.json()
    res.status(200).json(data)
    } catch (err) {
    if (err) res.status(400).json(err)
    }
})

router.get("/getAllOrders", async (req, res) => {
    try {
    const response = await fetch(`https://d1.getdaves.com/orders/${API_KEY}`);
    const data = await response.json()
    res.status(200).json(data)
    } catch (err) {
    if (err) res.status(400).json(err)
    }
})

router.get("/getOrderById/:orderId", async (req, res) => {
    try {
    const orderId = req.params.orderId
    const response = await fetch(`https://d1.getdaves.com/order/${orderId}/${API_KEY}`);
    const data = await response.json()
    res.status(200).json(data)
    } catch (err) {
    if (err) res.status(400).json(err)
    }
})

// NOT RECOMMENDED - CRIS

router.get("/getAllOrdersFull", async (req, res) => {
    try {
    const response = await fetch(`https://d1.getdaves.com/orders/all/${API_KEY}`);
    const data = await response.json()
    res.status(200).json(data)
    } catch (err) {
    if (err) res.status(400).json(err)
    }
})

// INSERT TO DB

router.get("/syncDatabase", async (req , res) => {
    try {
        const response = await fetch(`https://d1.getdaves.com/menu/${API_KEY}`);
        const data = await response.json();
        
        const menuItemData = data.menu.map((item) => {
          return {
            menuId: item.menu_id,
            menuName: item.menu_name,
            menuDescription: item.menu_description,
            menuPrice: item.menu_price,
            posId: item.plum_pos_id,
          };
        });
    
        const newMenuItemOptions = [];
        for (const item of menuItemData) {
          const existingItem = await MenuItem.findOne({ menuId: item.menuId });
          if (!existingItem) {
            newMenuItemOptions.push(item);
          }
        }
    
        if (newMenuItemOptions.length > 0) {
          const menuItemDb = await MenuItem.insertMany(newMenuItemOptions);
          console.log(`${newMenuItemOptions.length} new menu items added to the database.`);
        } else {
          console.log("No new menu items to add to the database.");
        }
        const menuOptionData = data.options.map((item) => {
          return {
            optionValueId: item.option_value_id,
            optionName: item.option_name,
            optionValue: item.value,
            optionPrice: item.price,
            posModId: item.plum_pos_mod_id,
          };
        });
        const newMenuOptionItems = [];
        for (const item of menuOptionData) {
          const existingItem = await MenuOption.findOne({ optionValueId: item.optionValueId });
          if (!existingItem) {
            newMenuOptionItems.push(item);
          }
        }
        if (newMenuOptionItems.length > 0) {
          const menuOptionDb = await MenuOption.insertMany(newMenuOptionItems);
          console.log(`${newMenuOptionItems.length} new menu options added to the database.`);
        } else {
          console.log("No new menu options to add to the database.");
        }
    
       res.status(200).json({message: `${newMenuOptionItems.length} new menu options and ${newMenuItemOptions.length} new menu items added to the database.`})
      } catch (err) {
        console.error(err);
      }
})

module.exports = router;