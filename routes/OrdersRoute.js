

const { getAllOrders, createOrder, getOrderByID, updateOrder } = require("../controllers/OrderController");
const AuthService = require("../utils/token/AuthService");
const { createOrderValidator, getOrderByIdValidator, updateOrderValidator } = require("../utils/vaildators/orderValidator");
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
    AuthService.allowedTo("admin" , "employee"),
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
.put(
    AuthService.protect,
    AuthService.allowedTo("admin" , "employee"),
    updateOrderValidator
    ,updateOrder
)


module.exports = router;
