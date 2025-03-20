const { register } = require("../controllers/AuthControler");
const { registerValidator } = require("../utils/vaildators/AuthValidator");

const router = require("express").Router();



router
  .route("/register").post(registerValidator , register)


  module.exports = router;