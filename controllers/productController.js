let productsModel = require('../models/products');

const productControls = {
    viewAll: (req,res,next) => {
            /* ask productModel to get each product
            // value coming back from db should be an array of products, each containing an array of objects (different types);
            // AllItems = [product1 = [
                    {
                        color: red
                        item count: 3
                        image: testimage1.jpg
                    },
                    {
                        color: green
                        item count: 1
                        image: testimage2.jpg
                    },
                ]
                , product2 =  [
                    {
                        color: red
                        item count: 3
                        image: testimage1.jpg
                    },
                    {
                        color: green
                        item count: 1
                        image: testimage2.jpg
                    },
                ]
            ];
            */
            res.render('shoppingPage', {name: req.session.name, email: req.session.email});
    },
    viewCategory: (req,res,next) => {
        console.log(req.session);
        res.render('home', {name: req.session.name, email: req.session.email});
    },
    addProduct: (req,res,next) => {
        res.render('addProductToDB', {name: req.session.name, email: req.session.email});
    }
}
module.exports = productControls;