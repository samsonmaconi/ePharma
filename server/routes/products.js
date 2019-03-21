const express = require('express');
const router = express.Router();

const Product = require('../models/products');

router.get('/:type', async (req, res) => {
  switch (req.params.type) {
    case 'featured':
      data = await Product.find({
        $and: [
          { product_rating: { $gte: req.query.minrating } },
          { product_rating: { $lte: req.query.maxrating } }
        ]
      }).sort({ product_rating: -1 });
      res.send(data);
      break;
    case 'catalog':
      data = await Product.find({
        product_category: { $in: req.query.category }
      });
      res.send(data);
      break;
    case 'category':
      data = await Product.distinct('product_category');
      res.send(data);
      break;
    case 'product':
      data = await Product.find({ _id: req.query.id });
      res.send(data);
      break;
    case 'search':
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
    default:
      res.status(404).send({ error: req.params.type + ' Not Found' });
  }
});

module.exports = router;
