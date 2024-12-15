

const CartModel = require("../model/cart");

class CartController {
    /**
     * Syncs the state cart with the database.
     * Saves each product from the frontend state into the cart collection.
     */
    async stateToCart(user_id, { state_cart }) {
        try {
            for (let sc of state_cart) {
                await new CartModel({
                    user_id: user_id,
                    pId: sc.pId,
                    qty: sc.qty
                }).save();
            }
            return { msg: "Cart synced successfully", status: 1 };
        } catch (error) {
            return { msg: "Something went wrong", status: 0 };
        }
    }

    /**
     * Adds a product to the cart, syncs with the database via moveToDbCart.
     */
    async addToCart({ user_id, pId, qty = 1 }) {
        try {
            const result = await this.moveToDbCart(user_id, pId, qty);
            return result;
        } catch (error) {
            return { msg: "Error adding product to cart", status: 0 };
        }
    }

    async moveToDbCart(user_id, pId, qty = 1) {
        try {
            // Find the cart item with the specified user_id and pId
            let cartItem = await CartModel.findOne({ user_id, pId });
            
            if (cartItem) {
                // If product already in cart, update the quantity
                cartItem.qty += qty;
                await cartItem.save();
            } else {
                // If product not in cart, create a new entry
                await new CartModel({ user_id, pId, qty }).save();
            }
            
            return { msg: "Product added to cart", status: 1 };
        } catch (error) {
            console.error("Error in moveToDbCart:", error);
            return { msg: "Error moving product to cart", status: 0 };
        }
    }

    /**
     * Removes a product from the cart and updates the database.
     */
    async deleteFromCart({ user_id, pId }) {
        try {
            await CartModel.deleteOne({ user_id, pId });
            return { msg: "Product removed from cart", status: 1 };
        } catch (error) {
            return { msg: "Error removing product from cart", status: 0 };
        }
    }

    /**
     * Edits the quantity of a product in the cart.
     */
    async editCart({ user_id, pId, qty }) {
        try {
            let cartItem = await CartModel.findOne({ user_id, pId });
            if (cartItem) {
                cartItem.qty = qty;
                await cartItem.save();
                return { msg: "Cart updated", status: 1 };
            } else {
                return { msg: "Product not found in cart", status: 0 };
            }
        } catch (error) {
            return { msg: "Error updating cart", status: 0 };
        }
    }

    /**
     * Retrieves the user's cart.
     */
    async getCart(user_id) {
        try {
            const cart = await CartModel.find({ user_id });
            return { cart, status: 1 };
        } catch (error) {
            return { msg: "Error retrieving cart", status: 0 };
        }
    }
}

module.exports = CartController;
