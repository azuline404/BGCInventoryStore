let pg = ('../db/postgresql');
const pool = require('../db/postgresql');
let productsModel = require('../models/productModel');
let ordersModel = require('../models/orderModel');


const cartPage = {
    viewSubPage: async (req, res) => {
        try{
            var product_id = req.params.product_id; // delete***************
            var sku_id = req.params.sku_id;
            
            // add new item to order/cart
            var order_id = await productsModel.createCartForRequesterID(req.session.user_id);
            await productsModel.addProductToCart(order_id, sku_id);
            
            // render new item summary
            const new_item = await productsModel.getProductBySkuID(sku_id)

            // dispatch order_id to after_add, so it can viewed later at shoppingCart.hbs
            res.render('after_add',{
                new_item: new_item.rows,
                order_id
            });

        }catch (err){
            console.log(err)
        }

        // let sql = `SELECT * FROM bottles WHERE bottles.id = ${req.params.id}`;
        // let query = pool.query(sql,(err,result)=>{
        //     if(err) throw err;
        //     console.log('here' + result)
        // });
    },

    viewCart: async (req, res)=>{
        try {
            // retrieve order_id form after_add
            var order_id = req.params.order_id

            // retrieve shopping cart and dispatch to shoppingCart.hbs
            const cart = await ordersModel.getProductsByOrderID(order_id)

            console.log(cart)

            res.render('shoppingCart',{
                cart: cart.rows
            })
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = cartPage;