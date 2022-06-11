const router = require('express').Router();
const {cubeService }= require('../services/cubeService');
const {isAuth} = require('../Middlewares/authMiddleware');
const { endpoints } = require('../configs/endpoints');

router.get('/create', isAuth ,(req,res)=> {
    res.render(endpoints.cubeCreate);
}); 

router.get('/details/:id',async (req,res)=> {
    let cube = await cubeService.getCubeWithAccessoriesById(req.params.id);

    const isOwner = req.user?._id == cube.user;

    res.render(endpoints.cubeDetails, {cube : cube, isOwner});
}); 

router.post('/create',isAuth,async (req,res)=> {
        let cubeObj = {
            name : req.body.name,
            description : req.body.description,
            imgPath : req.body.imageUrl,
            difficultyLevel : req.body.difficultyLevel,
            user : req.user._id,
            accessories : []
        }

        await cubeService.postCube(cubeObj,req.user.email);

        res.redirect('/');
});

router.get('/like/:id',isAuth,async  (req,res)=> {
    let cube = await cubeService.getCubeById(req.params.id);

    let isIncluded = false;
    for (let x of cube.likes) {
        if(x._id.toString().includes(req.decodedToken._id.toString())) {
            isIncluded = true;
        }
    }

    if(req.user._id != cube.user && !isIncluded) {
        await cubeService.likeCubeById(req.params.id , req.user._id);
        res.redirect('/');
    } else {
        res.send('Cant like this cube!');
    }
});

router.get('/edit/:id',isAuth, async (req,res)=> {
    let cube = await cubeService.getCubeById(req.params.id);
 
    res.render(endpoints.cubeEdit, {cube : cube})
});

router.post('/edit/:id',isAuth, async (req,res)=> {
    let cubeObj = {
        name : req.body.name,
        description : req.body.description,
        imgPath : req.body.imageUrl,
        difficultyLevel : req.body.difficultyLevel,
    }

    await cubeService.editCubeById(req.params.id,cubeObj);

    res.redirect('/');
});

router.get('/delete/:id',isAuth,async (req,res)=> {
    let cube = await cubeService.getCubeById(req.params.id);

    res.render(endpoints.cubeDelete,{cube : cube});
});

router.post('/delete/:id',isAuth, async (req,res)=> {
    await cubeService.deleteCubeById(req.params.id);

    res.redirect('/');
});

exports.cubeController = router;