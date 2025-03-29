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
    // Pagination  orders
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 6 || 6;
    const skip = (page-1) * limit;

    // search orders by custmerName
    const { custmerName } = req.query;
    let filter = {};
    if (custmerName) {
        filter.custmerName = { $regex: custmerName, $options: "i" }; 
    }

    const orders = await OrderModel.find(filter).skip(skip).limit(limit)
    const totalOrder = await OrderModel.countDocuments(filter);
    res.status(200).json({results:totalOrder , page , data: orders})
})


// ==================================
// @desc Get Order by id
// @route /api/v1/orders/:id
// @method GET
// @access private (admin + employees)
// ==================================
module.exports.getOrderByID = asyncHandler(async(req , res) => {
    const order = await OrderModel.findById(req.params.id);
    if(!order){
        return res.status(404).json({message: "There is no order for this id"})
    }

    res.status(200).json({results:order})
})


// ==================================
// @desc Create a new Order
// @route /api/v1/orders
// @method POST
// @access private (admin + employees)
// ==================================
module.exports.createOrder = asyncHandler(async (req, res) => {
  try {
    const { custmerName, phone, address, books, user } = req.body;

    // حساب عدد الطلبات لكل كتاب || Calculate the number of orders per book
    const bookCounts = books.reduce((acc, bookId) => {
      acc[bookId] = (acc[bookId] || 0) + 1;
      return acc;
    }, {});

    // التحقق من وجود جميع الكتب  || Check that all books exist
    const foundBooks = await checkBookAvailability(bookCounts);

    // التحقق من توفر الكمية المطلوبة|| Check quantity books
    checkStock(foundBooks, bookCounts);

    // Calculate the total price
    const totalPrice = calculateTotalPrice(foundBooks, bookCounts);

    const order = new OrderModel({
      custmerName,
      totalPrice,
      phone,
      address,
      books,
      user,
    });

    await order.save();

    // Update the quantity of books in the Db
    await updateStock(foundBooks, bookCounts);

    res.status(201).json({
      message: "تم إنشاء الطلب بنجاح",
      order: order,
    });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || "حدث خطأ ما", error });
  }
});



// ==================================
// @desc Update order
// @route /api/v1/orders/:id
// @method PUT
// @access private (admin + employees)
// ==================================
module.exports.updateOrder = asyncHandler(async(req , res) => {
  const { custmerName , status , deliveryStatus , address} = req.body;

  const order = await OrderModel.findByIdAndUpdate(
    req.params.id,
    { custmerName, status, deliveryStatus, address},
    { new: true }
  )

  if(!order){
    return res.status(404).json({message: "Order not found"})
  }


  if (status === 'تم الالغاء') {
    for (const bookId of order.books) {
        await BookModel.updateOne({ _id: bookId }, { $inc: { quantity: 1 } });
    }
}


const updatedOrder = await OrderModel.findById(order._id).populate('books', 'title');

res.status(200).json({ message: "تم تحديث حالة الطلب بنجاح" , order: updatedOrder });
})