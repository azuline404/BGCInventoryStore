let productsModel = require('../models/productModel');
const uploadController = require('../controllers/uploadController');

let pg = ('../db/postgresql');


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
    addProductPage: (req,res,next) => {
        res.render('addProductPage', {name: req.session.name, email: req.session.email});
    },
    addProduct: (req,res,next) => {
            console.log(req.file.filename);
            res.render('home', {name: req.session.name, email: req.session.email});
    },
    viewBottles: async (req,res,next) => {
        try {
            const bottles = await productsModel.getAllBottles();
            res.render('bottlesPage', {bottles: bottles.rows, category: "Bottles"})
        } catch (err) {
            console.log(err)
        }
    },
    viewBackpacks: async (req,res,next) => {
        try {
            const backpacks = await productsModel.getAllBackpacks();
            res.render('backpacksPage', {backpacks: backpacks.rows, category: "Backpacks"})
        } catch (err) {
            console.log(err)
        }
    },
    viewShirts: async (req,res,next) => {
        try {
            const shirts = await productsModel.getAllShirts();
            res.render('shirtsPage', {shirts: shirts.rows, category: "Shirts"})
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = productControls;

   // const backpacks = await productsModel.getAllBackpacks();
            // const shirts = await productsModel.getAllShirts();
            // const products = await productsModel.getAllProducts();
            // console.log("<============================== ALL THE BOTTLES: ==============================>")
            // console.log(bottles.rows)
            // console.log("<============================= ALL THE BACKPACKS: =============================>")
            // console.log(backpacks.rows)
            // console.log("<============================= ALL THE SHIRTS: =============================>")
            // console.log(shirts.rows)
            // console.log("<============================= ALL THE PRODUCTS: =============================>")
            // console.log(products.rows)