
const router = require("express").Router();
const { getAllUsers } = require("../controllers/UserController");


router.route("/get-all-users").get(getAllUsers)


module.exports = router;