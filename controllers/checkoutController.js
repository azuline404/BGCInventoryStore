const checkoutPage = {
    viewCheckout: (req, res) => {
        
        // retrieve order_id from shopping cart
        var order_id = req.params.order_id

        // checkout ...

        res.render('checkoutPage', {email: req.session.email});
    }
}

module.exports = checkoutPage;