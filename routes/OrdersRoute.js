

const { getAllOrders, createOrder, getOrderByID } = require("../controllers/OrderController");
const AuthService = require("../utils/token/AuthService");
const { createOrderValidator, getOrderByIdValidator } = require("../utils/vaildators/orderValidator");
const router = require("express").Router();

router
.route("/")
.get(
    AuthService.protect,
    AuthService.allowedTo("admin" , "employee")
    ,getAllOrders
)
.post(
    AuthService.protect,
    AuthService.allowedTo("user" , "employee"),
    createOrderValidator , 
    createOrder
)

router
.route("/:id")
.get(
    AuthService.protect,
    AuthService.allowedTo("admin", "employee"),
    getOrderByIdValidator , 
    getOrderByID
)


module.exports = router;
