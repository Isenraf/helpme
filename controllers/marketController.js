const Market = require('../models/marketModel');
const factory = require('./handlerFactory');

// CRUD operations
exports.getAllMarkets = factory.getAll(Market);
exports.getMarket = factory.getOne(Market);
exports.createMarket = factory.createOne(Market);
exports.updateMarket = factory.updateOne(Market);
exports.deleteMarket = factory.deleteOne(Market);
