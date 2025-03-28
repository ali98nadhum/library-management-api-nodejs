const asyncHandler = require("express-async-handler");
const { OrderModel } = require("../models/OrderModel");
const { BookModel } = require("../models/BookModel");
const { checkBookAvailability } = require("../helper/orderHelper/orderHelper");



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
    const {custmerName, phone, address, books, user} = req.body;

    // حساب عدد الطلبات لكل كتاب
    const bookCounts = books.reduce((acc, bookId) => {
        acc[bookId] = (acc[bookId] || 0) + 1;
        return acc;
    }, {});

    // التحقق من وجود جميع الكتب
    const foundBooks = await checkBookAvailability(bookCounts);

    // التحقق من توفر الكمية المطلوبة
    const insufficientQuantityBooks = [];
    
    foundBooks.forEach(book => {
        const requestedCount = bookCounts[book._id.toString()];
        if (book.quantity < requestedCount) {
            insufficientQuantityBooks.push({
                bookId: book._id,
                title: book.title,
                availableQuantity: book.quantity,
                requestedQuantity: requestedCount
            });
        }
    });

    if (insufficientQuantityBooks.length > 0) {
        return res.status(400).json({ 
            message: "الكمية غير كافية لبعض الكتب",
            insufficientQuantityBooks 
        });
    }


    // حساب totalPrice
let totalPrice = 0;

foundBooks.forEach(book => {
    const requestedCount = bookCounts[book._id.toString()];
    totalPrice += book.price * requestedCount;
});

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
    await Promise.all(foundBooks.map(async (book) => {
        const requestedCount = bookCounts[book._id.toString()];
        book.quantity -= requestedCount;
        if (book.quantity === 0) {
            book.available = false;
        }
        await book.save();
    }));

    res.status(201).json({
        message: "تم إنشاء الطلب بنجاح",
        order: order
    });
});