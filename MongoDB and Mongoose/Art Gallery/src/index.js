const express = require('express');
const { constants } = require('./configs/constants');
const { initializeDatabase } = require('./configs/database');
const hbs = require('express-handlebars');
const cookieParser = require('cookie-parser');

const app = express();

//Setup cookieParser and public folder
app.use(cookieParser());
app.use(express.static('public'));

//Setup Handlebars
app.engine('hbs',hbs.engine({extname:'hbs'}));
app.set('view engine', 'hbs');
app.set('views','./src/views');

//Setup bodyParser
app.use(express.urlencoded({extended:false}));

initializeDatabase()
.then(()=> {
    app.listen(constants.port, `Server listnening on port ${app.port}`);
}).catch((err)=> {
    console.log('Cant Connect To DataBase');
});
