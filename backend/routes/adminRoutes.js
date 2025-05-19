const express = require("express");
const {verifyToken, authorizeRoles}= require("../middlewares/verifyTokens")
const {
  getAllUsers,
  getAllOrders,
  manageProducts,
  deleteProduct,
  updateOrderStatus,
  updateUser,
  getAnalytics
} = require("../controllers/adminControllers");
const router = express.Router();

// Protect all admin routes with middleware
router.use(verifyToken, authorizeRoles("admin"));

// Admin routes
router.get("/users", getAllUsers); // Fetch all users
router.get("/orders", getAllOrders); // Fetch all orders
router.post("/products", manageProducts); // Add or update products
router.delete("/products/:productId", deleteProduct); // Delete product
router.put("/orders/:orderId/status", updateOrderStatus); // Update order status
router.put("/users/:userId", updateUser); // Update user role or block/unblock
router.get("/analytics", getAnalytics); // Get analytics data

module.exports = router;
