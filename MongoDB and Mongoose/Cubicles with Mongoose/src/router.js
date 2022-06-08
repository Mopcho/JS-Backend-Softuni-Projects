const { accessoryController } = require('./controllers/accessoryController');
const { cubeController } = require('./controllers/cubeController');
const { homeController } = require('./controllers/homeController');
const { userController } = require('./controllers/userController');
const { verifyAndAttachToken } = require('./Middlewares/authentication');

const router = require('express').Router();

router.use('/',verifyAndAttachToken, homeController);
router.use('/cube',verifyAndAttachToken,cubeController);
router.use('/accessory',verifyAndAttachToken,accessoryController);
router.use('/user',verifyAndAttachToken,userController);

module.exports = {
    router
}