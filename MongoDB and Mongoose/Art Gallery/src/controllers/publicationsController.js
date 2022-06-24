const { isAuth, auth } = require('../middlewares/authMiddleware');
const publicationsService = require('../services/publicationsService');
const userService = require('../services/userService');

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

router.get('/details/:publicationId',auth,async (req,res,next)=> {
    try {
        let publication = await publicationsService.getById(req.params);

        let isOwner = publication.author._id == req.user._id; //Check for ownership
        //Check if publication has been shared by this user already
        let isShared = false;
        for (let x of publication.usersShared) {
            if(x._id.toString().includes(req.user._id.toString())) {
                isShared = true;
            }
        }

        res.render('details', {publication,isShared,isOwner});
    } catch(err) {
        next(err);
    }
});

router.get('/share/:publicationId',auth,isAuth,async (req,res)=> {
    await publicationsService.share(req.params.publicationId,req.user);

    res.redirect('/');
})

exports.publicationsController = router;