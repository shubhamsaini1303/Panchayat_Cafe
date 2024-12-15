const express = require("express");
const cors = require("cors");
// const mongoose = require("mongoose");
const CategoryRouter = require("./router/Category");
const ColorRouter = require("./router/color");
const ProductRouter = require("./router/product");
const UserRouter = require("./router/user");
const CartRouter = require("./router/cart");
const OrderRouter = require("./router/order");
const AdminAuth = require("./middleware/adminAuth");
const ShopRouter = require("./router/shoprouter");
const { default: mongoose } = require("mongoose");
const database = require("./database/db");
const AdminRouter = require("./router/admin");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("Public"));

app.get(
    "/test", 
    AdminAuth, 
    (req, res) => {
        res.send("Hii")
    }
)


const category_url = process.env.CATEGORY_URL
const product_url = process.env.PRODUCT_URL
const user_url = process.env.USER_URL
const cart_url = process.env.CART_URL
const order_url = process.env.ORDER_URL
const shop_url = process.env.SHOP_URL
const admin_url = process.env.ADMIN_URL
const color_url = process.env.COLOR_URL 

app.use(category_url, CategoryRouter);
app.use(color_url, ColorRouter);
app.use(product_url, ProductRouter);
app.use(user_url, UserRouter);
app.use(cart_url, CartRouter);
app.use(order_url, OrderRouter);
app.use(shop_url, ShopRouter);
app.use(admin_url , AdminRouter);

const port = process.env.PORT

database();


app.listen(port, (req, res) => {
    console.log("server is working");
        });