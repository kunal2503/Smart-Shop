const express = require('express');
const rateLimit = require("express-rate-limit");
const {getMessage} = require("../controllers/chatbotControllers");

const router = express.Router();

//Limit to user 5 requests per minite per ip
const aiLimiter = rateLimit({
    windowMs:60 *1000,//1 minute
    max:5,
    message:"To many AI requests from this IP, please try again a minute.",
})

router.post("/ask",aiLimiter,getMessage);

module.exports = router;