const express = require('express');
const router = express.Router();
const {
  addProduct,
  getAllProducts,
  singleProduct
} = require('../controllers/productControllers');

const { verifyToken } = require("../middlewares/verifyTokens");
const  verifyAdmin = require("../middlewares/verifyAdmin");
const authenticate = require("../middlewares/authenticate"); // Optional depending on usage

// ✅ Admin-only route to add a new product
router.post("/add-products",  verifyAdmin, addProduct);

// ✅ Public route: get all products
router.get("/all-products", getAllProducts);

// ✅ Optional alias for the same route as above (GET /api/products/)
router.get("/", getAllProducts);

// ✅ Public route: get a single product by ID
router.get("/:id", singleProduct);

module.exports = router;
