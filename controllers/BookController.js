const asyncHandler = require("express-async-handler");
const { BookModel } = require("../models/BokModel");


// ==================================
// @desc Get All Books
// @route /api/v1/books
// @method GET
// @access private (admin + employees)
// ==================================
module.exports.getAllBooks = asyncHandler(async(req , res) => {
    const books = await BookModel.find({})
    res.status(200).json({data: books})
})