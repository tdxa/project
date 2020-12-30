const express = require('express');
const expressLayout = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport')
const app = express();

//passport config
require('./config/passport')(passport);

//database config
const db = require('./config/keys').MongooseURI;
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MonoDB connected"))
    .catch(err => console.log(err));

//ejs
app.use(expressLayout);
app.set('view engine', 'ejs');

//bodyparser
app.use(express.urlencoded({ extended: true }));

//Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());


//Connect flash
app.use(flash());

//Global variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

//routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users.js'));


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening on ${port} port!`));