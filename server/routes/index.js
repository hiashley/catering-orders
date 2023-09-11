const router = require('express').Router();
require("dotenv").config();
const API_KEY = process.env.API_KEY

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


module.exports = router;