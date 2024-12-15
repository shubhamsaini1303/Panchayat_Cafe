
const express = require("express");
const OrderRouter = express.Router();
const orderController = require("../controller/order");
const AdminAuth = require("../middleware/adminAuth");

// Place order route
OrderRouter.post("/place-order", orderController.placeOrder);

// Move cart to database route
OrderRouter.post("/move-to-db-cart", orderController.moveCartToDb);

// OrderRouter.get("/get-orders/:user_id?/:order_id?", AdminAuth, orderController.getorders)
OrderRouter.get("/get-orders"  , orderController.getOrders)

OrderRouter.post("/my/:id" ,  orderController.myOrders);

// Delete an Order
OrderRouter.delete("/delete/:order_id" , orderController.deleteOrder);

// Update an order
OrderRouter.put("/update/:order_id", orderController.updateOrder);

OrderRouter.get("/user-order/:id", orderController.UserOrder);


module.exports = OrderRouter;
