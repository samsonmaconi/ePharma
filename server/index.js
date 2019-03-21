const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const loginRegisterRoute = require('./routes/login-register-routes');

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
app.use(cors({
  origin:['http://localhost:4200','http://127.0.0.1:4200'],
  credentials: true
}));
app.use(bodyParser.json());

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
      }).sort({ product_rating: -1 });
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

      categoriesCount = await Product.aggregate([
        {
          $match: {
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
          }
        },
        {
          $group: {
            _id: '$product_category',
            count: {
              $sum: 1
            }
          }
        },
        {
          $sort: {
            _id: -1
          }
        },
        {
          $project: {
            _id: 0,
            category: '$_id',
            count: '$count'
          }
        }
      ]);

      res.send([data, categoriesCount]);
      break;
  }
});
app.use("/api/user",loginRegisterRoute);
app.listen(PORT, () => console.log('Server listening at port: ' + PORT));
