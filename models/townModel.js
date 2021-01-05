const mongoose = require('mongoose');
const date = require('../utils/date');

const townSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A town must have a NAME'],
    unique: true,
  },
  country: {
    type: String,
    required: [true, 'A town belongs to a country'],
    default: 'Cameroon',
  },
  region: {
    type: String,
    required: [true, 'A town must be in a region'],
  },
  department: {
    type: String,
    required: [true, 'A town must have a department'],
  },
  createdAt: {
    type: String,
    default: date.getDate(),
  },
});

const Town = mongoose.model('Town', townSchema);
module.exports = Town;
