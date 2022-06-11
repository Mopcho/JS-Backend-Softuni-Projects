const router = require('express').Router();
const { constants } = require('../configs/constants');
const { endpoints } = require('../configs/endpoints');
const  { userService }  = require('../services/userService');

router.get('/login', (req,res)=> {
    res.render(endpoints.userLogin);
});

router.post('/login',async (req,res)=> {
    let email = req.body.email;
    let password = req.body.password;

    let token = await userService.login(email,password);

    if(!token) {
        return res.redirect('/404');
    }

    res.cookie(constants.session,token);
    res.redirect('/');
});

router.get('/register', (req,res)=> {
    res.render(endpoints.userRegister);
});

router.post('/register',async (req,res)=> {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;

    let result = await userService.register({username,email,password});

    if(result) {
        return res.redirect('/404');
    }

    res.redirect('/user/login');
});

router.get('/logout' , async (req,res)=> {
    res.clearCookie('session');

    res.redirect('/');
});

exports.userController = router;

