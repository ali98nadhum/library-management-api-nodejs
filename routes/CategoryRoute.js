const { getAllCategories, createCategory, getCategoryById } = require("../controllers/CategoryController");
const { getOneCategoryValidator , createCategoryValidator } = require("../utils/vaildators/CategoryVaildators");
const router = require("express").Router();





router.route("/")
.get(getAllCategories)
.post(createCategoryValidator , createCategory)


router.route("/:id")
.get(getOneCategoryValidator , getCategoryById)





module.exports = router;