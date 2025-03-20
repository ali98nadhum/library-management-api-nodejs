const asyncHandler = require("express-async-handler");
const jwt = require('jsonwebtoken');
const {UserModel} = require("../../models/UserModel");



const protectRoute = asyncHandler(async(req , res , next) => {
    // 1- check if token exists
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1]
    }

    
    if(!token){
        return res.status(401).json({message: "you are not logged "});
    }

      // 2- verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);


         // 3- check if user exists
        const currentUser = await UserModel.findById(decoded.id)
        if(!currentUser){
            return res.status(401).json({message: "user no longer exists" });
        }

        req.user = decoded;

        next();
})


module.exports = {
    protectRoute
}