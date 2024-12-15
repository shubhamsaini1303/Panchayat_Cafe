
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Assuming you have a User model
        required: true,
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',  // Assuming you have a Product model
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1,
    },
}, { timestamps: true });

const CartModel = mongoose.model('Cart', cartSchema);

module.exports = CartModel;