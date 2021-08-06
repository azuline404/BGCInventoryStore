const orderModel = require('../models/orderModel');

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
    }
}
module.exports = orderControls;