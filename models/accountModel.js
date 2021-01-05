const mongoose = require('mongoose');
const date = require('../utils/date');

const accountSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'An account must have a name'],
    trim: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
  duration: {
    type: Number,
    required: [true, 'An account should have a duration before it expires.'],
  },
  totalAmount: {
    type: Number,
    required: [true, 'An account must have a given amount of money.'],
  },
  createdAt: {
    type: String,
    default: date.getDate(),
  },
  products: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
    },
  ],
  customers: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Customer',
    },
  ],
  returns: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Return',
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Account must belong to a User'],
  },
  market: {
    type: mongoose.Schema.ObjectId,
    ref: 'Market',
    required: [true, 'Account must belong to a Market'],
  },
});

accountSchema.pre(/^find/, function (next) {
  this.populate({ path: 'market', select: 'name region' })
    .populate({
      path: 'user',
      select: 'name role',
    })
    .populate({ path: 'customers', select: 'name phoneNumber' })
    .populate({ path: 'products', select: '_id model brandName' });

  next();
});

const Account = mongoose.model('Account', accountSchema);
module.exports = Account;
