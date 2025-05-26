import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

const AdminOrders = () => {
     const [orderStatusUpdates, setOrderStatusUpdates] = useState({});
      const [orders, setOrders] = useState([]);

      useEffect(() => {
          const user = JSON.parse(localStorage.getItem("user"));
          if (user?.role !== "admin") {
            toast.error("Access denied");
            // navigate("/"); // Redirect non-admin users
          }
          fetchOrders();
        }, []);
      

    const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.get("/api/admin/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data);
      setOrders(response.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
      toast.error("Failed to fetch orders");
    }
  };

   const handleOrderStatusChange = (orderId, status) => {
    setOrderStatusUpdates((prev) => ({ ...prev, [orderId]: status }));
  };

  const handleUpdateOrderStatus = async (orderId) => {
    try {
      const token = localStorage.getItem("token");
      const status = orderStatusUpdates[orderId];
      if (!status) {
        toast.error("Please select a status");
        return;
      }
      const response = await axiosInstance.put(
        `/api/admin/orders/${orderId}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(response.data.message);
      fetchOrders();
    } catch (err) {
      console.error("Error updating order status:", err);
      toast.error("Failed to update order status");
    }
  };
  console.log(orders)
  return (
    <section className="mb-10">
  <h2 className="text-2xl font-bold mb-4 text-gray-800">Orders</h2>
  {console.log("Orders:", orders)}
  <ul className="space-y-4">
    {orders.map((order) => (
      <li key={order._id} className="bg-white p-4 rounded-xl shadow hover:shadow-md transition-all border border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="mb-3 sm:mb-0">
            <p className="text-gray-700">
              <span className="font-semibold">Order ID:</span> {order._id}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">User:</span> {order.user?.name || "Unknown"}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Total:</span> ₹{order.totalAmount}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <select
              value={orderStatusUpdates[order._id] || order.status || ""}
              onChange={(e) => handleOrderStatusChange(order._id, e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <button
              onClick={() => handleUpdateOrderStatus(order._id)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-all"
            >
              Update
            </button>
          </div>
        </div>
      </li>
    ))}
  </ul>
</section>

  )
}

export default AdminOrders