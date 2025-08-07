const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  totalAmount: {
    type: Number,
  },
  contactNumber: {
    type: String,
  },
  items: {
    type: [
      {
        itemName: {
          type: String,
        },
        quantity: {
          type: String,
        },
      },
    ],
  },
  cName: {
    type: String,
  },
  city: {
    type: String,
  },
  street: {
    type: String,
  },
  deliveryDescription: {
    type: String,
  },
  status: {
    type: String,
    default: "Pending",
  },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
