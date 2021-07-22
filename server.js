// DEPENDENCIES
// ============
const express = require("express");
const exphbs = require('express-handlebars');
const session = require('express-session');
const mainRouter = require('./routes/routes');
const path = require('path');
const bodyParser = require('body-parser');


// SET DEFAULT PORT
// ================
const SERVER_PORT = process.env.PORT || 3000;


// INITIALIZE EXPRESS
// ==================
const app = express();


// CONFIGURE HANDLEBARS
// ====================
app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: __dirname + '/views/partials/'
}));

app.set('view engine', 'hbs');


// SPECIFY JS/CSS/MEDIA PATH
// =========================
app.use(express.static(path.join(__dirname, '/public')));
// BUILD SESSION
// =============
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false
}));
app.use(express.json()) 

// EXPRESS ROUTER
// ==============
app.use(mainRouter);

app.get('/FAQ', (req, res) => {
    res.render("FAQ", {layout:'main'});
})

app.get('/Contact', (req, res) => {
    res.render("Contact", {layout:'main'});
})

//product detail page
app.get('/detail', (req, res) => {
    res.render("detail", {layout:'main'});
})

var hbs = exphbs.create({});
hbs.handlebars.registerHelper('grouped_each', function(every, context, options) {
    var out = "", subcontext = [], i;
    if (context && context.length > 0) {
        for (i = 0; i < context.length; i++) {
            if (i > 0 && i % every === 0) {
                out += options.fn(subcontext);
                subcontext = [];
            }
            subcontext.push(context[i]);
        }
        out += options.fn(subcontext);
    }
    return out;
});

// app.get('/shoppingPage', (req, res) => {
//     res.render("shoppingPage", {layout:'main'});
// })
// START SERVER
// ============
app.listen(SERVER_PORT, () => console.log(`server is running on: http://localhost:${SERVER_PORT}`))
