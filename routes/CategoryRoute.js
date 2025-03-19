const { getAllCategories } = require("../controllers/CategoryController");
const router = require("express").Router();





router.route("/")
.get(getAllCategories)








module.exports = router;