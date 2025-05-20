require('dotenv').config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cartRoutes = require("./routes/cart");
const productRoutes = require("./routes/productRoute");
const orderRoutes = require("./routes/orderRoutes");
const profileRoutes = require("./routes/profileRoutes");
const { default: orderModel } = require('./models/orderModel');
const morgan = require("morgan");
const paymentRoutes = require("./routes/paymentRoutes");
const adminRoutes = require("./routes/adminRoutes");
const chatBotRoutes = require("./routes/chatBotRoutes");


const app = express();

// Middleware
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'https://smart-shop-jids.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true // Required if you use cookies or auth headers
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/products", productRoutes)
app.use("/api/orders",orderRoutes )
app.use("/api/users/profile", profileRoutes);
app.use("/api/payment",paymentRoutes);
app.use("/api/admin",adminRoutes);
app.use("/api/chatbot",chatBotRoutes)


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error" });
});
app.use(morgan("combined"))

// Connect MongoDB
// "mongodb://localhost:27017/smart_Buy"
// process.env.MONGO_URL
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.error(err));



// Default route
app.get("/", (req, res) => {
    res.send("Hello from the server");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
