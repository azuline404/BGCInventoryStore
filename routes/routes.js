const express = require('express');
const path = require('path');
const router = express.Router();
const bodyParser = require('body-parser');
const authController = require('../controllers/AuthController');
const orderController = require('../controllers/orderController');
const productController = require('../controllers/productController');
const uploadController = require('../controllers/uploadController');
const Controller404 = require('../controllers/404Controller')


router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(express.static(path.join(__dirname, 'public')));

router.get('/', authController.authenticate);
router.get('/redirect',authController.redirect);
router.get('/home',authController.checkAuth, authController.home);
router.get('/addJacketPage', authController.checkAuth, productController.addJacketPage);
router.post('/addProduct', uploadController.uploadFile, productController.addJacket);
router.get('/shopBottles',productController.viewBottles)
router.get('/shopBackpacks',productController.viewBackpacks)
router.get('/shopShirts',productController.viewShirts)
router.get('/shopAllProducts',productController.viewAllProducts)
router.get('/*',Controller404.notFound)
// router.post('/addProduct', productController.addProduct);

module.exports = router;