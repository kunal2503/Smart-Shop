import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";


export const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [userUpdates, setUserUpdates] = useState({});


    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user?.role !== "admin") {
          toast.error("Access denied");
        //   navigate("/"); // Redirect non-admin users
        }
        fetchUsers();
        // fetchOrders();
        // fetchProducts();
        // fetchAnalytics();
      }, []);

    const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
    } catch (err) {
      console.error("Error fetching users:", err);
      toast.error("Failed to fetch users");
    }
  };

  const handleUserUpdateChange = (userId, field, value) => {
    setUserUpdates((prev) => ({
      ...prev,
      [userId]: { ...prev[userId], [field]: value },
    }));
  };

  const handleUpdateUser = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const updates = userUpdates[userId];
      if (!updates) {
        toast.error("No changes to update");
        return;
      }
      const response = await axios.put(
        `http://localhost:3000/api/admin/users/${userId}`,
        updates,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(response.data.message);
      fetchUsers();
    } catch (err) {
      console.error("Error updating user:", err);
      toast.error("Failed to update user");
    }
  };

  return (
    <section className="mb-10">
  <h2 className="text-2xl font-bold mb-4 text-gray-800">Users</h2>
  <ul className="space-y-4">
    {users.map((user) => (
      <li key={user._id} className="bg-white p-4 rounded-xl shadow hover:shadow-md transition-all border border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          
          {/* User Info */}
          <div>
            <p className="text-lg font-semibold text-gray-700">{user.name}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>

          {/* Role Selection */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <label className="text-sm text-gray-700">
              Role:
              <select
                value={userUpdates[user._id]?.role || user.role}
                onChange={(e) => handleUserUpdateChange(user._id, "role", e.target.value)}
                className="ml-2 border border-gray-300 rounded-lg px-2 py-1 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </label>

            {/* Block Toggle */}
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <span>Blocked:</span>
              <input
                type="checkbox"
                checked={userUpdates[user._id]?.isBlocked ?? user.isBlocked ?? false}
                onChange={(e) =>
                  handleUserUpdateChange(user._id, "isBlocked", e.target.checked)
                }
                className="form-checkbox text-red-500"
              />
            </label>

            {/* Update Button */}
            <button
              onClick={() => handleUpdateUser(user._id)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-sm transition"
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
