const router = require('express').Router();
const  { cubeService }  = require('../services/cubeService');


router.get('/',async (req,res)=> {
    let {search,from,to} = req.query;

    let token = req.cookies['session'];

    if(token) {
        let cubes = await cubeService.getAll(search,from,to);

        let authorizedCubes = [];
        let unAuthorizedCubes = [];

        for (let cube of cubes) {
            if(cube.user == req.decodedToken._id) {
                authorizedCubes.push(cube);
            } else {
                unAuthorizedCubes.push(cube);
            }
        }

        res.render('index',{unAuthorizedCubes : unAuthorizedCubes,token : req.decodedToken, authorizedCubes : authorizedCubes});
    } else {
            let unAuthorizedCubes = await cubeService.getAll();

            res.render('index',{layout : 'guestMain',unAuthorizedCubes : unAuthorizedCubes});
    }
}); 

router.get('/about',(req,res)=> {
    let token = req.cookies['session'];
    
    if(token) {
        res.render('about');
    } else {
        res.render('about', {layout : 'guestMain'})
    }
    
}); 

exports.homeController = router;