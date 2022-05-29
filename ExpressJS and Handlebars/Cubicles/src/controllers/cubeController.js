const router = require('express').Router();
const {cubeService} = require('../services/cubeService');

router.get('/create', (req,res)=> {
    res.render('create');
});

router.get('/details/:id', async (req,res)=> {
    let cube = await  cubeService.getCube(req.params.id);

    res.render('details',{cube : cube});
}); 

router.post('/create',async (req,res)=> {
    let id = Math.floor(Math.random() * 100);

    let cubeObj = {
        name : req.body.name,
        description : req.body.description,
        img : req.body.imageUrl,
        difficulty : req.body.difficultyLevel,
        likes : 0,
        id
    }

    await cubeService.addCube(cubeObj);

    res.redirect('/');
});

router.get('/like/:id',async  (req,res)=> {
    let cube = await cubeService.getCube(req.params.id);

    cube.likes++;

    await cubeService.reRenderCube(cube);

    res.redirect('/');
})

exports.cubeController = router;