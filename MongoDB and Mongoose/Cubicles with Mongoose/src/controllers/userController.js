const router = require('express').Router();
const { constants } = require('../configs/constants');
const { endpoints } = require('../configs/endpoints');
const  { userService }  = require('../services/userService');
const { body, validationResult } = require('express-validator');

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

router.get('/register',(req,res)=> {
    res.render(endpoints.userRegister);
});

router.post('/register',
body('username','Invalid Username').isLength({min : 5}).matches(/([A-Za-z0-9])/g),
body('password','Invalid Password').isLength({min : 8}).matches(/([A-Za-z0-9])/g),
body('email','Invalid Username').isEmail(),
body('repeatPassword','Passwords dont match').custom((value,{req,loc,path})=> {
    if(value!==req.body.password) {
        throw new Error('Password dont match!');
    } else {
        return value;
    }
}),
async (req,res)=> {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;

    const errors = validationResult(req);

    console.log(errors);
    if(!errors.isEmpty()) {
        return res.render(endpoints.userRegister,{errorsMsg : errors.errors[0].msg});
    }

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

