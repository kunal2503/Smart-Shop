import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "./context/CartContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleAddToCart = (event) => {
  event.preventDefault();

  if (!token) {
    toast.error("Please Login to add items to cart", {
      autoClose: 2000,
    });
    navigate("/login");
    return; // IMPORTANT: stop further execution here
  }

  addToCart(product);
  
  toast.success("Successfully added to Cart", {
    autoClose: 2000,
  });
};

  return (
  <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col max-w-[320px] w-full">
  <Link to={`/product/${product._id}`} className="group">
    <div className="relative aspect-w-3 aspect-h-4 overflow-hidden rounded-t-2xl">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
    <div className="p-4 flex flex-col flex-grow">
      <h2 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
        {product.name}
      </h2>
      <p className="text-gray-600 text-sm mb-3 line-clamp-3 flex-grow">
        {product.description}
      </p>
      <p className="text-indigo-600 font-bold text-lg">${product.price}</p>
    </div>
  </Link>
  <div className="p-4 pt-0 mt-auto">
    <button
      onClick={handleAddToCart}
      className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-full font-semibold py-2.5 transition duration-200 ease-in-out shadow-md hover:shadow-lg transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-300"
    >
      Add To Cart
    </button>
  </div>
</div>


);

};

export default ProductCard;
