const Order = require("../model/order");
const Cart = require("../model/cart"); // Assuming a cart model exists
const Transaction = require("../model/transaction");

// Place Order
exports.placeOrder = async (req, res) => {
  const { user_id, product_details, shipping_details, payment_mode, order_total } = req.body;

  try {
    const newOrder = new Order({
      user_id,
      product_details,
      shipping_details,
      payment_mode,
      order_total,
    });

    const savedOrder = await newOrder.save();

    // Clear the user's cart after placing an order
    await Cart.findOneAndUpdate({ user_id }, { $set: { data: [] } });

    res.status(200).json({ status: 1, order_id: savedOrder._id });
  } catch (error) {
    console.error("Order placement error:", error);
    res.status(500).json({ status: 0, message: "Failed to place order" });
  }
};

// Move cart to database
exports.moveCartToDb = async (req, res) => {
  const { user_id, cart_data } = req.body;

  try {
    await Cart.findOneAndUpdate(
      { user_id },
      { $set: { data: cart_data } },
      { upsert: true, new: true }
    );

    res.status(200).json({ status: 1, message: "Cart saved to database" });
  } catch (error) {
    console.error("Failed to save cart:", error);
    res.status(500).json({ status: 0, message: "Failed to save cart" });
  }
};

exports.paymentSuccess = async (req, res) => {
  try {
    const { order_id, razorpay_response } = req.body; // Assumes order_id and Razorpay response are in the request body

    // Find the order details by order_id
    const orderDetails = await Order.findById(order_id);
    if (!orderDetails) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Create a new Transaction entry
    const transaction = new Transaction({
      order_id: order_id,
      user_id: orderDetails.user_id,
      amount: orderDetails.order_total,
      type: orderDetails.payment_mode,
      payment_status: true, // Assuming payment success sets this to true
      razorpay_response: razorpay_response || null // Set the response if available
    });

    // Save the transaction to the database
    await transaction.save().then(async () => {
      // Update the order with the transaction ID and status
      await Order.updateOne({ _id: order_id }, {
        transaction_id: transaction._id,
        order_status: 2
      });

      // Send success response
      res.status(200).json({
        msg: "Order saved",
        order_id,
        status: 1
      }); 
    }).catch((error) => {
      console.error("Error saving transaction:", error);
      return res.status(500).json({ message: "Failed to save transaction", error });
    });

    return res.status(201).json({ message: "Transaction recorded successfully", transaction });
  } catch (error) {
    console.error("Error recording transaction:", error);
    return res.status(500).json({ message: "An error occurred", error });
  }
};


exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user_id", "name email"); // Populating user data if needed
    res.status(200).json({
      status: 1,
      message: "Orders fetched successfully",
      orders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ status: 0, message: "Failed to fetch orders" });
  }
};


// Get orders for the logged-in user
exports.myOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: 'No orders found for this user',
      });
    }

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching orders',
      error: error.message,
    });
  }
};

// Delete an order by ID
exports.deleteOrder = async (req, res) => {
  try {
    const { order_id } = req.params;

    if (!order_id) {
      return res.status(400).json({ status: 0, message: "Order ID is required" });
    }

    const deletedOrder = await Order.findByIdAndDelete(order_id);

    if (!deletedOrder) {
      return res.status(404).json({ status: 0, message: "Order not found" });
    }

    res.status(200).json({
      status: 1,
      message: "Order deleted successfully",
      deletedOrder,
    });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ status: 0, message: "Failed to delete order" });
  }
};


// Update an order by ID
exports.updateOrder = async (req, res) => {
  try {
    const { order_id } = req.params;
    const updatedData = req.body; // Assuming updated data is sent in the request body

    if (!order_id) {
      return res.status(400).json({ status: 0, message: "Order ID is required" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(order_id, updatedData, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validation rules are applied
    });

    if (!updatedOrder) {
      return res.status(404).json({ status: 0, message: "Order not found" });
    }

    res.status(200).json({
      status: 1,
      message: "Order updated successfully",
      updatedOrder,
    });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ status: 0, message: "Failed to update order" });
  }
};




exports.UserOrder = async (req, res) => {
  try {
    const user_id = req.params.id; // Use the ID from the route parameter
    if (!user_id) {
      return res.status(400).json({ status: 0, message: "User ID is required" });
    }

    const orders = await Order.find({ user_id }).sort({ createdAt: -1 }); // Sort by createdAt descending 
    if (!orders.length) {
      return res.status(404).json({ status: 0, message: "No orders found for this user" });
    }

    res.status(200).json({
      status: 1,
      message: "Orders found successfully",
      orders,
    });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({
      status: 0,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};


