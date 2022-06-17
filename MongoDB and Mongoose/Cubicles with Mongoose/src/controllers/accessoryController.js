const router = require('express').Router();
const {accessoryService }= require('../services/accessoryService');
const { cubeService } = require('../services/cubeService');
const {isAuth} = require('../Middlewares/authMiddleware');
const { endpoints } = require('../configs/endpoints');

router.get('/create',isAuth, (req,res) => {
    res.render(endpoints.accessoryCreate);
});

router.post('/create',isAuth, async (req,res,next)=> {
    let accessoryObj = {
        name : req.body.name,
        imgPath : req.body.imageUrl,
        description : req.body.description,
        cubes : []
    }

    try {
        await accessoryService.createAccessory(accessoryObj);

        res.redirect('/');
    } catch(err) {
        next(err,req,res);
    }
});

router.get('/attach/:id',isAuth,async  (req,res) => {
    let cube = await cubeService.getCubeById(req.params.id);
    let accessories = await accessoryService.filterOut(cube.accessories); 

    res.render(endpoints.accessoryAttach, {accessories : accessories, cube : cube});
});

router.post('/attach/:id',isAuth, async (req,res)=> {
    await accessoryService.attachAccessory(req.params.id,req.body.accessory);

    res.redirect('/');
});

exports.accessoryController = router;