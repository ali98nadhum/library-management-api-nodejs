

const { getAllOrders, createOrder } = require("../controllers/OrderController");
const AuthService = require("../utils/token/AuthService");
const { createOrderValidator } = require("../utils/vaildators/orderValidator");
const router = require("express").Router();

router
.route("/")
.get(AuthService.protect,AuthService.allowedTo("admin" , "employee"),getAllOrders)
.post(createOrderValidator , createOrder)


module.exports = router;
