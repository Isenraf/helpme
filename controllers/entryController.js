const Entry = require('../models/entryModel');
const factory = require('./handlerFactory');

// CRUD operations
exports.getAllEntries = factory.getAll(Entry);
exports.getEntry = factory.getOne(Entry);
exports.createEntry = factory.createOne(Entry);
exports.updateEntry = factory.updateOne(Entry);
exports.deleteEntry = factory.deleteOne(Entry);
