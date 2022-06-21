const router = require('express').Router();
const userService = require('../services/userService');

router.get('/login',(req,res)=> {
    res.render('login');
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

exports.userController = router;