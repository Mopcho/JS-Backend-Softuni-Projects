const express = require('express');
const hbs = require('express-handlebars');
const { router } = require('./routes');

const port = 5000;
const app = express();

app.use(express.static('public'));

app.engine('hbs',hbs.engine({extname:'hbs'}));
app.set('view engine', 'hbs');
app.set('views','./src/views');

app.use(express.urlencoded({extended:false}));

app.use(router);

app.listen(port,()=> {console.log(`App listnening on port ${port}...`)});
