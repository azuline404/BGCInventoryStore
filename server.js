const express = require("express");
const hbs = require('express-handlebars');
const exphbs = require('express-handlebars');
const session = require('express-session');
const mainRouter = require('./routes/routes');
const path = require('path');
let pg = require('./util/postgresql');


const SERVER_PORT = process.env.PORT || 3000; // listen on port 3000



// Create Express App and Routes
const app = express();

// set up handlebars using extension name hbs
app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: __dirname + '/views/partials/'
}));
app.use(express.static(path.join(__dirname, '/public')));
// set the view engine to hbs
app.set('view engine', 'hbs');

// create a session (main use is to keep the username/email)
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false
}));

// tell the app to use the routes from routes/routes.js
app.use(mainRouter);

app.use(express.static(path.join(__dirname, '/public')));

// start the app and listen
app.listen(SERVER_PORT, () => console.log(`Msal Node Auth Code Sample app listening on port ${SERVER_PORT}!`))
