const express = require('express');
const expressLayout = require('express-ejs-layouts');
const app = express();
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');

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

//Connect flash
app.use(flash());

//routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users.js'));


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening on ${port} port!`));