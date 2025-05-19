import React, { useContext } from "react";
import { CartContext } from "../components/context/CartContext";
import { Link } from "react-router-dom";
import { BsShopWindow } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { motion } from "framer-motion";
import { FaUserShield, FaBox, FaChartBar, FaUsers, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
// import {FaUse} 

const Navbar = () => {
  const { cartItem } = useContext(CartContext);

  // Ensure cartItem is an array and calculate totalQuantity
  const totalItems = Array.isArray(cartItem)
    ? cartItem.reduce((sum, item) => sum + (item?.quantity || 0), 0)
    : 0;
  const totalQuantity = totalItems > 0 ? totalItems : 0;

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user)
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
      // Admin Navbar
  if (token && user?.role === "admin") {
    return (
      <nav className="bg-gray-900 text-white px-4 py-3 flex justify-between items-center shadow">
        <div className="flex items-center gap-2 text-xl font-bold">
          <FaUserShield className="text-blue-400" />
          SmartBuy Admin
        </div>
        <div className="flex-grow max-w-md mx-4">
          <input
            type="text"
            placeholder="Search Items"
            className="w-full px-3 py-1 rounded bg-gray-800 text-white focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-5 text-sm sm:text-base">
          <Link to="/admin-dashboard" className="hover:text-blue-400 flex items-center gap-1">
            <FaChartBar /> Dashboard
          </Link>
          <Link to="/admin-users" className="hover:text-blue-400 flex items-center gap-1">
            <FaUsers /> Users
          </Link>
          <Link to="/admin-orders" className="hover:text-blue-400 flex items-center gap-1">
            <FaBox /> Orders
          </Link>
          <Link to="/admin/profile" className="hover:text-blue-400 flex items-center gap-1">
            <FaUserShield /> Profile
          </Link>
          <button onClick={handleLogout} className="hover:text-red-400 flex items-center gap-1">
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </nav>
    );
  }

  // User Navbar
  if (token && user?.role === "user") {
    return (
      <nav className="flex items-center justify-between bg-gray-950 shadow-md py-4 px-6">
        <div>
          <Link to="/" className="flex items-center gap-1">
            <BsShopWindow className="size-6 text-white" />
            <span className="font-medium text-white">SmartBuy</span>
          </Link>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search Items"
            className="p-2 rounded text-white outline-none bg-gray-900 w-full"
          />
        </div>
        <div className="flex items-center gap-6">
          <Link to="/product" className="flex gap-1 text-white">
            <AiFillProduct className="size-6" />
            <span className="font-medium">Products</span>
          </Link>

          <Link to="/cart" className="relative flex gap-1 text-white">
            {totalItems > 0 && (
              <motion.span
                key={totalItems}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="absolute -top-2 -right-3 bg-amber-600 text-white text-xs font-bold px-2 py-0.5 rounded-full"
              >
                {totalItems}
              </motion.span>
            )}
            <FaShoppingCart className="size-6" />
            <span className="font-medium">Cart</span>
          </Link>

          <Link to="/profile" className="flex gap-1 text-white">
            <FaUserAlt className="size-6" />
            <span className="font-medium">Profile</span>
          </Link>

          <button onClick={handleLogout} className="flex gap-1 text-white">
            <FaSignOutAlt className="size-6" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </nav>
    );
  }

  // Public Navbar (Not logged in)
  return (
    <nav className="flex items-center justify-between bg-gray-950 shadow-md py-4 px-6">
      <div>
        <Link to="/" className="flex items-center gap-1">
          <BsShopWindow className="size-6 text-white" />
          <span className="font-medium text-white">SmartBuy</span>
        </Link>
      </div>
      <div>
        <input
          type="text"
          placeholder="Search Items"
          className="p-2 rounded text-white outline-none bg-gray-900 w-full"
        />
      </div>
      <div className="flex items-center gap-6">
        <Link to="/product" className="flex gap-1 text-white">
          <AiFillProduct className="size-6" />
          <span className="font-medium">Products</span>
        </Link>
        <Link to="/login" className="flex gap-1 text-white">
          <FaUserAlt className="size-6" />
          <span className="font-medium">Login</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
