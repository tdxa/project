const express = require('express');
const app = express();

//routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

const expressLayout = require('express-ejs-layouts')

//ejs
app.use(expressLayout);
app.set('view engine','ejs');

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening on ${port} port!`));