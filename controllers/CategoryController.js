const asyncHandler = require("express-async-handler");
const CategoryModel = require("../models/Category");



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