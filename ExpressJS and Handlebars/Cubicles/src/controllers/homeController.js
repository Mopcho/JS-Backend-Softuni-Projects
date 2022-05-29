const {cubeService} = require('../services/cubeService');

const router = require('express').Router();

router.get('/', async (req,res)=> {
    let allCubes = await cubeService.getAll();

    let search = req.query.search;
    let from = req.query.from;
    let to = req.query.to;

    if(search) {
        allCubes = allCubes.filter(cube => cube.name.toLowerCase().includes(search.toLowerCase()));

    }
    if(from && to) {
        allCubes = allCubes.filter(cube => Number(cube.difficulty) >= Number(from) && Number(cube.difficulty) <= Number(to));
    }

    res.render('index',{cubes : allCubes});
});

router.get('/about', (req,res) => {
    res.render('about');
});

exports.homeController = router;