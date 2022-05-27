const { cubeController } = require("./controllers/cubeController");
const { homeController } = require("./controllers/homeController");

const router = require("express").Router();

router.use('/', homeController);
router.use('/cube' , cubeController);

exports.router = router;