const express = require('express');
const townController = require('../controllers/townController');

const router = express.Router();

// ADMIN & HEADOFSTAFF ONLY
router
  .route('/')
  .get(townController.getAllTowns)
  .post(townController.createTown);

router
  .route('/:id')
  .get(townController.getTown)
  .patch(townController.updateTown)
  .delete(townController.deleteTown);

module.exports = router;
