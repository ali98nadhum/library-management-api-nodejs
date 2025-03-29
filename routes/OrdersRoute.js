

const { getAllOrders, createOrder, getOrderByID, updateOrder, deleteOrder } = require("../controllers/OrderController");
const AuthService = require("../utils/token/AuthService");
const { createOrderValidator, getOrderByIdValidator, updateOrderValidator, deleteOrderValidator } = require("../utils/vaildators/orderValidator");
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
.delete(
    AuthService.protect,
    AuthService.allowedTo("admin"),
    deleteOrderValidator,
    deleteOrder
)


module.exports = router;
