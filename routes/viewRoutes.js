const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', authController.isLoggedIn, viewController.getWelcome);
router.get('/signin', authController.isLoggedIn, viewController.getSignInForm);

router.get(
  '/dashboard',
  authController.isLoggedIn,
  viewController.getDashboard
);

router.get('/me', authController.isLoggedIn, viewController.getAccount);

router.get(
  '/search/:townId/:marketId/:searchQuery',
  authController.isLoggedIn,
  viewController.getRequestedCustomer
);

router.get(
  '/search/:townId/:marketId/:searchQuery',
  authController.isLoggedIn,
  viewController.getRequestedCustomer
);

router.get(
  '/custpage/:phone',
  authController.isLoggedIn,
  viewController.getCustomerPage
);

router.get(
  '/register',
  authController.isLoggedIn,
  viewController.setMarket,
  viewController.getRegistration
);

router.get(
  '/registerUser',
  authController.isLoggedIn,
  viewController.getUserRegistration
);
router.get(
  '/addproduct',
  authController.isLoggedIn,
  viewController.getAddProduct
);

router.get(
  '/userInventory/:usId/:tId/:mId',
  authController.isLoggedIn,
  viewController.setMarket,
  viewController.getUserInventory
);
router.get(
  '/inventory/:tId/:mId',
  authController.isLoggedIn,
  viewController.setMarket,
  viewController.inventoryAutomation,
  viewController.getInventory
);

router.get('/mod', authController.isLoggedIn, viewController.getDailyMarket);

router.post(
  '/getmarketid/:mkid',
  authController.isLoggedIn,
  viewController.getMarketId
);

router.get(
  '/entryExit',
  authController.isLoggedIn,
  viewController.getEntryExit
);

module.exports = router;
