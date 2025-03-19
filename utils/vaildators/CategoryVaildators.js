const { check } = require("express-validator");
const VaildatorMiddleware = require("../../middlewares/VaildatorMiddleware");


exports.createCategoryValidator = [
    check("title")
    .notEmpty().withMessage("title is required")
    .isLength({min:3}).withMessage("Too short category title")
    .isLength({max:50}).withMessage("Too long category title"),
    VaildatorMiddleware,
]