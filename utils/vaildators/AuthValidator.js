const { check } = require("express-validator");
const VaildatorMiddleware = require("../../middlewares/VaildatorMiddleware");
const {UserModel} = require("../../models/UserModel");


exports.registerValidator = [
    check("name")
      .notEmpty()
      .withMessage("name is required")
      .isLength({ min: 3 })
      .withMessage("Too short category title")
      .isLength({ max: 25 })
      .withMessage("Too long category title"),
  
    check("username")
      .notEmpty()
      .withMessage("username is required")
      .isLength({ min: 3 })
      .withMessage("Too short username")
      .isLength({ max: 20 })
      .withMessage("Too long username")
      .custom(async (val) => {
          const existingUsername = await UserModel.findOne({ username: val });
          if (existingUsername) {
            throw new Error("username already exists");
          }
        }),
  
    check("password")
      .notEmpty()
      .withMessage("password is required")
      .isLength({ min: 8 })
      .withMessage("Password must be 8 carcter"),
  
    check("email")
      .notEmpty()
      .withMessage("email is required")
      .isEmail()
      .withMessage("Invalid email")
      .custom(async (val) => {
        const existingUser = await UserModel.findOne({ email: val });
        if (existingUser) {
          throw new Error("Email already exists");
        }
      }),
    VaildatorMiddleware,
  ];



  exports.loginValidator = [
    check("email")
    .notEmpty().withMessage("email is required")
    .isEmail().withMessage("Invalid email"),
    check("password")
    .notEmpty().withMessage("password is required")
    .isLength({ min: 8 }).withMessage("Password must be at least 8 characters"),
    VaildatorMiddleware,
  ]


  exports.changePasswordValidator = [
    check("oldPassword")
    .notEmpty()
    .withMessage("old password is required"),
    check("newPassword")
    .notEmpty().withMessage("new password is required")
    .isLength({ min: 8 }).withMessage("Password must be at least 8 characters"),
    VaildatorMiddleware,
  ]


  exports.deleteUserValidator = [
      check("id").isMongoId().withMessage("Invalid category id"),
      VaildatorMiddleware
  ]