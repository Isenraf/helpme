const mongoose = require('mongoose');
const date = require('../utils/date');

const entrySchema = new mongoose.Schema({
  author: String,
  entries: [
    {
      refId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product'
      },
      quantity: Number
    }
  ],
  exits: [
    {
      refId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product'
      },
      quantity: Number
    }
  ],
  market: {
    type: mongoose.Schema.ObjectId,
    ref: 'Market',
    required: [true, 'Custmer must belong to a Market']
  },
  town: {
    type: mongoose.Schema.ObjectId,
    ref: 'Town',
    required: [true, 'Custmer must belong to a town']
  },
  createdAt: {
    type: String,
    default: date.getDate()
  }
});

entrySchema.pre(/^find/, function(next) {
  this.populate({ path: 'entries.refId', select: 'brandName model' })
    .populate({
      path: 'exits.refId',
      select: 'brandName model'
    })
    .populate({ path: 'market', select: 'name target' });

  next();
});

const Entry = mongoose.model('Entry', entrySchema);
module.exports = Entry;
