const { check } = require("express-validator");
const VaildatorMiddleware = require("../../middlewares/VaildatorMiddleware");
const { BookModel } = require("../../models/BookModel");


exports.createBookValidator = [
    check("title")
    .notEmpty()
    .withMessage("book title is required")
    .isLength({ min: 3 })
    .withMessage("book title must be at least 3 characters")
    .isLength({ max: 100 })
    .withMessage("book title should not exceed 100 characters"),

    check("author")
    .notEmpty()
    .withMessage("author is required")
    .isLength({ min: 3 })
    .withMessage("author name must be at least 3 characters")
    .isLength({ max: 50 })
    .withMessage("author name should not exceed 50 characters"),

    check("price")
    .notEmpty()
    .withMessage("price is required")
    .isNumeric()
    .withMessage("price must be a number")
    .isInt({min: 0})
    .withMessage("quantity must be 0 or greater"),

    check("quantity")
    .notEmpty()
    .withMessage("quantity is required")
    .isNumeric()
    .withMessage("quantity must be a number")
    .isInt({ min: 0 })
    .withMessage("quantity must be 0 or greater")
    .toInt(),

    check("publishYear")
    .optional()
    .isNumeric()
    .withMessage("publish year must be a number")
    .isInt({ min: 0 })
    .withMessage("You cannot put a negative number"),

    check("publisher")
    .optional()
    .isLength({min: 3})
    .withMessage("publisher name must be at least 3 characters")
    .isLength({ max: 50 })
    .withMessage("publisher name should not exceed 50 characters"),

    check("category")
    .notEmpty()
    .withMessage("category is required")
    .isMongoId()
    .withMessage("Invalid category id"),

    VaildatorMiddleware,
  ];


  exports.getBookValidator = [
    check("id").isMongoId().withMessage("Invalid book id"),
    VaildatorMiddleware,
  ];


  exports.deleteBookValidator = [
    check("id").isMongoId().withMessage("Invalid book id"),
    VaildatorMiddleware,
  ];



  exports.updateBookValidator = [
    check("title")
    .optional()
    .isLength({ min: 3 })
    .withMessage("book title must be at least 3 characters")
    .isLength({ max: 100 })
    .withMessage("book title should not exceed 100 characters"),

    check("author")
    .optional()
    .isLength({ min: 3 })
    .withMessage("author name must be at least 3 characters")
    .isLength({ max: 50 })
    .withMessage("author name should not exceed 50 characters"),

    check("price")
    .optional()
    .isNumeric()
    .withMessage("price must be a number")
    .isInt({min: 0})
    .withMessage("quantity must be 0 or greater"),

    check("quantity")
    .optional()
    .isNumeric()
    .withMessage("quantity must be a number")
    .isInt({ min: 0 })
    .withMessage("quantity must be 0 or greater")
    .toInt(),

    check("publishYear")
    .optional()
    .isNumeric()
    .withMessage("publish year must be a number")
    .isInt({ min: 0 })
    .withMessage("You cannot put a negative number"),

    check("publisher")
    .optional()
    .isLength({min: 3})
    .withMessage("publisher name must be at least 3 characters")
    .isLength({ max: 50 })
    .withMessage("publisher name should not exceed 50 characters"),

    check("category")
    .optional()
    .isMongoId()
    .withMessage("Invalid category id"),

    check("available")
    .optional()
    .isBoolean()
    .withMessage("available must be a boolean value"),


    VaildatorMiddleware,
  ];