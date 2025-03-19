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