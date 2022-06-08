const router = require('express').Router();
const bcrypt = require('bcrypt');
const  { userService }  = require('../services/userService');

const jwt = require('jsonwebtoken');
const secret = 'MySecret123456';

router.get('/login', (req,res)=> {
    if(token) {
        res.render('login');
    } else {
        res.render('login', {layout : 'guestMain'})
    }
});

router.post('/login',async (req,res)=> {
    let email = req.body.email;
    let password = req.body.password;

    if (password == '' || email == '') {
        throw new Error('All fields must be filled!');
    }
    
    //Check if there is a match of email
    let user = await userService.getUser(email);

    const isAuthenticated = await bcrypt.compare(password,user.password);

    if(isAuthenticated) {
        const token = jwt.sign({username : user.username,email: user.email, _id : user._id},secret,{expiresIn: '2d'});

        res.cookie('session',token);
        res.redirect('/');
    } else {
        res.send('Invalid password or email!');
    }
});

router.get('/register', (req,res)=> {
    if(token) {
        res.render('register');
    } else {
        res.render('register', {layout : 'guestMain'})
    }
});

router.post('/register',async (req,res)=> {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;

    if (username == '' || password == '' || email == '') {
        throw new Error('All fields must be filled!');
    }

    const hashedPassword =  await bcrypt.hash(password,10);

    await userService.saveUser({username,email,password : hashedPassword});

    res.redirect('/user/login');
});


exports.userController = router;