const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
      trim: true,
      minlength: [3, "title to short"],
      maxlength: [100, "book title should not exceed 100 characters"],
    },
    author: {
      type: String,
      required: [true, "author is required"],
      trim: true,
      minlength: [3, "author name must be at least 3 characters"],
      maxlength: [50, "author name should not exceed 50 characters"],
    },
    price: {
      type: Number,
      trim: true,
      required: [true, "Price is required"],
      min: [0, "Price must be at least 0 IQD"],
    },
    quantity: {
      type: Number,
      required: [true, "Product quantity is required"],
      trim: true,
      min: 0,
    },
    publishYear: {
      type: Number,
      trim: true,
    },
    publisher: {
      type: String,
      trim: true,
      minlength: [3, "publisher name must be at least 3 characters"],
      maxlength: [50, "publisher name should not exceed 50 characters"],
    },
    available: {
      type: Boolean,
      default: true,
    },
    imageCover: {
      url: { type: String },
      publicId: { type: String },
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CategoryModel",
      required: [true, "category is required"],
    },
  },
  { timestamps: true }
);

const BookModel = mongoose.model("BookModel", BookSchema);

module.exports = {
  BookModel,
};
