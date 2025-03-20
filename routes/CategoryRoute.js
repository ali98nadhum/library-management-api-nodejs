const {
  getAllCategories,
  createCategory,
  getCategoryById,
  deleteCategory,
  updateCategory,
} = require("../controllers/CategoryController");
const {
  getOneCategoryValidator,
  createCategoryValidator,
  deleteCategoryValidator,
  updateCategoryValidator,
} = require("../utils/vaildators/CategoryVaildators");
const {protectRoute} = require("../utils/token/protectRoute");
const router = require("express").Router();



router
  .route("/")
  .get(getAllCategories)
  .post(protectRoute ,createCategoryValidator, createCategory);



router
  .route("/:id")
  .get(getOneCategoryValidator, getCategoryById)
  .delete(deleteCategoryValidator, deleteCategory)
  .put(updateCategoryValidator, updateCategory);

  

module.exports = router;
