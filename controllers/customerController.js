const Customer = require('../models/customerModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');

// CRUD operations
exports.getAllCustomers = factory.getAll(Customer);
exports.getCustomer = factory.getOne(Customer);
exports.createCustomer = factory.createOne(Customer);
exports.updateCustomer = factory.updateOne(Customer);
exports.deleteCustomer = factory.deleteOne(Customer);

exports.updateArrayField = catchAsync(async (req, res, next) => {
  let doc;
  const field = req.params.identifier;
  const _object = JSON.parse(req.params.products);

  if (field === 'products')
    doc = await Customer.findByIdAndUpdate(req.params.id, {
      $push: { products: _object }
    });
  else if (field === 'notPercieved')
    doc = await Customer.findByIdAndUpdate(req.params.id, {
      $push: { notPercieved: _object }
    });
  else if (field === 'cash')
    doc = await Customer.findByIdAndUpdate(req.params.id, {
      $push: { cash: _object }
    });

  res.status(200).json({
    status: 'success',
    data: {
      data: doc
    }
  });
});
