const router = require('express').Router();
const {cubeService }= require('../services/cubeService');

router.get('/create',(req,res)=> {
    res.render('create');
}); 

router.get('/details/:id',(req,res)=> {
    //Get specific cube by ID and render it

    res.render('details');
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