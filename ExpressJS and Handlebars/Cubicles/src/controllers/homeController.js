const {cubeService} = require('../services/cubeService');

const router = require('express').Router();

router.get('/', async (req,res)=> {
    let allCubes = await cubeService.getAll();

    res.render('index',{cubes : JSON.parse(allCubes)});
});

router.get('/about', (req,res) => {
    res.render('about');
})

exports.homeController = router;