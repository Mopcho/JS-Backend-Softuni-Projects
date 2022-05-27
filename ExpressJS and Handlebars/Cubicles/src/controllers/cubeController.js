const router = require('express').Router();
const {cubeService} = require('../services/cubeService');

router.get('/create', (req,res)=> {
    res.render('create');
});

router.get('/details/:id', async (req,res)=> {
    let cube = await  cubeService.getCube(req.params.id);

    console.log(cube);

    res.render('details',{cube : cube});
}); 

exports.cubeController = router;