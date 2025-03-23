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


// ==================================
// @desc Delete User
// @route /api/v1/users/delete-user/:id
// @method DELETE
// @access private (admin)
// ==================================
module.exports.deleteUser = asyncHandler(async(req , res) => {
    const user = await UserModel.findByIdAndDelete(req.params.id);
    if(!user){
        return res.status(404).json({message: "User not found for this id"})
    }

    res.status(200).json({message: "User deleted successfully"})
})



// ==================================
// @desc Update user
// @route /api/v1/users/update-user/:id
// @method PUT
// @access private (admin)
// ==================================
module.exports.updateUser = asyncHandler(async(req, res) => {
    const {name , username , role} = req.body;
    const userId = req.params.id;

    const updatedUser = await User.findByIdAndUpdate(
        userId,
        { name, username, role },
        { new: true, runValidators: true }
    );

    if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully'});

})