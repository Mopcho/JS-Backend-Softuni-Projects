const router = require('express').Router();
const { constants } = require('../configs/constants');
const userService = require('../services/userService');


router.get('/login',(req,res)=> {
    res.render('login');
});

router.post('/login',async (req,res)=> {
    try {
        let token = await userService.loginUser(req.body);
    
        res.cookie(constants.session,token);
    
        res.redirect('/');
    } catch(err) {
        res.render('login',{err});
    }
});

router.get('/register',(req,res)=> {
    res.render('register');
});

router.post('/register',async (req,res)=> {
    try {
        await userService.registerUser(req.body);
    
        res.redirect('/user/login');
    } catch(err) {
        res.render('register',{err});
    }
    
});

router.get('/profile',(req,res)=> {
    res.render('profile');
});

router.get('/logout', (req,res)=> {
    res.clearCookie(constants.session);

    res.redirect('/');
});

exports.userController = router;