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
        await publicationsService.create(req.body,req.user);

        res.redirect('/publications');
    } catch(err) {
        next(err);
    }
});

router.get('/edit',auth,isAuth,(req,res)=> {
    res.render('edit');
});

router.get('/details/:publicationId',async (req,res,next)=> {
    try {
        let publication = await publicationsService.getById(req.params);

        res.render('details', {publication});
    } catch(err) {
        next(err);
    }
});

exports.publicationsController = router;