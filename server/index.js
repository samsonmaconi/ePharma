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

app.use(bodyParser.json());

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
