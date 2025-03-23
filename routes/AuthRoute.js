const {
  register,
  login,
  changePassword,
} = require("../controllers/AuthControler");
const {
  registerValidator,
  loginValidator,
  changePasswordValidator,
} = require("../utils/vaildators/AuthValidator");
const AuthService = require("../utils/token/AuthService");
const router = require("express").Router();

// Register route
router
  .route("/register")
  .post(
    registerValidator,
    register
  );

  // login route
router.route("/login").post(loginValidator, login);

// change-password route
router
  .route("/change-password")
  .post(AuthService.protect, changePasswordValidator, changePassword);

module.exports = router;
