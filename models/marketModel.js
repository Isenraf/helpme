const mongoose = require('mongoose');
const date = require('../utils/date');

const marketSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A market must have a name'],
    unique: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
  duration: {
    type: Number,
    required: [true, 'A market must have a number of days for prospection'],
  },
  target: {
    type: Number,
    required: [true, 'A market must have an objective to attain'],
  },
  town: {
    type: mongoose.Schema.ObjectId,
    ref: 'Town',
    required: [true, 'Custmer must belong to a town'],
  },
  createdAt: {
    type: String,
    default: date.getDate(),
  },
});

marketSchema.pre(/^find/, function (next) {
  this.populate({ path: 'town', select: 'name region' });
  next();
});

const Market = mongoose.model('Market', marketSchema);
module.exports = Market;
