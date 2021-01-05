const Town = require('../models/townModel');
const factory = require('./handlerFactory');

// CRUD operations
exports.getAllTowns = factory.getAll(Town);
exports.getTown = factory.getOne(Town);
exports.createTown = factory.createOne(Town);
exports.updateTown = factory.updateOne(Town);
exports.deleteTown = factory.deleteOne(Town);
