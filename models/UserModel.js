const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      trim: true,
      minlength: [3, "Category title should be at least 3 characters long"],
      maxlength: [25, "Category title should not exceed 50 characters long"],
    },
    username: {
      type: String,
      required: [true, "username is required"],
      unique: true,
      trim: true,
      minlength: [3, "username should be at least 5 characters long"],
      maxlength: [20, "username should not exceed 30 characters long"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      trim: true,
      unique: [true, "email must be unique"],
      match: [/\S+@\S+\.\S+/, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
      trim: true,
      minlength: [8, "password short"],
    },
    role: {
      type: String,
      enum: ["employee", "admin"],
      default: "employee",
    },

    isActive: {
      type: Boolean,
      default: false,
    },
    verifyCode: String,
    verifyCodeExpires: Date,
  },
  { timestamps: true }
);

const UserModel = mongoose.model("UserModel", UserSchema);

module.exports = {
  UserModel,
};
