const { check } = require("express-validator");
const VaildatorMiddleware = require("../../middlewares/VaildatorMiddleware");
const { OrderModel } = require("../../models/OrderModel");


exports.createOrderValidator = [
    check("custmerName")
    .notEmpty()
    .withMessage("customer name is required")
    .isLength({ min: 3 })
    .withMessage("customer name must be at least 3 characters")
    .isLength({ max: 50 })
    .withMessage("customer name should not exceed 50 characters"),

    check("totalPrice")
    .isNumeric()
    .withMessage("total price must be a number"),

    check("phone")
    .isMobilePhone("ar-IQ")
    .withMessage("Invalid phone number"),


    check("address")
    .notEmpty()
    .withMessage("address is required")
    .isLength({min:10})
    .withMessage("address must be at least 10 characters")
    .isLength({ max: 150 })
    .withMessage("address should not exceed 150 characters"),

    check("books")
    .notEmpty()
    .withMessage("books is required")
    .isArray(),
    VaildatorMiddleware,
  ];


 