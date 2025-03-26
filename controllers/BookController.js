const asyncHandler = require("express-async-handler");
const { BookModel } = require("../models/BookModel");
const { uploadImageToUploadcare , deleteImageFromUploadcare } = require("../utils/uploadImage/uploadImageToUploadcare");


// ==================================
// @desc Get All Books
// @route /api/v1/books
// @method GET
// @access private (admin + employees)
// ==================================
module.exports.getAllBooks = asyncHandler(async(req , res) => {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 6 || 6;
    const skip = (page-1) * limit;
    const { search , author  } = req.query;
    // search book by title and author
    const query = Object.assign(
        search ? { title: { $regex: search, $options: "i" } } : {},
        author ? { author } : {}
    );
    const books = await BookModel.find(query).skip(skip).limit(limit);
    const totalBooks = await BookModel.countDocuments(query);
    res.status(200).json({results:totalBooks , page , data: books})
})



// ==================================
// @desc Get Book by id
// @route /api/v1/books/:id
// @method GET
// @access private (admin + employees)
// ==================================
module.exports.getBook = asyncHandler(async(req , res) => {
    const book = await BookModel.findById(req.params.id);
    if(!book){
        return res.status(404).json({message: "There is no book for this id"})
    }

    res.status(200).json({data: book})
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
        price: req.body.price,
        imageCover: { url: imageUrl, publicId },
    })

    await newBook.save();

    res.status(201).json({message: "book created successfully"})
})