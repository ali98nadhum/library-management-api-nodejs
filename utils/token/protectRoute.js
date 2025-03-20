const asyncHandler = require("express-async-handler");



exports.protectRoute = asyncHandler(async(req , res , next) => {
    // 1- check if token exists
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1]
    }

    
    if(!token){
        return res.status(401).json({message: "you are not logged "});
    }
})