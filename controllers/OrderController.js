const asyncHandler = require("express-async-handler");
const { OrderModel } = require("../models/OrderModel");



// ==================================
// @desc Get All orders
// @route /api/v1/orders
// @method GET
// @access private (admin + employees)
// ==================================
module.exports.getAllOrders = asyncHandler(async(req, res) => {
    const orders = await OrderModel.find({})
    res.status(200).json({data: orders})
})