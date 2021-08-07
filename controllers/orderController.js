const { getProductsByOrderID } = require('../models/orderModel');
const orderModel = require('../models/orderModel');
const userModel  = require('../models/userModel');

const orderControls = {
    updateNewOrder: async(req,res,next) => {
        try {
            console.log("reached updateNewOrder!")
            const order_id = req.params.order_id;
            const status = req.body.status;
            await orderModel.updateNewOrderStatus(order_id, status)
            res.render('orderSubmitPage');
        } catch (err) {
            console.log(err)
        }
    },
    viewOrder: async(req,res,next) => {
        try {
            const order_id = req.params.order_id;
            console.log(order_id);
            const orderInformation = await orderModel.getOrderByID(order_id);
            const requester = orderInformation.rows[0].requester_id;
            const userInformation = await userModel.getUserByID(requester);
            console.log(userInformation.rows);
            const productsInOrder = await getProductsByOrderID(order_id); 
            console.log(productsInOrder.rows);
            var email = req.session.email;
            res.render('reviewOrderPage', {products: productsInOrder.rows, user: userInformation.rows, email, order_id});
        } catch (err) {
            console.log(err)
        }
    },
    updateOrder: async(req,res,next) => {
        // try {
        //     const order_id = req.params.order_id;
        //     res.render('reviewOrderPage', {products: productsInOrder.rows, user: userInformation.rows, email, order_id});
        // } catch (err) {
        //     console.log(err)
        // }
    }
}
module.exports = orderControls;