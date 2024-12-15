
/* eslint-disable react-hooks/exhaustive-deps */

import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Context } from "../../Contexts/MainContext";
import axios from "axios";
import { emptyCart } from "../../Reducers/CartSlice";

function Checkout() {
  const { fetchProduct, product } = useContext(Context);
  const cart = useSelector((store) => store.cart || {}); // Default to empty object
  const user = useSelector((store) => store.user || {}); // Default to empty object
  const navigate = useNavigate();
  const dispatcher = useDispatch();

  useEffect(() => {
    // Redirect to login if user is not logged in
    if (!user?.data?._id) {
      navigate("/login");
    } else {
      fetchProduct();
    }
  }, [user]);

  const cartProducts = (product || []).reduce((acc, p) => {
    const matchedCartItems = (cart.data || []).filter((c) => c.pId === p._id);
    const mergedProducts = matchedCartItems.map((c) => ({ ...c, ...p }));
    return [...acc, ...mergedProducts];
  }, []);

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const shipping_details = {
        name: e.target.name.value,
        email: e.target.email.value,
        contact: e.target.contact.value,
        address: e.target.address.value,
        pincode: e.target.pincode.value,
      };

      const payment_mode = e.target.payment_mode.value;
      const order_total = cart.total + (payment_mode === "1" ? 50 : 0);

      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_ORDER_BASE_URL}/place-order`, {
        payment_mode,
        order_total,
        shipping_details,
        product_details: cartProducts,
        user_id: user?.data?._id, // Safe access to `user_id`
      });

      if (response.data.status === 1) {
        dispatcher(emptyCart());
        if (payment_mode === "1") {
          // Navigate to order-placed page
          navigate(`/order-placed/${response.data.order_id}`);
        } else {
          // Trigger online payment process
          initRazorpayOrder();
        }
      } else {
        alert("Order placement failed. Please try again.");
      }
    } catch (error) {
      console.error("Order placement error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const initRazorpayOrder = () => {
    // Razorpay integration logic
  };

  return (
<div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 md:p-8 bg-gray-50 min-h-screen">
  {/* Cart Products Section */}
  <div className="bg-white shadow-lg rounded-lg p-6">
    <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">Your Cart</h2>
    <table className="text-sm text-left text-gray-700 w-full">
      <thead className="text-xs text-gray-600 uppercase bg-gray-100">
        <tr>
          <th className="px-4 py-3">Product</th>
          <th className="px-4 py-3">Price</th>
          <th className="px-4 py-3">Total</th>
        </tr>
      </thead>
      <tbody>
        {cartProducts.map((cp) => (
          <tr
            key={cp.pId}
            className="border-b hover:bg-gray-50 transition duration-300"
          >
            <td className="px-4 py-3 flex items-center gap-4">
              <img
                className="w-16 h-16 object-cover rounded-md"
                src={`${import.meta.env.VITE_API_BASE_URL}/Images/Product/${cp.image}`}
                alt={cp.name}
              />
              <h3 className="font-medium text-gray-800 text-sm">{cp.name}</h3>
            </td>
            <td className="px-4 py-3 text-gray-700">
              {cp.discount_price.toLocaleString("en-US")} x {cp.qty}
            </td>
            <td className="px-4 py-3 text-gray-800 font-semibold">
              {(cp.discount_price * cp.qty).toLocaleString("en-US")}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <div className="text-right mt-6">
      <h3 className="text-lg font-semibold text-gray-800">
        Total:{" "}
        <span className="text-red-500">
          {cart.total.toLocaleString("en-US")}
        </span>
      </h3>
    </div>
  </div>

  {/* Customer Information Form */}
  <div className="bg-white shadow-lg rounded-lg p-6">
    <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">
      Checkout
    </h2>
    <form onSubmit={formSubmitHandler} className="space-y-6">
      {/* Customer Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          defaultValue={user?.data?.name || ""}
          placeholder="Name"
          className="border p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="email"
          name="email"
          defaultValue={user?.data?.email || ""}
          placeholder="Email"
          className="border p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          name="address"
          defaultValue={user?.data?.address || ""}
          placeholder="Address"
          className="border p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          name="contact"
          defaultValue={user?.data?.contact || ""}
          placeholder="Contact"
          className="border p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          name="pincode"
          defaultValue={user?.data?.pincode || ""}
          placeholder="Pincode"
          className="border p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Payment Method */}
      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-4">
          Payment Method
        </h3>
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="payment_mode"
              value="1"
              className="mr-2 focus:ring-2 focus:ring-blue-500"
              required
            />
            <span>Cash on Delivery (₹50 Extra)</span>
          </label>
          {/* <label className="flex items-center gap-2">
            <input
              type="radio"
              name="payment_mode"
              value="2"
              className="mr-2 focus:ring-2 focus:ring-blue-500"
              required
            />
            <span>UPI Payment</span>
          </label> */}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-md text-lg font-semibold hover:shadow-lg transition duration-300"
      >
        Place Order
      </button>
    </form>
  </div>
</div>

  );
}

export default Checkout;
