const router = require('express').Router();

router.get('/',(req,res)=> {
    res.render('home');
})

exports.homeController = router;