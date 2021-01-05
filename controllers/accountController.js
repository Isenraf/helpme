const Account = require('../models/accountModel');
const factory = require('./handlerFactory');

// CRUD operations
exports.getAllAccounts = factory.getAll(Account);
exports.getAccount = factory.getOne(Account);
exports.createAccount = factory.createOne(Account);
exports.updateAccount = factory.updateOne(Account);
exports.deleteAccount = factory.deleteOne(Account);
