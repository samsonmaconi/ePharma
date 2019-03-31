const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  items : [{_id: mongoose.Schema.Types.ObjectId,
    product_name: String,
    product_description: String,
    product_company: String,
    product_price: Number,
    product_image: String,
    product_category: String,
    product_rating: Number,
    product_quantity: Number
  }]
});

const Order = mongoose.model("Order",OrderSchema);

module.exports = Order;
