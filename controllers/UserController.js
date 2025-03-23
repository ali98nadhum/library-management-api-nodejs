const asyncHandler = require("express-async-handler");
const {UserModel} = require("../models/UserModel");




// ==================================
// @desc Get All Users
// @route /api/v1/users/get-all-users
// @method GET
// @access private (admin)
// ==================================
module.exports.getAllUsers = asyncHandler(async(req , res) => {
    const users = await UserModel.find()
    res.status(200).json({data: users})
})