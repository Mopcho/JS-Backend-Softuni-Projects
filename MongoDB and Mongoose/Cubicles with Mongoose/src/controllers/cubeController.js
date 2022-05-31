const router = require('express').Router();
const { Cube } = require('../Models/Cube');
const {cubeService }= require('../services/cubeService');

router.get('/create',(req,res)=> {
    res.render('create');
}); 

router.get('/details/:id',async (req,res)=> {
    let cube = await cubeService.getCubeById(req.params.id);

    res.render('details', {cube : cube});
}); 

router.post('/create', async (req,res)=> {
    let cubeObj = {
        name : req.body.name,
        description : req.body.description,
        imgPath : req.body.imageUrl,
        difficultyLevel : req.body.difficultyLevel,
        likes : 0
    }

    await cubeService.postCube(cubeObj);

    res.redirect('/');
});

router.get('/like/:id', async (req,res)=> {
    await cubeService.likeCubeById(req.params.id);

    res.redirect('/');
});

router.get('/edit/:id', async (req,res)=> {
    //May be replaced so you can get your difficultyLevel filled with the cube you are editing
    let cube = await cubeService.getCubeById(req.params.id);

    res.render('create', {cube : cube});
});

router.post('/edit/:id', async (req,res)=> {
    let cubeObj = {
        name : req.body.name,
        description : req.body.description,
        imgPath : req.body.imageUrl,
        difficultyLevel : req.body.difficultyLevel,
        likes : 0
    }

    await cubeService.editCubeById(req.params.id,cubeObj);

    res.redirect('/');
});

exports.cubeController = router;