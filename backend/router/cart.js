
const express = require("express");
const CartController = require("../controller/cart");

const CartRouter = express.Router();
const cartController = new CartController();  // Reuse instance to avoid re-creating in every request

// Sync state cart to database
CartRouter.post("/state-to-cart/:user_id", async (req, res) => {
    try {
        const result = await cartController.stateToCart(req.params.user_id, req.body);
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Add item to cart
CartRouter.post("/add-to-cart", async (req, res) => {
    try {
        const result = await cartController.addToCart(req.body);
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Delete item from cart
CartRouter.delete("/delete-from-cart", async (req, res) => {
    try {
        const result = await cartController.deleteFromCart(req.body);
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Edit cart item quantity
CartRouter.put("/edit-cart", async (req, res) => {
    try {
        const result = await cartController.editCart(req.body);
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get all items in user's cart
CartRouter.get("/get-cart/:user_id", async (req, res) => {
    try {
        const result = await cartController.getCart(req.params.user_id);
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

// // Route to move product to db cart
// CartRouter.post('/move-to-db-cart/:user_id', async (req, res) => {
//     const { user_id, pId, qty } = req.body;
//     const result = await cartController.moveToDbCart(user_id, pId, qty);
//     res.json(result);
// });


// Route to move product to the database cart
CartRouter.post('/move-to-db-cart/:user_id', async (req, res) => {
    const { user_id } = req.params;  // Extract user_id from URL parameter
    const { pId, qty } = req.body;   // Get pId and qty from request body

    // Validate required fields
    if (!pId || qty === undefined) {
        return res.status(400).json({ msg: "Product ID and quantity are required", status: 0 });
    }

    const result = await cartController.moveToDbCart(user_id, pId, qty);
    res.json(result);
});

module.exports = CartRouter;
