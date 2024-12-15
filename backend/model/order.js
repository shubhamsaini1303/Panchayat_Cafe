
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  product_details: [
    {
      pId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      name: String,
      qty: Number,
      discount_price: Number,
      image: String,
    },
  ],
  shipping_details: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: String, required: true },
    address: { type: String, required: true },
    pincode: { type: String, required: true },
  },
  payment_mode: { type: String, enum: ["1", "2"], required: true }, // 1 for COD, 2 for UPI
  order_total: { type: Number, required: true },
  status: { type: String,  enum: ["Pending", "Shipped", "Delivered"],   default: "Pending" },
  created_at: { type: Date, default: Date.now },
});

// module.exports = mongoose.model("Order", orderSchema);

const Order = new mongoose.model("Order" , orderSchema);

module.exports = Order;