const { register, login, changePassword } = require("../controllers/AuthControler");
const { registerValidator, loginValidator, changePasswordValidator } = require("../utils/vaildators/AuthValidator");
const AuthService = require("../utils/token/AuthService");

const router = require("express").Router();



router
.route("/register").post(registerValidator , register)


router.route("/login").post(loginValidator , login)
router.route("/change-password").post(AuthService.protect,AuthService.allowedTo("admin"),changePasswordValidator,changePassword)


  module.exports = router;