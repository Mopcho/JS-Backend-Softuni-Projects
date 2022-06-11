const router = require('express').Router();
const { endpoints } = require('../configs/endpoints');
const  { cubeService }  = require('../services/cubeService');


router.get('/',async (req,res)=> {
    let {search , from , to} = req.query;

    let cubes = await cubeService.getAll(search, from, to);

    res.render(endpoints.index,{cubes,token : req.user});
}); 

router.get('/about',(req,res)=> {
    res.render(endpoints.about);
}); 

exports.homeController = router;