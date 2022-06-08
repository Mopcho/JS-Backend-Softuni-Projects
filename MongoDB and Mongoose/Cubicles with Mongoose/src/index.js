//npm-s
const express = require('express');
const hbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const Handlebars = require('handlebars')
//Files
const { initializeDatabase } = require('./configs/database');
const { router } = require('./router');

const port = 5000;
const app = express();

Handlebars.registerHelper( "when" ,function(operand_1, operator, operand_2, options) {
    var operators = {
     'eq': function(l,r) { return l == r; },
     'noteq': function(l,r) { return l != r; },
     'gt': function(l,r) { return Number(l) > Number(r); },
     'or': function(l,r) { return l || r; },
     'and': function(l,r) { return l && r; },
     '%': function(l,r) { return (l % r) === 0; }
    }
    , result = operators[operator](operand_1,operand_2);
  
    if (result) return options.fn(this);
    else  return options.inverse(this);
  });

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

    
    //Only the user that created the cube can edit it
    //Cube cant be liked by its creator
    //User can like the cube only once



