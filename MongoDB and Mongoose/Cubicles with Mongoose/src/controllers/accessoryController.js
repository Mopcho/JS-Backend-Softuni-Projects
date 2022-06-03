const router = require('express').Router();
const {accessoryService }= require('../services/accessoryService');
const { cubeService } = require('../services/cubeService');

router.get('/create', (req,res) => {
    res.render('createAccessory');
});

router.post('/create', async (req,res)=> {
    let accessoryObj = {
        name : req.body.name,
        imgPath : req.body.imageUrl,
        description : req.body.description,
        cubes : []
    }

    await accessoryService.createAccessory(accessoryObj);

    res.redirect('/');
});

router.get('/attach/:id',async  (req,res) => {
    let cube = await cubeService.getCubeById(req.params.id);
    let accessories = await accessoryService.filterOut(cube.accessories); 

    res.render('attachAccessory', {accessories : accessories, cube : cube});
});

router.post('/attach/:id', async (req,res)=> {
    await accessoryService.attachAccessory(req.params.id,req.body.accessory);

    res.redirect('/');
});

exports.accessoryController = router;