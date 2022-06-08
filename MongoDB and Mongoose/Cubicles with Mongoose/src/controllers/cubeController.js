const router = require('express').Router();
const jwt = require('jsonwebtoken');
const {cubeService }= require('../services/cubeService');
const secret = 'MySecret123456';

router.get('/create',(req,res)=> {
    res.render('create');
}); 

router.get('/details/:id',async (req,res)=> {
    let cube = await cubeService.getCubeWithAccessoriesById(req.params.id);

    res.render('details', {cube : cube});
}); 

router.post('/create',async (req,res)=> {
        let cubeObj = {
            name : req.body.name,
            description : req.body.description,
            imgPath : req.body.imageUrl,
            difficultyLevel : req.body.difficultyLevel,
            user : req.decodedToken._id,
            accessories : []
        }

        await cubeService.postCube(cubeObj,req.decodedToken.email);

        res.redirect('/');
});

router.get('/like/:id',async  (req,res)=> {
    let cube = await cubeService.getCubeById(req.params.id);

    let isIncluded = false;
    for (let x of cube.likes) {
        if(x._id.toString().includes(req.decodedToken._id.toString())) {
            isIncluded = true;
        }
    }

    if(req.decodedToken._id != cube.user && !isIncluded) {
        await cubeService.likeCubeById(req.params.id , req.decodedToken._id);
        res.redirect('/');
    } else {
        res.send('Cant like this cube!');
    }

});

router.get('/edit/:id', async (req,res)=> {
    let cube = await cubeService.getCubeById(req.params.id);
 
    res.render('edit', {cube : cube})
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

router.get('/delete/:id',async (req,res)=> {
    let token = req.cookies['session'];

    let cube = await cubeService.getCubeById(req.params.id);
    
    if(token) {
        res.render('delete',{cube : cube});
    } else {
        res.redirect('/');
    }
});

router.post('/delete/:id', async (req,res)=> {
    await cubeService.deleteCubeById(req.params.id);

    res.redirect('/');
});

exports.cubeController = router;