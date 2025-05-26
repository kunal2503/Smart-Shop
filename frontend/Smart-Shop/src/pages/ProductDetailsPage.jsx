import React, { useContext, useState, useEffect } from "react";
import {useParams} from "react-router-dom";
import { CartContext } from "../components/context/CartContext";
import Footer from "../components/Footer";
import axiosInstance from '../../utils/axiosInstance';
import {useNavigate} from "react-router-dom";
import { toast } from "react-toastify";

const ProductDetailsPage = () => {
  const {id} = useParams(); // Assuming you're using react-router-dom for routing
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axiosInstance.get(`/api/products/${id}`);
        setProducts(response.data.product);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, [id]);
  const handleAddToCart = (event) => {
  event.preventDefault();

  if (!token) {
    toast.error("Please Login to add items to cart", {
      autoClose: 2000,
    });
    navigate("/login");
    return; // IMPORTANT: stop further execution here
  }

  addToCart(products);
  
  toast.success("Successfully added to Cart", {
    autoClose: 2000,
  });
};

if (!products || products.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="text-center p-6 bg-white rounded-lg shadow-lg">
          <h4 className="text-2xl font-bold text-gray-700 mb-2">
            Product Not Found
          </h4>
          <p className="text-gray-500">We couldn’t find the product you’re looking for.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <div className="py-10 flex-grow">
        <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg transition-all">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Product Image */}
            <div className="flex justify-center items-center">
              <img
                src={products.imageUrl}
                alt={products.name}
                className="rounded-lg shadow-lg w-full max-w-md object-cover"
              />
            </div>

            {/* Product Details */}
            <div className="flex flex-col justify-center">
              <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
                {products.name}
              </h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                {products.description}
              </p>
              <div className="text-2xl font-bold text-indigo-600 mb-6">
                ${products.price}
              </div>
              <button
                onClick={handleAddToCart}
                className="bg-indigo-600 hover:bg-indigo-700 transition duration-300 ease-in-out text-white py-3 px-6 rounded-lg font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default ProductDetailsPage;
