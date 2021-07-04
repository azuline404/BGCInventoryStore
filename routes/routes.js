const express = require('express');
const path = require('path');
const router = express.Router();
const bodyParser = require('body-parser');
const authController = require('../controllers/AuthController');
const orderController = require('../controllers/orderController');
const productController = require('../controllers/productController');


router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(express.static(path.join(__dirname, 'public')));

router.get('/', authController.authenticate);
router.get('/redirect', authController.redirect);
router.get('/home',authController.home);
router.get('/test',orderController.test);
router.get('/addProduct', productController.addProduct);

module.exports = router;
