const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
      trim: true,
      minlength: [3, "book title must be at least 3 characters"],
      maxlength: [100, "book title should not exceed 100 characters"],
    },
    author: {
      type: String,
      required: [true, "author is required"],
      trim: true,
      minlength: [3, "author name must be at least 3 characters"],
      maxlength: [50, "author name should not exceed 50 characters"],
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
      required: [true, "publish year is required"],
    },
    publisher: {
      type: String,
      trim: true,
      required: [true, "publisher is required"],
    },
    imageCover: {
      url: { type: String },
      publicId: { type: String },
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categoryModel",
      required: [true, "category is required"],
    },
  },
  { timestamps: true }
);

const BookModel = mongoose.model("BookModel", BookSchema);

module.exports = {
  BookModel,
};
