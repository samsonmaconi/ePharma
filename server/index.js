const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

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
const Orders = require('./models/orders');

app.use(bodyParser.json());

app.get('/api/admin/viewOrders', async(req, res) =>{
  data = await Orders.find();
  res.send(data);
})

app.post('/api/admin/saveOrders', async(req, res) =>{

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

app.get('/api/products', async (req, res) => {
  data = await Product.find();
  res.send(data);
  console.log('/api/products' + ' response sent');
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
