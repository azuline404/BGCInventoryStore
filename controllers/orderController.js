const orderControls = {
    test: (req,res,next) => {
        if (req.session.email) console.log(req.session.email);
        res.render('home', {name: "boo", email: req.session.email});
    }
    
}

module.exports = orderControls;