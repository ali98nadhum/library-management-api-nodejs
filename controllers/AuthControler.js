const asyncHandler = require("express-async-handler");
const {UserModel} = require("../models/UserModel");
const {hashPassword} = require("../helper/hashPassword");
const {generateToken} = require("../utils/token/generateToken");
const bcrypt = require("bcryptjs");


// ==================================
// @desc Add new employee or admin
// @route /api/v1/auth/register
// @method POST
// @access private (admin)
// ==================================
module.exports.register = asyncHandler(async(req , res) => {
    const {name , username , email , password} = req.body;

    // hash password
    const hashedPassword = await hashPassword(password);

    // Create new user
    const newUser = new UserModel({
        name,
        username,
        email,
        password: hashedPassword
    });


    // Save user to database
  await newUser.save();


  res
  .status(201)
  .json({ message: "User registered successfully please login to your account"});
})



// ==================================
// @desc login 
// @route /api/v1/auth/login
// @method POST
// @access public
// ==================================
module.exports.login = asyncHandler(async(req , res) => {
  const {email , password} = req.body;

  // Check if user exists
  const user = await UserModel.findOne({email});
  if(!user){
    return res.status(400).json({message: "Invalid email or password"})
  }

  // Check if password matches
  const isPasswordMatch = await bcrypt.compare(password , user.password);
  if(!isPasswordMatch){
    return res.status(400).json({message: "Invalid email or password"})
  }

  // Generate a JWT token for a user.
  const token = generateToken(
    user.id,
    user.username,
    user.name,
    user.role
  );


  res.status(200).json({message:`login_success hi ${user.name}` , token:token});
})


module.exports.changePassword = asyncHandler(async(req , res) => {
  const userId = req.user.id;
  const {oldPassword, newPassword} = req.body;

  console.log(userId);
  

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: 'يرجى إدخال كلمة السر الحالية والجديدة' });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: 'المستخدم غير موجود' });
  }

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'كلمة السر الحالية غير صحيحة' });
  }


  user.password = newPassword;
  await user.save();

  res.status(200).json({ message: 'تم تغيير كلمة السر بنجاح' });
})