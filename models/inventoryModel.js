const mongoose = require('mongoose');
const date = require('../utils/date');

const inventorySchema = new mongoose.Schema({
  cash: Number,
  sold: Number,
  notPercieved: Number,
  previousStock: Number,
  currentStock: Number,
  createdAt: {
    type: String,
    default: date.getDate()
  },
  market: {
    type: mongoose.Schema.ObjectId,
    ref: 'Market',
    required: [true, 'Inventory must belong to done in a market.']
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
    required: [true, 'inventory must have be done for a product.']
  }
});

inventorySchema.pre(/^find/, function(next) {
  this.populate({ path: 'market', select: '_id name -town' }).populate({
    path: 'product',
    select: '_id brandName model'
  });

  next();
});

const Inventory = mongoose.model('Inventory', inventorySchema);
module.exports = Inventory;
