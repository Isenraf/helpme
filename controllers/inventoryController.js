const Inventory = require('../models/inventoryModel');
const factory = require('./handlerFactory');

// CRUD operations
exports.getAllInventories = factory.getAll(Inventory);
exports.getInventory = factory.getOne(Inventory);
exports.createInventory = factory.createOne(Inventory);
exports.updateInventory = factory.updateOne(Inventory);
exports.deleteInventory = factory.deleteOne(Inventory);
