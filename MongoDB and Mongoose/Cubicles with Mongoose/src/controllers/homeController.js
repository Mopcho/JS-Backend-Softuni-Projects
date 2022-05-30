const router = require('express').Router();
const  { cubeService }  = require('../services/cubeService');

router.get('/',async (req,res)=> {
    let allCubes = await cubeService.getAll();

    res.render('index', {cubes : allCubes});
}); 

router.get('/about',(req,res)=> {
    res.render('about');
}); 

exports.homeController = router;