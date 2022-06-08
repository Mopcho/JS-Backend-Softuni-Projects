const router = require('express').Router();
const  { cubeService }  = require('../services/cubeService');
const jwt = require('jsonwebtoken');
const secret = 'MySecret123456';

router.get('/',async (req,res)=> {
    let {search,from,to} = req.query;

    let token = req.cookies['session'];

    if(token) {
        jwt.verify(token,secret,async (err,decodedToken)=> {
            if(err) {
                res.status(401).send('Invalid token');
            }

            let cubes = await cubeService.getAll(search,from,to);

            let authorizedCubes = [];
            let unAuthorizedCubes = [];

            for (let cube of cubes) {
                if(cube.user == decodedToken._id) {
                    authorizedCubes.push(cube);
                } else {
                    unAuthorizedCubes.push(cube);
                }
            }

            res.render('index',{unAuthorizedCubes : unAuthorizedCubes,token : decodedToken, authorizedCubes : authorizedCubes});
        })
    } else {
            let unAuthorizedCubes = await cubeService.getAll();

            res.render('index',{layout : 'guestMain',unAuthorizedCubes : unAuthorizedCubes});
    }
}); 

router.get('/about',(req,res)=> {
        res.render('about', {layout : 'guestMain'})
}); 

exports.homeController = router;