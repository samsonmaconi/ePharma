const express = require('express');
const router = express.Router();
const Product = require('../models/products');
const Orders = require('../models/orders');
const mongoose = require('mongoose');
router.get('/api/admin/viewOrders', async(req, res) =>{
  data = await Orders.find();
  res.send(data);
})

router.post('/api/admin/saveOrders', async(req, res) =>{

 var order = new Orders({
  _id: mongoose.Types.ObjectId(),
  order_status: req.body.order_status,
  total_cost: req.body.total_cost,
  date_of_order: new Date(),
  items : [{ //empty array, use for after array.push
      name: req.body.items[0].name,
      quantity: req.body.items[0].quantity,
      stock: req.body.items[0].stock,
      status: req.body.items[0].status
    },
    {
      name: req.body.items[0].name,
      quantity: req.body.items[0].quantity,
      stock: 0,
      status: 1
    },
  ]
});

// console.log("----------"+size(req.body.items));

  order.save((err,doc)=>{
    if(err) {console.log("Error occured"+JSON.stringify(err, undefined, 2));}
    else{res.send(doc); console.log("No error found");}
  });
});


router.get('/products', async (req, res) => {
  data = await Product.find();
  res.send(data);
  console.log('/api/admin/products' + ' response sent');
});

router.get('/products/:id', async (req, res) => {
  Product.findById(req.params.id, (err, doc) => {
      if (!err) { res.send(doc); }
      else { console.log('Error in Retriving Employee :' + JSON.stringify(err, undefined, 2)); }
  });
});

router.post('/products', async (req, res) => {
  var product = new Product({
      _id : req.body._id,
      product_name : req.body.product_name,
      product_description: req.body.product_description,
      product_company: req.body.product_company,
      product_price: req.body.product_price,
      product_image: req.body.product_image,
      product_category: req.product_category,
      product_rating: req.body.product_rating,
      product_quantity: req.body.product_quantity,
  });

  product.save((err,doc) => {
    if(!err) {res.send(doc);}
    else {
      console.log('Error in product save' + JSON.stringify(err, undefined, 2));}
  })
})

router.put('/products/:id', (req, res) => {
  var product = {
    product_name : req.body.product_name,
    product_description: req.body.product_description,
    product_company: req.body.product_company,
    product_price: req.body.product_price,
    product_image: req.body.product_image,
    product_category: req.body.product_category,
    product_rating: req.body.product_rating,
    product_quantity: req.body.product_quantity,
  };
  Product.findByIdAndUpdate(req.params.id, { $set: product }, { new: true }, (err, doc) => {
      if (!err) {
        res.send(doc); }
      else {
        console.log(req.body._id);
        console.log('Error in Product Update :' + JSON.stringify(err, undefined, 2)); }
  });
});

router.delete('/products/:id', (req, res) => {
  Product.findByIdAndRemove(req.params.id, (err, doc) => {
      if (!err) { res.send(doc); }
      else { console.log('Error in Employee Update :' + JSON.stringify(err, undefined, 2)); }
  });
});

module.exports = router;
