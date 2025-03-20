const { register, login } = require("../controllers/AuthControler");
const { registerValidator, loginValidator } = require("../utils/vaildators/AuthValidator");

const router = require("express").Router();



router
.route("/register").post(registerValidator , register)


router.route("/login").post(loginValidator , login)


  module.exports = router;