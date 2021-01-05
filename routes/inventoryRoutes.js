const express = require('express');
const inventoryController = require('../controllers/inventoryController');

const router = express.Router();

// ADMIN, HEADOFSTAFF, PROSPECTORS && COLLECTORS ONLY
router
  .route('/')
  .get(inventoryController.getAllInventories)
  .post(inventoryController.createInventory);

router
  .route('/:id')
  .get(inventoryController.getInventory)
  .patch(inventoryController.updateInventory)
  .delete(inventoryController.deleteInventory);

module.exports = router;
