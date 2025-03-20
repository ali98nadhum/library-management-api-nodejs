const { getAllCategories, createCategory, getCategoryById, deleteCategory } = require("../controllers/CategoryController");
const { getOneCategoryValidator , createCategoryValidator, deleteCategoryValidator } = require("../utils/vaildators/CategoryVaildators");
const router = require("express").Router();





router.route("/")
.get(getAllCategories)
.post(createCategoryValidator , createCategory)


router.route("/:id")
.get(getOneCategoryValidator , getCategoryById)
.delete(deleteCategoryValidator , deleteCategory)





module.exports = router;