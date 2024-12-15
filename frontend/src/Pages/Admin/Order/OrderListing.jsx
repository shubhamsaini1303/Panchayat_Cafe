

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const OrderListing = () => {
  const [orders, setOrders] = useState([]);

  // Fetch orders
  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_ORDER_BASE_URL}/get-orders`);
      setOrders(response.data.orders);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch orders");
    }
  };

  // Delete order
  const deleteOrder = async (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_ORDER_BASE_URL}/delete/${id}`);
        toast.success("Order deleted successfully");
        fetchOrders();
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to delete order");
      }
    }
  };

  // Update order status
  const updateOrderStatus = async (id, newStatus) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_ORDER_BASE_URL}/update/${id}`, { status: newStatus });
      toast.success("Order status updated successfully");
      fetchOrders();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update order status");
    }
  };

  // Fetch orders on component mount
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Order Listing</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">Order ID</th>
              <th className="px-4 py-2 border">Product Names</th>
              <th className="px-4 py-2 border">Total</th>
              <th className="px-4 py-2 border">Address</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-b">
                <td className="px-4 py-2 border">{order._id}</td>
                <td className="px-4 py-2 border">
                  {order.product_details.map((product) => (
                    <p key={product._id}>{product.name}</p>
                  ))}
                </td>
                <td className="px-4 py-2 border">₹{order.order_total}</td>
                <td className="px-4 py-2 border">{order.shipping_details.address}</td>
                <td className="px-4 py-2 border">
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                    className="border px-2 py-1 rounded"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => deleteOrder(order._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderListing;