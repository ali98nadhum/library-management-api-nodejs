const { getAllCategories, createCategory } = require("../controllers/CategoryController");
const { createCategoryValidator } = require("c:/Users/alina/OneDrive/Desktop/development/api-ecommerce/utils/vaildators/CategoryVaildators");
const router = require("express").Router();





router.route("/")
.get(getAllCategories)
.post(createCategoryValidator , createCategory)








module.exports = router;