const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { accessoryService } = require('../services/accessoryService');
const {cubeService }= require('../services/cubeService');
const secret = 'MySecret123456';

router.get('/create',(req,res)=> {
    res.render('create');
}); 

router.get('/details/:id',async (req,res)=> {
    let cube = await cubeService.getCubeWithAccessoriesById(req.params.id);

    res.render('details', {cube : cube});
}); 

router.post('/create',(req,res)=> {
    jwt.verify(req.cookies['session'],secret,async (err,decodedToken)=> {
        if(err) {
            res.status(400).send('Invalid Token');
        }

        let cubeObj = {
            name : req.body.name,
            description : req.body.description,
            imgPath : req.body.imageUrl,
            difficultyLevel : req.body.difficultyLevel,
            user : decodedToken._id,
            likes : 0,
            accessories : []
        }

        await cubeService.postCube(cubeObj,decodedToken.email);

        res.redirect('/');
    });
});

router.get('/like/:id', async (req,res)=> {
    await cubeService.likeCubeById(req.params.id);

    res.redirect('/');
});

router.get('/edit/:id', async (req,res)=> {
    let cube = await cubeService.getCubeById(req.params.id);
 
    res.render('create', {cube : cube})
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