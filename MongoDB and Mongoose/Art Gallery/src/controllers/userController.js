const router = require('express').Router();

router.get('/login',(req,res)=> {
    res.render('login');
});

router.get('/register',(req,res)=> {
    res.render('register');
});

router.post('/register',(req,res)=> {
    let {username,password,repeatPassword,address} = req.body;

    
});

router.get('/profile',(req,res)=> {
    res.render('profile');
});

exports.userController = router;