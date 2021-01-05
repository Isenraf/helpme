const mongoose = require('mongoose');
const date = require('../utils/date');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A product must have a name'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'A product must must have a price']
  },
  brandName: {
    type: String,
    required: [true, 'A product must have a brand-name'],
    maxlength: [10, 'A tour name must have less or equal then 40 characters']
  },
  summary: String,
  description: String,
  model: {
    type: String,
    required: [true, 'A product must have a model-key'],
    unique: true
  },
  warranty: Number,
  firstPay: {
    type: Number,
    required: [true, 'A product must have a starting Pay']
  },
  dailyPay: {
    type: Number,
    required: [true, 'A product must have a daily Pay']
  },
  cashPrice: {
    type: Number,
    required: [true, 'A product must have a cash price']
  },
  active: {
    type: Boolean,
    default: true
  },
  duration: {
    type: Number,
    required: [true, 'A product must have a limit time to pay']
  },
  imageCover: {
    type: String,
    required: [true, 'A product must have a cover image'],
    default: 'image.jpeg'
  },
  images: [String],
  createdAt: {
    type: String,
    default: date.getDate()
  }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
