import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [productForm, setProductForm] = useState({
    productId: "",
    name: "",
    price: "",
    description: "",
    stock: "",
    imageUrl: "",
    category: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.role !== "admin") {
      toast.error("Access denied");
      navigate("/"); // Redirect non-admin users
    }
    fetchUsers();
    fetchOrders();
    fetchProducts();
    fetchAnalytics();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.get(
        "http://localhost:3000/api/admin/users",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUsers(response.data);
    } catch (err) {
      console.error("Error fetching users:", err);
      toast.error("Failed to fetch users");
    }
  };

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.get(
        "http://localhost:3000/api/admin/orders",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setOrders(response.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
      toast.error("Failed to fetch orders");
    }
  };

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.get("http://localhost:3000/api/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Products API Response:", response.data);
      setProducts(response.data.data.products); // <--- Updated line
    } catch (err) {
      console.error("Error fetching products:", err);
      toast.error("Failed to fetch products");
    }
  };

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.get(
        "http://localhost:3000/api/admin/analytics",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAnalytics(response.data);
    } catch (err) {
      console.error("Error fetching analytics:", err);
      toast.error("Failed to fetch analytics");
    }
  };

  const handleProductFormChange = (e) => {
    const { name, value } = e.target;
    setProductForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.post(
        "http://localhost:3000/api/products/add-products",
        productForm,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success(response.data.message);
      setProductForm({
        productId: "",
        name: "",
        price: "",
        description: "",
        stock: "",
        imageUrl: "",
        category: "",
      });
      if (fetchProducts) fetchProducts();
    } catch (err) {
      console.error("Error saving product:", err);
      toast.error("Failed to save product");
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      const token = localStorage.getItem("token");
      await axiosInstance.delete(
        `http://localhost:3000/api/admin/products/${productId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Product deleted successfully");
      fetchProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
      toast.error("Failed to delete product");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

      {/* Analytics Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Analytics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-gray-500 text-sm uppercase font-medium">
              Total Users
            </h3>
            <p className="text-2xl font-bold text-gray-800">
              {analytics.totalUsers || 0}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-gray-500 text-sm uppercase font-medium">
              Total Orders
            </h3>
            <p className="text-2xl font-bold text-gray-800">
              {analytics.totalOrders || 0}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-gray-500 text-sm uppercase font-medium">
              Total Products
            </h3>
            <p className="text-2xl font-bold text-gray-800">
              {analytics.totalProducts || 0}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-gray-500 text-sm uppercase font-medium">
              Total Sales
            </h3>
            <p className="text-2xl font-bold text-green-600">
              ₹{analytics.totalSales || 0}
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Manage Products
        </h2>

        {/* Product Form */}
        <form
          onSubmit={handleProductSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6 bg-white p-6 rounded-xl shadow"
        >
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={productForm.name}
            onChange={handleProductFormChange}
            required
            className="border border-gray-300 px-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={productForm.price}
            onChange={handleProductFormChange}
            required
            className="border border-gray-300 px-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={productForm.description}
            onChange={handleProductFormChange}
            required
            className="border border-gray-300 px-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={productForm.stock}
            onChange={handleProductFormChange}
            required
            className="border border-gray-300 px-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="imageUrl"
            placeholder="Image URL"
            value={productForm.imageUrl}
            onChange={handleProductFormChange}
            required
            className="border border-gray-300 px-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={productForm.category}
            onChange={handleProductFormChange}
            required
            className="border border-gray-300 px-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="sm:col-span-2 md:col-span-1 bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-md transition"
          >
            {productForm.productId ? "Update Product" : "Add Product"}
          </button>
        </form>

        {/* Product List */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Product List
          </h3>
          <ul className="space-y-4">
            {console.log(products)}
            {products.map((product) => (
              <li
                key={product._id}
                className="flex flex-wrap justify-between items-center border-b pb-2"
              >
                <div>
                  <p className="font-medium text-gray-800">{product.name}</p>
                  <p className="text-sm text-gray-500">
                    ₹{product.price} • Stock: {product.stock}
                  </p>
                </div>
                <div className="flex gap-2 mt-2 sm:mt-0">
                  <button
                    onClick={() =>
                      setProductForm({
                        productId: product._id,
                        name: product.name,
                        price: product.price,
                        description: product.description,
                        stock: product.stock,
                      })
                    }
                    className="bg-yellow-400 hover:bg-yellow-500 text-white text-sm px-3 py-1 rounded-md transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product._id)}
                    className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded-md transition"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
