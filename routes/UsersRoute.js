const router = require("express").Router();
const AuthService = require("../utils/token/AuthService");
const { getAllUsers, deleteUser, updateUser } = require("../controllers/UserController");
const {deleteUserValidator} = require("../utils/vaildators/AuthValidator");

router
  .route("/get-all-users")
  .get(AuthService.protect, AuthService.allowedTo("admin"), getAllUsers);


  router
  .route("/delete-user/:id")
  .delete(AuthService.protect,AuthService.allowedTo("admin"),deleteUserValidator,deleteUser);


router
  .route("/update-user/:id")
  .put(updateUser)

module.exports = router;
