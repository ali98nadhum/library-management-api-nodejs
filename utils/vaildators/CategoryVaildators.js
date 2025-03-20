const { check } = require("express-validator");
const VaildatorMiddleware = require("../../middlewares/VaildatorMiddleware");


exports.createCategoryValidator = [
    check("title")
    .notEmpty().withMessage("title is required")
    .isLength({min:3}).withMessage("Too short category title")
    .isLength({max:50}).withMessage("Too long category title"),
    VaildatorMiddleware,
]


exports.getOneCategoryValidator = [
    check("id").isMongoId().withMessage("Invalid category id"),
    VaildatorMiddleware
]


exports.deleteCategoryValidator = [
    check("id").isMongoId().withMessage("Invalid category id"),
    VaildatorMiddleware
]

exports.updateCategoryValidator = [
    check("title")
    .isLength({min:3}).withMessage("Too short category title")
    .isLength({max:50}).withMessage("Too long category title"),
    check("id").isMongoId().withMessage("Invalid category id"),
    VaildatorMiddleware,
]