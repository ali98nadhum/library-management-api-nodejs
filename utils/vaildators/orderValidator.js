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

  check("phone").isMobilePhone("ar-IQ").withMessage("Invalid phone number"),

  check("address")
    .notEmpty()
    .withMessage("address is required")
    .isLength({ min: 10 })
    .withMessage("address must be at least 10 characters")
    .isLength({ max: 150 })
    .withMessage("address should not exceed 150 characters"),

  check("books")
    .notEmpty()
    .withMessage("books is required")
    .isMongoId()
    .withMessage("Invalid book id")
    .isArray(),
  VaildatorMiddleware,
];

exports.getOrderByIdValidator = [
  check("id").isMongoId().withMessage("Invalid order id"),
  VaildatorMiddleware,
];

exports.updateOrderValidator = [
  check("id").isMongoId().withMessage("Invalid order id"),

  check("custmerName")
    .optional()
    .isLength({ min: 3 })
    .withMessage("customer name must be at least 3 characters")
    .isLength({ max: 50 })
    .withMessage("customer name should not exceed 50 characters"),

  check("phone")
    .optional()
    .isMobilePhone("ar-IQ")
    .withMessage("Invalid phone number"),

  check("address")
    .optional()
    .isLength({ min: 10 })
    .withMessage("address must be at least 10 characters")
    .isLength({ max: 150 })
    .withMessage("address should not exceed 150 characters"),

  check("status")
    .optional()
    .isIn(["جاري التجهيز", "تم التجهيز", "تم الالغاء"])
    .withMessage(
      "حاله الطلب يجب ان تكون 'جاري التجهيز او تم التجهيز او تم الالغاء"
    ),

  check("deliveryStatus")
    .optional()
    .isIn(["جاري التوصيل", "تم التوصيل", "تم الالغاء"])
    .withMessage(
      "حاله التوصيل يجب ان تكون جاري التوصيل او تم التوصيل او تم الالغاء"
    ),
  VaildatorMiddleware,
];
