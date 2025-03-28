const asyncHandler = require("express-async-handler");
const { OrderModel } = require("../models/OrderModel");
const { BookModel } = require("../models/BookModel");
const { checkBookAvailability , checkStock , calculateTotalPrice , updateStock } = require("../helper/orderHelper/orderHelper");



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
    try {
        const {custmerName, phone, address, books, user} = req.body;

    // حساب عدد الطلبات لكل كتاب
    const bookCounts = books.reduce((acc, bookId) => {
        acc[bookId] = (acc[bookId] || 0) + 1;
        return acc;
    }, {});

    // التحقق من وجود جميع الكتب
    const foundBooks = await checkBookAvailability(bookCounts);

    // التحقق من توفر الكمية المطلوبة
    checkStock(foundBooks, bookCounts);
    

  // حساب السعر الإجمالي
  const totalPrice = calculateTotalPrice(foundBooks, bookCounts);



    // إنشاء الطلب إذا كل شيء جيد
    const order = new OrderModel({
        custmerName,
        totalPrice,
        phone,
        address,
        books,
        user,
    });

    await order.save();

    // تحديث كمية الكتب في المخزن
    await updateStock(foundBooks, bookCounts);

    res.status(201).json({
        message: "تم إنشاء الطلب بنجاح",
        order: order
    });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "حدث خطأ ما", error });
    }
    
});