const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user_email:String,
  order_status: Number,
  total_cost: Number,
  date_of_order: Date,
  items : [{_id : mongoose.Schema.Types.ObjectId, name: String, quantity: Number, stock: Number, status: Number}]
});

const Order = mongoose.model("Order",OrderSchema);

module.exports = Order;
