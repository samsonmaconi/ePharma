const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;

const PORT = 1234;
const DB_URI =
  'mongodb+srv://epharma_admin:epharma_admin@cluster0-me8ny.mongodb.net/epharma?retryWrites=true';
const MONGOOSE_OPTIONS = {
  useNewUrlParser: true,
  socketTimeoutMS: 0,
  connectTimeoutMS: 0
};

mongoose.Promise = Promise;
mongoose
  .connect(DB_URI, MONGOOSE_OPTIONS)
  .then(() => console.log('Database Connected'))
  .catch(ERR => console.log(ERR));

const Product = require('./models/products');

app.use(bodyParser.json());

app.get('/api/products', async (req, res) => {
  data = await Product.find();
  res.send(data);
  console.log('/api/products' + ' response sent');
});

app.get('/api/admin/products', async (req, res) => {
  data = await Product.find();
  res.send(data);
  console.log('/api/admin/products' + ' response sent');
});

app.get('/api/admin/products/:id', async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
      return res.status(400).send(`No record with given id : ${req.params.id}`);

  Product.findById(req.params.id, (err, doc) => {
      if (!err) { res.send(doc); }
      else { console.log('Error in Retriving Employee :' + JSON.stringify(err, undefined, 2)); }
  });
});

app.post('/api/admin/products', async (req, res) => {
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

app.put('/api/admin/products/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
      return res.status(400).send(`No record with given id : ${req.params.id}`);

  var product = {
    _id : req.body._id,
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
      if (!err) { res.send(doc); }
      else { console.log('Error in Employee Update :' + JSON.stringify(err, undefined, 2)); }
  });
});

app.delete('/api/admin/products/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
      return res.status(400).send(`No record with given id : ${req.params.id}`);

  Product.findByIdAndRemove(req.params.id, (err, doc) => {
      if (!err) { res.send(doc); }
      else { console.log('Error in Employee Update :' + JSON.stringify(err, undefined, 2)); }
  });
});

app.get('/api/products/:type', async (req, res) => {
  console.log(JSON.stringify(req.query));

  switch (req.params.type) {
    case 'featured':
      console.log(req.params.type);
      data = await Product.find({
        $and: [
          { product_rating: { $gte: req.query.minrating } },
          { product_rating: { $lte: req.query.maxrating } }
        ]
      });
      res.send(data);
      break;
    case 'catalog':
      console.log(req.params.type);
      data = await Product.find({
        product_category: { $in: req.query.category }
      });
      res.send(data);
      break;
    case 'category':
      console.log(req.params.type);
      data = await Product.distinct('product_category');
      res.send(data);
      break;
    case 'product':
      console.log(req.params.type);
      data = await Product.find({ _id: req.query.id });
      res.send(data);
      break;
    case 'search':
      console.log(req.params.type);
      data = await Product.find({
        $or: [
          {
            product_name: {
              $regex: new RegExp(req.query.query),
              $options: 'i'
            }
          },
          {
            product_company: {
              $regex: new RegExp(req.query.query),
              $options: 'i'
            }
          },
          {
            product_description: {
              $regex: new RegExp(req.query.query),
              $options: 'i'
            }
          }
        ]
      });
      res.send(data);
      break;
  }
});

app.listen(PORT, () => console.log('Server listening at port: ' + PORT));
