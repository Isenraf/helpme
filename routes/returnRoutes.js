const express = require('express');
const returnController = require('../controllers/returnController');

const router = express.Router();

// ADMIN, HEADOFSTAFF, PROSPECTORS && COLLECTORS ONLY
router
  .route('/')
  .get(returnController.getAllReturns)
  .post(returnController.createReturn);

router
  .route('/:id')
  .get(returnController.getReturn)
  .patch(returnController.updateReturn)
  .delete(returnController.deleteReturn);

module.exports = router;
