const Return = require('../models/returnModel');
const factory = require('./handlerFactory');

// CRUD operations
exports.getAllReturns = factory.getAll(Return);
exports.getReturn = factory.getOne(Return);
exports.createReturn = factory.createOne(Return);
exports.updateReturn = factory.updateOne(Return);
exports.deleteReturn = factory.deleteOne(Return);
