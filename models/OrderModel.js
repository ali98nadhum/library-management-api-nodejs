const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    custmerName: {
      type: String,
      required: true,
      minlength: [3, "very short name"],
      maxlength: [50, "very long name"],
    },
    status: {
      type: String,
      required: true,
      enum: ["جاري التجهيز", "تم التجهيز", "تم الالغاء"],
      default: "جاري التجهيز",
    },
    deliveryStatus: {
      type: String,
      required: true,
      enum: ["جاري التوصيل", "تم التوصيل" , "تم الالغاء"],
      default: "جاري التوصيل",
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      minlength: 10,
      maxlength: 150,
    },
    books: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BookModel",
        required: true,
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model("OrderModel", OrderSchema);

module.exports = {
  OrderModel,
};
