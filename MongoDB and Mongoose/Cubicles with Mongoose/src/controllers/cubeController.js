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
            accessories : []
        }

        await cubeService.postCube(cubeObj,decodedToken.email);

        res.redirect('/');
    });
});

router.get('/like/:id', (req,res)=> {
    const token = req.cookies['session'];

    jwt.verify(token,secret,async (err,decodedToken)=> {
        if(err) {
            res.statusCode(400).send('Invalid Token');
        }

        let cube = await cubeService.getCubeById(req.params.id);

        if(decodedToken._id != cube.user && cube.likes.includes(decodedToken._id)) {
            await cubeService.likeCubeById(req.params.id,decodedToken._id);
            res.redirect('/');
        } else {
            res.send('Cant like this cube!');
        }

    });
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

router.get('/delete',(req,res)=> {
    let token = req.cookies['session'];
    
    if(token) {
        res.render('delete');
    } else {
        res.redirect('/');
    }
});

router.post('/delete', (req,res)=> {

});

exports.cubeController = router;