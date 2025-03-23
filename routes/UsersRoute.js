const router = require("express").Router();
const AuthService = require("../utils/token/AuthService");
const { getAllUsers, deleteUser } = require("../controllers/UserController");

router
  .route("/get-all-users")
  .get(AuthService.protect, AuthService.allowedTo("admin"), getAllUsers);


  router
  .route("/delete-user/:id")
  .delete(AuthService.protect,AuthService.allowedTo("admin"),deleteUser);

module.exports = router;
