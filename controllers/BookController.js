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



// ==================================
// @desc Update book
// @route /api/v1/books/update-book/:id
// @method PUT
// @access private (admin)
// ==================================
module.exports.updateBook = asyncHandler(async (req, res) => {
  const book = await BookModel.findById(req.params.id);
  if (!book) {
    return res.status(404).json({ message: "Book not found for this id" });
  }

  // upload new image
  let imageCover = book.imageCover;
  if (req.file) {
    const { imageUrl, publicId } = await uploadImageToUploadcare(req.file);
    imageCover = { url: imageUrl, publicId: publicId };

    // Delete old image
    if (book.imageCover.publicId) {
      await deleteImageFromUploadcare(book.imageCover.publicId);
    }
  }

  const updateBook = await BookModel.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      author: req.body.author,
      price: req.body.price,
      quantity: req.body.quantity,
      publishYear: req.body.publishYear,
      publisher: req.body.publisher,
      available: req.body.available,
      imageCover: imageCover,
      category: req.body.category,
    },
    { new: true }
  );

  res.status(200).json({ message: "Book updated successfully" });
});



// ==================================
// @desc Delete book
// @route /api/v1/books/delete-book/:id
// @method DELETE   
// @access private (admin)
// ==================================
module.exports.deleteBook = asyncHandler(async(req , res) => {
    const book = await BookModel.findByIdAndDelete(req.params.id);
    if(!book){
        return res.status(404).json({message: "Book not found for this id"})
    }

    // delete image
    await deleteImageFromUploadcare(book.imageCover.publicId)

    res.status(200).json({message: "Book deleted successfully"})
})