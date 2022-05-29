const express = require('express');
const handlebars = require('express-handlebars');
const Handlebars = require('handlebars');
const { breedsMiddleware } = require('./breedsMiddleware');
const { catMiddleware } = require('./catsMiddleware');
const bodyParser = require('body-parser');
const formidable = require('formidable');
const fs = require('fs/promises');

const app = express();
const port = 5000;

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


app.engine('hbs',handlebars.engine({extname:'.hbs'}));
app.set('view engine','hbs');

app.use('/public',express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.urlencoded({extended:false}));

app.get('/',breedsMiddleware, catMiddleware , (req,res) => {
    res.render('home',{layout:'main',cats : req.cats});
});

app.get('/cats/add-breed', (req,res)=> {
    res.render('addBreed',{layout:'altPages'});
});

app.get('/cats/add-cat', breedsMiddleware, (req,res)=> {
    res.render('addCat',{layout:'altPages',breeds:req.breeds});
});

app.get('/cats/edit-cat/:id', breedsMiddleware, catMiddleware ,(req,res)=> {
    let cat = req.cats.filter(cat => cat.id == req.params.id)[0];
    
    res.render('editCat',{layout:'altPages',cat : cat,breeds : req.breeds});
});

app.get('/search?name=:name', catMiddleware,  (req,res)=> {
    let catName = req.params.name;

    let cats = req.cats;

    cats.filter(cat => cat.name.includes(catName));

    res.render('home',{layout:'main',cats: cats});
});

//<----------POST Request------------>

app.post('/cats/add-breed*',breedsMiddleware, (req,res) => {
    req.breeds.push(req.body.breed);
    res.redirect('/');
});

app.post('/cats/add-cat', catMiddleware ,(req,res)=> {
    //This needs to be simplified
    const form = formidable({multiples:true, uploadDir:`${__dirname}/public/images`});

    form.parse(req, async (err,fields,files)=> {
        if(err) {
            throw new Error(err);
        }

        let catObj = {
            name : fields.name,
            description : fields.description,
            img : `/public/images/${files.upload.originalFilename}`, //Fix this
            breed : fields.breed,
            id : Math.floor(Math.random() * 100)
        }

        req.cats.push(catObj);

        await fs.rename(`${__dirname}/public/images/${files.upload.newFilename}`,`${__dirname}/public/images/${files.upload.originalFilename}`);

        res.redirect('/');
    });
});

app.listen(port,()=> {console.log(`Server listening on port ${port}`)});


//Edit Cat
//Delete Cat

//Reworks :
// use fs module
