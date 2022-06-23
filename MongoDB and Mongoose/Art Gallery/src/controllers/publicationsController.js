const { isAuth, auth } = require('../middlewares/authMiddleware');

const router = require('express').Router();

router.get('/',(req,res)=> {
    res.render('gallery');
});

router.get('/create',auth,isAuth,(req,res)=> {
    res.render('create');
});

router.get('/edit',isAuth,(req,res)=> {
    res.render('edit');
});

router.get('/details',(req,res)=> {
    res.render('details');
});

exports.publicationsController = router;