const { accessoryController } = require('./controllers/accessoryController');
const { cubeController } = require('./controllers/cubeController');
const { homeController } = require('./controllers/homeController');
const { userController } = require('./controllers/userController');

const router = require('express').Router();

router.use('/', homeController);
router.use('/cube',cubeController);
router.use('/accessory',accessoryController);
router.use('/user',userController);
router.get('*', (req,res)=> {
    res.render('404');
});

module.exports = {
    router
}