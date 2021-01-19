const express = require('express');
const customerController = require('../controllers/customerController');

const router = express.Router();

// ADMIN, HEADOFSTAFF, PROSPECTORS && COLLECTORS ONLY
router
  .route('/')
  .get(customerController.getAllCustomers)
  .post(customerController.createCustomer);

router
  .route('/:id')
  .get(customerController.getCustomer)
  .patch(customerController.updateCustomer)
  .delete(customerController.deleteCustomer);

router.patch('/:id/:products/:identifier', customerController.updateArrayField);

module.exports = router;
