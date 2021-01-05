const express = require('express');
const marketController = require('../controllers/marketController');

const router = express.Router();

// ADMIN & HEADOFSTAFF ONLY
router
  .route('/')
  .get(marketController.getAllMarkets)
  .post(marketController.createMarket);

router
  .route('/:id')
  .get(marketController.getMarket)
  .patch(marketController.updateMarket)
  .delete(marketController.deleteMarket);

module.exports = router;
