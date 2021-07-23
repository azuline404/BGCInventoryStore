let pg = ('../db/postgresql');
const pool = require('../db/postgresql');
let productsModel = require('../models/productModel');


const cartPage = {
    viewSubPage: async (req, res) => {
        try{
            var id = req.params.product_id;
            const new_item = await productsModel.getProductByID(id);
            res.render('after_add',{new_item: new_item.rows});
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
        res.render('shoppingCart')
    }
}
module.exports = cartPage;

//         const backpacks = await productsModel.getAllBackpacks();
//         res.render('allProductsPage', {bottles: bottles.rows, shirts: shirts.rows, backpacks:backpacks.rows});
//     } catch (err) {
//         console.log(err)
//     }
// },