const http = require('http');
let router = require('./router');
const {homeController} = require('./Controllers/homeController');
const { contentController } = require('./Controllers/contentController');
const { addBreedController } = require('./Controllers/addBreedController');
const { addCatController } = require('./Controllers/addCatController');
const { editCatController } = require('./Controllers/editCatController');
const { searchController } = require('./Controllers/searchController');
const { addCatBreed } = require('./PostControllers/addCatBreed');
const { deleteCat } = require('./Controllers/deleteCat');
const { addCat } = require('./PostControllers/addCat');

const port = 5000;

//HTML Requests
router.register('/home',homeController,'GET');
router.register('/search',searchController,'GET');
router.register('/',homeController,'GET');
router.register('/cats/add-breed',addBreedController,'GET');
router.register('/cats/add-cat',addCatController,'GET');
router.register('/cats/edit-cat',editCatController,'GET');

//Action Requests
router.register('/cats/add-breed',addCatBreed,'POST');
router.register('/cats/delete-cat',deleteCat,'GET');
router.register('/cats/add-cat',addCat,'POST');

const server = http.createServer((req,res)=>{
        const handler = router.match(req.url,req.method);

        if(req.url.includes('/content')) {
            contentController(req,res,req.url);
        } else if(typeof handler == 'function') {
            handler(req,res);
        } else {
            res.writeHead(404);
            res.write('Page not found !');
            res.end();
        }
});

server.listen(port, ()=>{console.log(`Server open on port ${port}`)});

//searchController and HomeController share a lot of the same code
//Edit cat
//Add cat
//Save cache call only once readFile
//Make a dictionary of paths so that you dont have to change everywhere a path 

//Redirect with node