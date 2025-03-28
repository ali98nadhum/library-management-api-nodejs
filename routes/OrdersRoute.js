

const { getAllOrders, createOrder, getOrderByID } = require("../controllers/OrderController");
const AuthService = require("../utils/token/AuthService");
const { createOrderValidator, getOrderByIdValidator } = require("../utils/vaildators/orderValidator");
const router = require("express").Router();

router
.route("/")
.get(AuthService.protect,AuthService.allowedTo("admin" , "employee"),getAllOrders)
.post(createOrderValidator , createOrder)

router
.route(":id")
.get(getOrderByIdValidator , getOrderByID)


module.exports = router;
