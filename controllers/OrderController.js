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


// ==================================
// @desc Create a new Order
// @route /api/v1/orders
// @method POST
// @access private (admin + employees)
// ==================================
module.exports.createOrder = asyncHandler(async(req, res) => {
    const order = new OrderModel({
        custmerName: req.body.custmerName,
        totalPrice: req.body.totalPrice,
        phone: req.body.phone,
        address: req.body.address,
        books: req.body.books,
        user: req.body.user,
    });

    await order.save();

    res.status(201).json({message: "تم انشاء الطلب بنجاح" , order: order})
})