const express = require('express');
const mongoose = require("mongoose");
const router = express.Router();
const Orders = require('../models/orders');
const Product = require('../models/products');
const ObjectId = mongoose.Types.ObjectId;
const nodemailer = require('nodemailer');

// view all the orders for dashboard from id
router.get('/viewOrders/:id', async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
      return res.status(400).send(`No record with given id : ${req.params.id}`);

  Orders.findById(req.params.id, (err, doc) => {
      if (!err) { res.send(doc); }
      else { console.log('No order exists :' + JSON.stringify(err, undefined, 2)); }
  });
});

//view all the orders in orders dashboard by page number
router.get('/viewAllOrders/:page/:status', async(req, res) =>{
  if(req.params.status == "0" || req.params.status == "1"){
    data = await Orders.find({ order_status : {$eq: req.params.status} }).skip(2*(req.params.page-1)).limit(2);
  }else{
    data = await Orders.find().skip(2*(req.params.page-1)).limit(2);
  }
  res.send(data);
});

//view all the orders in orders dashboard
router.get('/viewOrders/', async(req, res) =>{
  data = await Orders.find();
  res.send(data);
});

//view order by date range
router.get('/viewOrderByDateRange/:startDate/:endDate',async(req,res)=>{
  console.log(req.params.startDate);
  data = await Orders.find({date_of_order : {
    $gte: new Date(req.params.startDate),
    $lt: new Date(req.params.endDate)
  }});
  res.send(data);
})

//view all the orders in orders dashboard
router.get('/viewAllOrderDetails/', async(req, res) =>{
  data = await Orders.find();
  res.send(data);
});

//view all the pending orders in dashboard
router.get('/viewAllPendingOrders/', async(req, res) =>{
  data = await Orders.find({ order_status : {$eq: 0} });
  res.send(data);
});


//get order count in dashboard
router.get('/getOrderCount/:status', async(req, res) =>{
  if(req.params.status === "0" || req.param.status === "1"){
    data = await Orders.find({ order_status : {$eq: req.params.status} }).count();
  }else{
    data = await Orders.find().count();
  }
  res.send(String(data));
});

//save order for orders dashboard
router.post('/saveOrders', async(req, res) =>{
 var order = new Orders({
  _id: mongoose.Types.ObjectId(),
  user_email:req.body.email,
  order_status: req.body.order_status,
  total_cost: req.body.total_cost,
  date_of_order: new Date(),
  items : req.body.items
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
  console.log('/products' + ' response sent');
});

router.get('/products/:id', async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
      return res.status(400).send(`No record with given id : ${req.params.id}`);

  Product.findById(req.params.id, (err, doc) => {
      if (!err) { res.send(doc); }
      else { console.log('Error in Retriving Employee :' + JSON.stringify(err, undefined, 2)); }
  });
});

router.post('/products', async (req, res) => {
  var product = new Product({
      _id : mongoose.Types.ObjectId(),
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
  console.log(req.body);
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

//route for update order
router.put('/UpdateOrders/:orderId/:itemId/:status', (req, res) => {
  var order = {
    _id: req.params.orderId,
    items : [{_id : req.params._id, status: req.params.status}]
  };

  Orders.findByIdAndUpdate(req.params.orderId, { $set: order }, { new: true }, (err, doc) => {
      if (!err) {
        res.send("1");
      }
      else {
        res.send("0")
      }
  });
});


router.post('/sendMail', function(req, res) {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'navneet.singh.web@gmail.com',
      pass: 'navneet12345'
    }
  });
  var data = req.body;
  console.log("User emails is",req.body.userEmail);
  // var mailOptions = {
  //   from: 'navneet.singh.web@gmail.com',
  //   to: req.body.userEmail,
  //   subject: 'Update in Your Order | e-Pharma',
  //   text: req.body.bodyMessage,
  // };

  // transporter.sendMail(mailOptions, function(error, info) {
  //   if (error) {
  //     return console.log(error);
  //   }
  //   console.log('Message sent: ' + info.response);
  //   console.log('Data:' + data.contactName);
  // });
  res.json(data);
});

module.exports = router;
