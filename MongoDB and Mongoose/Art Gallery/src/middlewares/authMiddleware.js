let jwt = require('jsonwebtoken');

const util = require('node:util');
const { constants } = require('../configs/constants');

let jwtVerify = util.promisify(jwt.verify);

exports.isAuth = (req,res,next) => {
    if (!req.user) {
        return res.render('404');
    }

    next();
}

exports.auth = async (req,res,next) => {
    let token = req.cookies[constants.session];

    if(token) {
        try {
            let decodedToken = await jwtVerify(token,constants.secret);

            res.locals.user = decodedToken;
            req.user = decodedToken;
        } catch (error) {
            console.log(error);
            return res.render('404');
        }
    }

    next();
}