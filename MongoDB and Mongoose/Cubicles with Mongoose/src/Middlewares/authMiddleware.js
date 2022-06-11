const jwt = require('jsonwebtoken');
const secret = 'MySecret123456';

const util = require('node:util');
const { constants } = require('../configs/constants');

let jwtVerify = util.promisify(jwt.verify);

exports.auth = async (req,res,next) => {
    let token = req.cookies[constants.session];

    if(token) {
        try {
            let decodedToken = await jwtVerify(token,secret);

            res.locals.user = decodedToken;
            req.user = decodedToken;
        } catch (error) {
            console.log(error);
            return res.redirect('/404');
        }
    }

    next();
}

exports.isAuth = (req,res,next) => {
    if(!req.user) {
        res.render('404');
    }
    
    next();
}