const express = require("express");
const { addShop, getShops, getShopById, deleteShop, updateShop } = require("../controller/shopcontroller");

const ShopRouter = express.Router();

ShopRouter.post("/create", addShop);

ShopRouter.get("/allshops", getShops);

ShopRouter.get("/myshop/:id" , getShopById);

ShopRouter.delete("/delete/:id" , deleteShop);

ShopRouter.put("/update/:id", updateShop);

module.exports = ShopRouter;