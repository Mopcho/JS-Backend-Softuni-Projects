const express = require('express');
const { constants } = require('./configs/constants');
const { initializeDatabase } = require('./configs/database');
const hbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const { router } = require('./routes');

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

app.use(router);

initializeDatabase()
.then(()=> {
    app.listen(constants.port, ()=> {console.log(`Server listnening on port ${constants.port}`)});
}).catch((err)=> {
    console.err('Cant Connect To DataBase');
});

