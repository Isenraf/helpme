const mongoose = require('mongoose');
const date = require('../utils/date');

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name']
  },
  phoneNumber: {
    type: String,
    required: [true, 'Please provide your phone number'],
    unique: true
  },
  photo: String,
  Ncni: {
    type: String,
    required: [true, 'A customer needs an id card'],
    unique: true
  },
  town: {
    type: mongoose.Schema.ObjectId,
    ref: 'Town',
    required: [true, 'Custmer must belong to a town']
  },
  locationDescription: {
    type: String,
    required: [true, 'Customer must have a place of work']
  },
  firstPayment: {
    type: Number,
    required: [true, 'A customer must start with an initial payment']
  },
  inChargeOf: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'The customer must be signed up by a user']
  },
  notPercieved: [
    {
      refId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product'
      },
      quantity: Number,
      takenOnThe: {
        type: String,
        default: date.getDate()
      }
    }
  ],
  active: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: String,
    default: date.getDate()
  },
  market: {
    type: mongoose.Schema.ObjectId,
    ref: 'Market',
    required: [true, 'Custmer must belong to a Market']
  },
  products: [
    {
      refId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product'
      },
      quantity: Number,
      takenOnThe: {
        type: String,
        default: date.getDate()
      }
    }
  ],
  cash: [
    {
      refId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product'
      },
      quantity: Number,
      takenOnThe: {
        type: String,
        default: date.getDate()
      }
    }
  ]
});

customerSchema.pre(/^find/, function(next) {
  this.populate({ path: 'products.refId', select: 'brandName model' })
    .populate({
      path: 'town',
      select: 'name region'
    })
    .populate({ path: 'market', select: 'name target' })
    .populate({ path: 'inChargeOf', select: 'name role' })
    .populate({ path: 'notPercieved.refId', select: 'brandName model' })
    .populate({ path: 'cash.refId', select: 'brandName model' });

  next();
});

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;
