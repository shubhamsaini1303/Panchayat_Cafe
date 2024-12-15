

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector((store) => store.user.data); // Get user info from Redux store

  useEffect(() => {
    if (user?._id) {
      fetchUserOrders(user._id);
    }
  }, [user]);

  const fetchUserOrders = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_ORDER_BASE_URL}/user-order/${id}`);
      if (response.data.status === 1) {
        setOrders(response.data.orders);
      } else {
        console.error("Error:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching user orders:", error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <div className="text-center text-gray-500">Please log in to view your orders.</div>;
  }

  if (loading) {
    return <div className="text-center text-gray-500">Loading orders...</div>;
  }

  if (!orders.length) {
    return <div className="text-center text-gray-500">No orders found.</div>;
  }

  console.log(orders);
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
      <div className="grid grid-cols-1 gap-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="p-4 border rounded-lg shadow-md bg-white"
          >
            <h3 className="text-lg font-semibold mb-2">
              Order ID: {order._id}
            </h3>
            <p className="text-gray-600 mb-2">
              Status: <span className="font-medium">{order.status}</span>
            </p>
            <p className="text-gray-600 mb-4">
              Total Price: ₹{order.order_total}
            </p>
            <div className="grid grid-cols-1 gap-4">
              {order.product_details.map((product) => (
                <div
                  key={product.pId}
                  className="flex items-center gap-4 border-b pb-2"
                >
                  <div>
                    <h4 className="text-md font-semibold">
                      {product.name || "Product Name"}
                    </h4>
                    <p>Quantity: {product.qty}</p>
                    <p>Price: ₹{product.discount_price}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <h4 className="text-md font-semibold">Shipping Details:</h4>
              <p>{order.shipping_details.name}</p>
              <p>{order.shipping_details.address}</p>
              <p>Contact: {order.shipping_details.contact}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderList;
