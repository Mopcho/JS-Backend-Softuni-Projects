//npm-s
const express = require('express');
const hbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
//Files
const { initializeDatabase } = require('./configs/database');
const { router } = require('./router');
const { auth } = require('./Middlewares/authMiddleware');

const port = 5000;
const app = express();

app.use(cookieParser());
app.use(express.static('public'));

app.engine('hbs',hbs.engine({extname:'hbs'}));
app.set('view engine', 'hbs');
app.set('views','./src/views');

app.use(express.urlencoded({extended:false}));
app.use(auth);
app.use(router);

initializeDatabase()
    .then(() => {
        app.listen(port, () => console.log(`App is listening on port 5000`));
    })
    .catch((err) => {
        console.log('Cannot connect to db:', err);
    });


//IMPORTANT : Refactor !!!!!!!

//Refactor views folder
//Check cube and accessory controllers
//Refactor cubeService
//Refactor accessorySErvice

//Bugs :
//If token is expired it bugs in the middleware

//Validation on Mongoose and Service
//Controllers just get the data and send it to the service that does the request and returns the data
