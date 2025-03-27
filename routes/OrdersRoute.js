

const { getAllOrders } = require("../controllers/OrderController");
const AuthService = require("../utils/token/AuthService");
const router = require("express").Router();

router
.route("/")
.get(
    AuthService.protect,
    AuthService.allowedTo("admin" , "employee"),
    getAllOrders
);


module.exports = router;
