const express = require('express');
const router = express.Router();

const Product = require('../models/products');

const dbErrorResponse =
  'The requested resource is currently unavailable. Please try again later.';

  // the type indicates the required api accesspoint
router.get('/:type', async (req, res) => {
  switch (req.params.type) {
    case 'featured': // featured products
      data = await Product.find({
        $and: [
          { product_rating: { $gte: req.query.minrating } },
          { product_rating: { $lte: req.query.maxrating } }
        ]
      })
        .sort({ product_rating: -1 })
        .catch(err => {
          console.error(err);
          res.status(503).send({ error: err, message: dbErrorResponse });
          return 0;
        });
      res.send(data);
      break;
    case 'catalog': // all products
      data = await Product.find({
        product_category: { $in: req.query.category }
      })
      .catch(err => {
        console.error(err);
        res.status(503).send({ error: err, message: dbErrorResponse });
        return 0;
      });
      res.send(data);
      break;
    case 'category': // list of product categories
      data = await Product.distinct('product_category')
      .catch(err => {
        console.error(err);
        res.status(503).send({ error: err, message: dbErrorResponse });
        return 0;
      });
      res.send(data);
      break;
    case 'product': // specific product details
      data = await Product.find({ _id: req.query.id })
      .catch(err => {
        console.error(err);
        res.status(503).send({ error: err, message: dbErrorResponse });
        return 0;
      });
      res.send(data);
      break;
    case 'search': // product string search. Also returns search statistics to client.
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
      ])
      .catch(err => {
        console.error(err);
        res.status(503).send({ error: err, message: dbErrorResponse });
        return 0;
      });

      res.send([data, categoriesCount]);
      break;
    default:
      res.status(404).send({ error: req.params.type + ' Not Found' });
  }
});

module.exports = router;
