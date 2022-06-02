const express = require('express');
const hbs = require('express-handlebars');
const mongoose = require('mongoose');
const { router } = require('./router');

const port = 5000;
const app = express();
const url = 'mongodb://localhost:27017/cubicles';
mongoose.connect(url)
    .then(()=> {
        console.log('Database Connected !');
    })
    .catch((err)=> {
        console.log(err);
    });

app.use(express.static('public'));

app.engine('hbs',hbs.engine({extname:'hbs'}));
app.set('view engine', 'hbs');
app.set('views','./src/views');

app.use(express.urlencoded({extended:false}));

app.use(router);

app.listen(port,()=> {console.log(`App listnening on port ${port}...`)});


//Edit detailsPage with correct info
//Refactor 
