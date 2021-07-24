const checkoutPage = {
    viewCheckout: (req, res) => {
        res.render('checkoutPage', {email: req.session.email});
    }
}

module.exports = checkoutPage;