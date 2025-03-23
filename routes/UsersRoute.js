const router = require("express").Router();
const AuthService = require("../utils/token/AuthService");
const { getAllUsers } = require("../controllers/UserController");

router
  .route("/get-all-users")
  .get(AuthService.protect, AuthService.allowedTo("admin"), getAllUsers);

module.exports = router;
