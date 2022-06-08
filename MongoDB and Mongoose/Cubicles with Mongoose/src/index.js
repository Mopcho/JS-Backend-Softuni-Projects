//npm-s
const express = require('express');
const hbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
//Files
const { initializeDatabase } = require('./configs/database');
const { router } = require('./router');

const port = 5000;
const app = express();

app.use(cookieParser());
app.use(express.static('public'));

app.engine('hbs',hbs.engine({extname:'hbs'}));
app.set('view engine', 'hbs');
app.set('views','./src/views');

app.use(express.urlencoded({extended:false}));

app.use(router);

initializeDatabase()
    .then(() => {
        app.listen(port, () => console.log(`App is listening on port 5000`));
    })
    .catch((err) => {
        console.log('Cannot connect to db:', err);
    });


//Logout Functionality
//Delete Cube Page
//IMPORTANT : Refactor !!!!!!!

