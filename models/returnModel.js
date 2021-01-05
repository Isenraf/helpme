const mongoose = require('mongoose');
const date = require('../utils/date');

const returnSchema = new mongoose.Schema({
  issue: String,
  description: String,
  isReturn: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: String,
    default: date.getDate(),
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
    required: [true, 'Return must belong to a Product'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Return must belong to a User'],
  },
});

returnSchema.pre(/^find/, function (next) {
  this.populate({ path: 'user', select: 'name _id' }).populate({
    path: 'product',
    select: '_id brandName model',
  });

  next();
});

const Return = mongoose.model('Return', returnSchema);
module.exports = Return;
