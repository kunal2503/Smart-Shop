import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("analytics");
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [analytics, setAnalytics] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalSales: 0,
  });
  const [productForm, setProductForm] = useState({
    productId: "",
    name: "",
    price: "",
    description: "",
    stock: "",
    imageUrl: "",
    category: "",
  });
  const [loading, setLoading] = useState(false);
  const [orderStatusUpdates, setOrderStatusUpdates] = useState({});
  const [userUpdates, setUserUpdates] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.role !== "admin") {
      toast.error("Access denied");
      navigate("/");
    }
    fetchUsers();
    fetchOrders();
    fetchProducts();
    fetchAnalytics();
  }, []);
  
  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.get("/api/admin/analytics", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAnalytics(response.data);
    } catch (err) {
      toast.error("Failed to fetch analytics", err);
    }
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.get("/api/admin/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(response.data);
    } catch (err) {
      toast.error("Failed to fetch orders", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("api/products/all-products");
      setProducts(response.data.products);
    } catch (err) {
      toast.error("Failed to load products", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.get("/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
    } catch (err) {
      toast.error("Failed to fetch users", err);
    } finally {
      setLoading(false);
    }
  };

  const handleProductFormChange = (e) => {
    const { name, value } = e.target;
    setProductForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      if (productForm.productId) {
        await axiosInstance.put(
          `/api/admin/products/${productForm.productId}`,
          productForm,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Product updated");
      } else {
        await axiosInstance.post("/api/admin/products", productForm, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Product added");
      }
      setProductForm({
        productId: "",
        name: "",
        price: "",
        description: "",
        stock: "",
        imageUrl: "",
        category: "",
      });
      fetchProducts();
    } catch (err) {
      toast.error("Failed to submit product", err);
    }
  };

  const handleDeleteProduct = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axiosInstance.delete(`/api/admin/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Product deleted");
      fetchProducts();
    } catch (err) {
      toast.error("Failed to delete product", err);
    }
  };

  // Removed old analytics object to fix redeclaration error and use analytics state from backend

  return (
    // {/console.log(orders)}
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

      {/* Tab Navigation */}
      <div className="flex gap-4 mb-6">
        {["analytics", "products", "orders", "users"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md font-medium ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "analytics" && (
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <Link to="/admin-users" className="no-underline">
          <StatCard label="Total Users" value={analytics.totalUsers} />
          </Link>
          <Link to="/admin-orders" className="no-underline">
          <StatCard label="Total Orders" value={analytics.totalOrders} />
          </Link>
          <Link to="/products">
          <StatCard label="Total Products" value={analytics.totalProducts} />
          </Link>
          <StatCard label="Total Sales" value={`₹${analytics.totalSales}`} />
        </section>
      )}

      {activeTab === "products" && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">Manage Products</h2>
          <form
            onSubmit={handleProductSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6 bg-white p-6 rounded-xl shadow"
          >
            {["name", "price", "description", "stock", "imageUrl", "category"].map((field) => (
              <input
                key={field}
                name={field}
                type={field === "price" || field === "stock" ? "number" : "text"}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={productForm[field]}
                onChange={handleProductFormChange}
                required
                className="border border-gray-300 px-4 py-2 rounded-md text-sm"
              />
            ))}
            <button
              type="submit"
              className="sm:col-span-2 md:col-span-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
            >
              {productForm.productId ? "Update Product" : "Add Product"}
            </button>
          </form>

          <div className="bg-white rounded-xl shadow p-6">
            <ul className="space-y-4">
              {products.map((product) => (
                <li
                  key={product._id}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-gray-500">
                      ₹{product.price} • Stock: {product.stock}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        setProductForm({
                          productId: product._id,
                          name: product.name,
                          price: product.price,
                          description: product.description,
                          stock: product.stock,
                          imageUrl: product.imageUrl,
                          category: product.category,
                        })
                      }
                      className="bg-yellow-400 px-3 py-1 rounded text-white text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      className="bg-red-500 px-3 py-1 rounded text-white text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {activeTab === "orders" && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">Orders</h2>
          <ul className="bg-white rounded-xl p-6 shadow">
            {orders.map((order) => (
              <li key={order._id} className="border-b py-2">
                <p className="text-gray-800 font-medium">
                  Order #{order._id} - ₹{order.totalAmount}
                </p>
                <p className="text-sm text-gray-500">User: {order.user?.email || "N/A"}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {activeTab === "users" && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">Users</h2>
          <ul className="bg-white rounded-xl p-6 shadow">
            {users.map((user) => (
              <li key={user._id} className="border-b py-2">
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

const StatCard = ({ label, value }) => (
  <div className="bg-white rounded-xl shadow-md p-6">
    <h3 className="text-gray-500 text-sm uppercase font-medium">{label}</h3>
    <p className="text-2xl font-bold text-gray-800">{value}</p>
  </div>
);

export default AdminDashboard;
