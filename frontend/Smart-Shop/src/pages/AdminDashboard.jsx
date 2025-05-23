import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [productForm, setProductForm] = useState({
    productId: "",
    name: "",
    price: "",
    description: "",
    stock: "",
    imageUrl: "",
    category: "",
  });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.get("/api/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(response.data.data.products);
    } catch (err) {
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.get("/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data.data.users);
    } catch (err) {
      toast.error("Failed to fetch users");
    }
  };

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.get("/api/admin/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(response.data.data.orders);
    } catch (err) {
      toast.error("Failed to fetch orders");
    }
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const endpoint = productForm.productId
        ? `/api/admin/products/${productForm.productId}`
        : "/api/products/add-products";

      const method = productForm.productId ? "put" : "post";

      const response = await axiosInstance[method](endpoint, productForm, {
        headers: { Authorization: `Bearer ${token}` },
      });

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
      fetchProducts();
    } catch (err) {
      toast.error("Failed to save product");
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchUsers();
    fetchOrders();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <form
        onSubmit={handleProductSubmit}
        className="space-y-4 border p-4 rounded-lg shadow mb-8"
      >
        <input
          type="text"
          placeholder="Product Name"
          value={productForm.name}
          onChange={(e) =>
            setProductForm({ ...productForm, name: e.target.value })
          }
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Price"
          value={productForm.price}
          onChange={(e) =>
            setProductForm({ ...productForm, price: e.target.value })
          }
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Description"
          value={productForm.description}
          onChange={(e) =>
            setProductForm({ ...productForm, description: e.target.value })
          }
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Stock"
          value={productForm.stock}
          onChange={(e) =>
            setProductForm({ ...productForm, stock: e.target.value })
          }
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={productForm.imageUrl}
          onChange={(e) =>
            setProductForm({ ...productForm, imageUrl: e.target.value })
          }
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Category"
          value={productForm.category}
          onChange={(e) =>
            setProductForm({ ...productForm, category: e.target.value })
          }
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {productForm.productId ? "Update Product" : "Add Product"}
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-2">Product List</h2>
      {loading ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <ul className="space-y-4">
          {products.map((product) => (
            <li
              key={product._id}
              className="border p-4 rounded-lg shadow-md flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-bold">{product.name}</h3>
                <p className="text-sm text-gray-600">{product.description}</p>
                <p className="text-sm">Price: ${product.price}</p>
                <p className="text-sm">Stock: {product.stock}</p>
              </div>
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
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminDashboard;
