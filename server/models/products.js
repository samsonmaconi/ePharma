const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  product_id: Number,
  product_name: String,
  product_description: String,
  product_company: String,
  product_price: Number,
  product_image: String,
  product_category: String,
  product_rating: Number,
  product_quantity: Number
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
