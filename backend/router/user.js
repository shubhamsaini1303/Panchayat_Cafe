
const express = require("express");
const UserController = require("../controller/user");

const UserRouter = express.Router();
const userController = new UserController(); // Move this outside to avoid instantiation on every request



// POST create a user
UserRouter.post("/register", async (req, res) => {
    try {
        const result = await userController.register(req.body);
        res.send(result);
    } catch (error) {
        res.send(error);
    }
});

// POST create a user
UserRouter.post("/login", async (req, res) => {
    try {
        const result = await  userController.login(req.body);
        res.send(result);
    } catch (error) {
        res.send(error);
    }
});

UserRouter.post("/move-to-db-cart", async (req, res) => {
});


module.exports = UserRouter;



