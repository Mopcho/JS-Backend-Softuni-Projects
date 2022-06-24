const { auth } = require('../middlewares/authMiddleware');

const router = require('express').Router();

router.get('/',auth,(req,res)=> {
    res.render('home');
})

exports.homeController = router;