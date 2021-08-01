let productsModel = require('../models/productModel');
const uploadController = require('../controllers/uploadController');
const userModelControls = require('../models/userModel');

let pg = ('../db/postgresql');


const productControls = {

    viewcontact: (req,res,next)=>{
        res.render('contact');
    },
    viewCategory: (req,res,next) => {
        console.log(req.session);
        res.render('home', {name: req.session.name, email: req.session.email});
    },
    addProductPage: (req,res,next) => {
        res.render('addProductPage', {name: req.session.name, email: req.session.email});
    },
    addProduct: async (req,res,next) => {
            console.log(req.body);

            // insert into products using first three fields, name, description, and value
            // After insertion, retreieve the product ID, and delete the name, description, and value fields for better indexing of the JSON object
            try {
                var product_id = await productsModel.insertProduct(req.body.name, req.body.description, req.body.value, req.body.category);
                console.log("product_id: " + product_id.rows[0].product_id);
                delete req.body.name;
                delete req.body.description;
                delete req.body.value
                delete req.body.category
                var numOfVarieties = Object.keys(req.body).length/7
                console.log(numOfVarieties);
                for (var i = 0; i < numOfVarieties; i++) {
                    var sku_id = req.body[Object.keys(req.body)[i*7]]
                    var gender = req.body[Object.keys(req.body)[i*7 + 1]]
                    var size = req.body[Object.keys(req.body)[i*7 + 2]]
                    var color = req.body[Object.keys(req.body)[i*7 + 3]]
                    var location = req.body[Object.keys(req.body)[i*7 + 4]]
                    var count = req.body[Object.keys(req.body)[i*7 + 5]]
                    var imgurl = req.body[Object.keys(req.body)[i*7 + 6]]
                    const result = await productsModel.insertProductDetails(sku_id, product_id.rows[0].product_id, size, gender, color, location, count, imgurl);
                }
                res.render('home', {name: req.session.name, email: req.session.email});
            } catch (err) {
                console.log(err)
            }
        
    },
    viewSettings:async (req,res) =>{
        try {
            const user = await userModelControls.getAlluser();
            res.render('connectPage',{user:user.rows})

        } catch (err) {
            console.log(err)
        }
    },
    viewAllProducts: async (req,res,next) => {
        try {
            const bottles = await productsModel.getAllBottles();
            const shirts = await productsModel.getAllShirts();
            const backpacks = await productsModel.getAllBackpacks();
            res.render('allProductsPage', {bottles: bottles.rows, shirts: shirts.rows, backpacks:backpacks.rows});
        } catch (err) {
            console.log(err)
        }
    },
    viewBottles: async (req,res,next) => {
        try {
            const bottles = await productsModel.getAllBottles();
            console.log(bottles.rows);
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
    },
    viewDetail: async (req,res,next) => {
        try {
            let productId = req.params.productId;
            const productDetail = await productsModel.getOneProduct(productId);
            console.log(productDetail);
            res.render('detail',{productDetails: productDetail.rows});
        } catch (err) {
            console.log(err)
        }
    },
}

module.exports = productControls;