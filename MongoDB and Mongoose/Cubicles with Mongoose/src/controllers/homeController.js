const router = require('express').Router();
const  { cubeService }  = require('../services/cubeService');
const jwt = require('jsonwebtoken');
const secret = 'MySecret123456';

router.get('/',(req,res)=> {
    let {search,from,to} = req.query;

    let token = req.cookies['session'];

    if(token) {
        jwt.verify(token,secret,async (err,decodedToken)=> {
            if(err) {
                res.status(401).send('Invalid token');
            }

            let cubes = await cubeService.getAll(search,from,to);
        
            res.render('index',{cubes : cubes,token : decodedToken});
        })
    }
}); 

router.get('/about',(req,res)=> {
    res.render('about');
}); 

exports.homeController = router;