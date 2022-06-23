const { isAuth, auth } = require('../middlewares/authMiddleware');
const publicationsService = require('../services/publicationsService');

const router = require('express').Router();

router.get('/',async (req,res)=> {
    let publications = await publicationsService.getAll();

    res.render('gallery',{publications : publications});
});

router.get('/create',auth,isAuth,(req,res)=> {
    res.render('create');
});

router.post('/create',auth,isAuth,async (req,res,next)=> {
    try {
        await publicationsService.create(req.body);

        res.redirect('/publications');
    } catch(err) {
        next(err);
    }
});

router.get('/edit',auth,isAuth,(req,res)=> {
    res.render('edit');
});

router.get('/details',(req,res)=> {
    res.render('details');
});

exports.publicationsController = router;