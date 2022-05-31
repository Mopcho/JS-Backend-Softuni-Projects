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

exports.cubeController = router;