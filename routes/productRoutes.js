const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

// ADMIN & HEADOFSTAFF ONLY
router
  .route('/')
  .get(productController.getAllProducts)
  .post(productController.createProduct);

router
  .route('/:id')
  .get(productController.getProduct)
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);

module.exports = router;
