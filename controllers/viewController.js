const date = require('../utils/date');
const axios = require('axios');
const Town = require('../models/townModel');
const Entry = require('../models/entryModel');
const Market = require('../models/marketModel');
const Product = require('../models/productModel');
const Customer = require('../models/customerModel');
const Inventory = require('../models/inventoryModel');
const catchAsync = require('../utils/catchAsync');

exports.setMarket = (req, res, next) => {
  res.locals.market = req.app.locals.market;
  next();
};

exports.inventoryAutomation = catchAsync(async (req, res, next) => {
  // 1) GET all ACTIVE products
  const productList = await Product.find({ active: true });

  // 2) GET TODAY entries & exits
  const entriesList = await Entry.find({
    market: req.params.mId,
    createdAt: date.getDate()
  });

  // 3) GET TODAY registered CUSTOMERS and those
  //  already existing customers that added a product to their basket
  const customersList = await Customer.find({
    $or: [
      {
        town: req.params.tId,
        market: req.params.mId,
        'products.takenOnThe': date.getDate()
      },
      {
        town: req.params.tId,
        market: req.params.mId,
        createdAt: date.getDate()
      }
    ]
  });

  // 4) DETERMINE FOR EACH PRODUCT its:
  // previous stock, current stock, sold, cash, not percieved, entry and exits for the day.
  productList.forEach(async curProdObj => {
    let sold = 0;
    let cash = 0;
    let exitQ = 0;
    let entryQ = 0;
    let market = req.params.mId;
    let product = curProdObj._id;
    let notPercieved = 0;
    let currentStock = 0;
    let previousStock = 0;

    if (
      await Inventory.findOne({
        product: curProdObj._id,
        createdAt: date.getDate(),
        market: req.params.mId
      })
    )
      return;

    customersList.forEach(curCust => {
      // i -> sold
      curCust.products.forEach(curSubProdObj => {
        if (curSubProdObj.takenOnThe === date.getDate()) {
          if (curProdObj.equals(curSubProdObj.refId._id)) {
            sold = curSubProdObj.quantity;
          }
        }
      });

      // ii -> cash
      curCust.cash.forEach(curSubProdObj => {
        if (curSubProdObj.takenOnThe === date.getDate()) {
          if (curProdObj.equals(curSubProdObj.refId._id)) {
            cash = curSubProdObj.quantity;
          }
        }
      });

      // iii -> not percieved
      curCust.products.forEach(curSubProdObj => {
        if (curSubProdObj.takenOnThe === date.getDate()) {
          if (curProdObj.equals(curSubProdObj.refId._id)) {
            notPercieved = curSubProdObj.quantity;
          }
        }
      });
    });

    entriesList.forEach(curEntryObj => {
      // iv -> entry
      curEntryObj.entries.forEach(curSubEntbj => {
        if (curProdObj.equals(curSubEntbj.refId._id)) {
          entryQ = curSubEntbj.quantity;
        }
      });
      // iv -> exit
      curEntryObj.exits.forEach(curSubEntbj => {
        if (curProdObj.equals(curSubEntbj.refId._id)) {
          exitQ = curSubEntbj.quantity;
        }
      });
    });

    // Shift by one day behind and get the current product
    const query = await Inventory.findOne({
      product: curProdObj._id,
      market: req.params.mId,
      createdAt: date.minusDate()
    });

    // Then get its cuurentStock field and store it into
    // The previousStock field of the current product
    previousStock = query !== null ? query.currentStock : entryQ;
    currentStock = entryQ - (cash + sold + notPercieved + exitQ);

    // send http request for the creation of an inventory
    await axios({
      method: 'post',
      url: '/api/v1/inventories',
      data: {
        cash,
        sold,
        market,
        product,
        notPercieved,
        previousStock,
        currentStock
      }
    });
  });

  next();
});

exports.getWelcome = (req, res) => {
  res.status(200).render('base', { title: 'welcome to you' });
};

exports.getSignInForm = (req, res) => {
  res.status(200).render('signin', { title: 'Sign In' });
};

exports.getDashboard = (req, res) => {
  res.status(200).render('dashboard', { title: 'Dashboard' });
};

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your Account'
  });
};

exports.getUserRegistration = catchAsync(async (req, res, next) => {
  const towns = await Town.find();
  res.status(200).render('addUser', {
    title: 'Register New User',
    towns
  });
});

exports.getAddProduct = (req, res) => {
  res.status(200).render('addProduct', { title: 'Create new Product' });
};

exports.getRegistration = catchAsync(async (req, res, next) => {
  // Get products, market, town data from their collection.
  const products = await Product.find({ active: true });

  res.status(200).render('addCustomer', {
    title: 'Add customer',
    products
  });
});

exports.getUserInventory = catchAsync(async (req, res, next) => {
  const customers = await Customer.find({
    $or: [
      {
        town: req.params.tId,
        market: req.params.mId,
        'products.takenOnThe': date.getDate()
      },
      {
        inChargeOf: req.params.usId,
        town: req.params.tId,
        market: req.params.mId,
        createdAt: date.getDate()
      }
    ]
  });

  res.status(200).render('userInventory', {
    title: 'Personal Inventory',
    customers,
    date
  });
});

exports.getDailyMarket = catchAsync(async (req, res) => {
  const markets = await Market.find();

  res.status(200).render('dailyMarket', {
    title: "Today's market",
    markets
  });
});

exports.getMarketId = catchAsync(async (req, res) => {
  // store the object into the global variable market
  req.app.locals.market = await Market.findById({ _id: req.params.mkid });

  res.status(200).json({
    status: 'success'
  });
});

exports.getInventory = catchAsync(async (req, res, next) => {
  const inventories = await Inventory.find({
    market: req.params.mId,
    createdAt: date.getDate()
  });

  res.status(200).render('inventory', {
    title: 'General Inventory',
    inventories
  });
});

exports.getEntryExit = catchAsync(async (req, res, next) => {
  // Get products, market, town data from their collection.
  const products = await Product.find();

  res.status(200).render('entries', { title: 'Today Entries', products });
});

exports.getRequestedCustomer = catchAsync(async (req, res, next) => {
  // console.log(req.params.marketId, req.params.townId, req.params.searchQuery);
  // { <field>: { $regex: 'pattern', $options: '<options>' } }
  const data = await Customer.find({
    phoneNumber: {
      $regex: `^${req.params.searchQuery}`,
      $options: 'i'
    },
    town: req.params.townId,
    market: req.params.marketId
  });

  res.status(200).json({ status: 'success', data });
});

exports.getCustomerPage = catchAsync(async (req, res, next) => {
  const customerInfo = await Customer.findOne({
    phoneNumber: req.params.phone
  });
  // Get products, market, town data from their collection.
  const products = await Product.find({ active: true });
  res.status(200).render('customer_dashboard', {
    title: `${customerInfo.name}`,
    customerInfo,
    products
  });
});
