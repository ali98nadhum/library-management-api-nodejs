const mongoose = require("mongoose");


const CategorySchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: [true , "Category title is required"],
            trim: true,
            unique: [true , "Category title is unique"],
            minlength: [3, "Category title should be at least 3 characters long"],
            maxlength: [50, "Category title should not exceed 50 characters long"]
        }
    },
    {timestamps: true}
)


// for get books
CategorySchema.virtual("books", {
    ref: "BookModel", 
    localField: "_id", 
    foreignField: "category",
  });

const CategoryModel = mongoose.model("CategoryModel" , CategorySchema);


module.exports = {
    CategoryModel
};