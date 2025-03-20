const asyncHandler = require("express-async-handler");
const {CategoryModel} = require("../models/Category");



// ==================================
// @desc Get All Categories
// @route /api/v1/Categories
// @method GET
// @access private (admin + employees)
// ==================================
module.exports.getAllCategories = asyncHandler(async (req , res) => {
    const categories  = await CategoryModel.find({});
    res.status(200).json({data: categories})
})



// ==================================
// @desc Get category by id
// @route /api/v1/Categories/:id
// @method GET
// @access private (admin + employees)
// ==================================
module.exports.getCategoryById = asyncHandler(async (req , res) => {
    const category = await CategoryModel.findById(req.params.id);
    if (!category){
        return res.status(404).json({message: "Category not found"})
    }

    res.status(200).json({data: category})
        
})



// ==================================
// @desc Create new Category
// @route /api/v1/Categories
// @method POST
// @access private ( only admin )
// ==================================
module.exports.createCategory= asyncHandler(async (req , res) => {
    const { title } = req.body;
    const newCategory = await CategoryModel.create({ title });
    res.status(201).json({message: "Category create successfully"})
})



// ==================================
// @desc Delete category 
// @route /api/v1/Categories/:id
// @method DELETE
// @access private ( only admin )
// ==================================
module.exports.deleteCategory = asyncHandler(async(req , res) => {
    const category = await CategoryModel.findByIdAndDelete(req.params.id);
    if(!category){
        return res.status(404).json({message: "Category not found"})
    }
})