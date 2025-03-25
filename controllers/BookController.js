const asyncHandler = require("express-async-handler");
const { BookModel } = require("../models/BokModel");
const { uploadImageToUploadcare , deleteImageFromUploadcare } = require("../utils/uploadImage/uploadImageToUploadcare");


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



// ==================================
// @desc Create New Book
// @route /api/v1/books/add-book
// @method POST
// @access private (admin)
// ==================================
module.exports.createNewBook = asyncHandler(async(req , res) => {


     //  Upload image
  const { imageUrl, publicId } = await uploadImageToUploadcare(req.file);

    // Create new category
    const newBook = await BookModel.create({
        title: req.body.title,
        author: req.body.author,
        quantity: req.body.quantity,
        publishYear: req.body.publishYear,
        publisher: req.body.publisher,
        category: req.body.category,
        imageCover: { url: imageUrl, publicId },
    })

    await newBook.save();

    res.status(201).json({message: "book created successfully"})
})