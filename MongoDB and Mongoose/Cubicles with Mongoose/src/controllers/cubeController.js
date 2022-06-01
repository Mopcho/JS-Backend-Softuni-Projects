const router = require('express').Router();
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
        likes : 0,
        accessories : []
    }

    await cubeService.postCube(cubeObj);

    res.redirect('/');
});

router.get('/like/:id', async (req,res)=> {
    await cubeService.likeCubeById(req.params.id);

    res.redirect('/');
});

router.get('/edit/:id', async (req,res)=> {
    let cube = await cubeService.getCubeById(req.params.id);

    res.render('create', {cube : cube});

    //May need refactoring so you can remove accessories from a cube 
});

router.post('/edit/:id', async (req,res)=> {
    let cubeObj = {
        name : req.body.name,
        description : req.body.description,
        imgPath : req.body.imageUrl,
        difficultyLevel : req.body.difficultyLevel,
    }

    await cubeService.editCubeById(req.params.id,cubeObj);

    res.redirect('/');
});

exports.cubeController = router;