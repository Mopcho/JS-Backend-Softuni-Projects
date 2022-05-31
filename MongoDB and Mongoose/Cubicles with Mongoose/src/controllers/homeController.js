const router = require('express').Router();
const  { cubeService }  = require('../services/cubeService');

router.get('/',async (req,res)=> {
    if(req.query.search || req.query.from || req.query.to) {
        let search = req.query.search;
        let from = req.query.from;
        let to = req.query.to;

        let cubes = await cubeService.searchByNameAndDiff(search,from,to);

        res.render('index',{cubes : cubes});
    }
    else  {
        let allCubes = await cubeService.getAll();

        res.render('index', {cubes : allCubes});
    }
}); 

router.get('/about',(req,res)=> {
    res.render('about');
}); 




exports.homeController = router;