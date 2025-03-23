const router = require("express").Router();
const AuthService = require("../utils/token/AuthService");
const { getAllUsers, deleteUser } = require("../controllers/UserController");
const {deleteUserValidator} = require("../utils/vaildators/AuthValidator");

router
  .route("/get-all-users")
  .get(AuthService.protect, AuthService.allowedTo("admin"), getAllUsers);


  router
  .route("/delete-user/:id")
  .delete(AuthService.protect,AuthService.allowedTo("admin"),deleteUserValidator,deleteUser);

module.exports = router;
