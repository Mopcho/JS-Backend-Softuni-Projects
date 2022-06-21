const { homeController } = require('./controllers/homeController');
const { publicationsController } = require('./controllers/publicationsController');
const { userController } = require('./controllers/userController');

const router = require('express').Router();

router.use('/user',userController);
router.use('/publications', publicationsController);
router.use('/', homeController);

exports.router = router;