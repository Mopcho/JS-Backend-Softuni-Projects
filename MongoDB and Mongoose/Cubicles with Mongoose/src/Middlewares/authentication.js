const jwt = require('jsonwebtoken');
const secret = 'MySecret123456';


async function verifyAndAttachToken(req,res,next) {
    let token =  req.cookies['session'];

    if(token) {
        jwt.verify(token,secret,(err,decodedToken)=> {
            if(err) {
                //Handle error
                res.status(403).send('Invalid Token');
            }
    
            req.decodedToken = decodedToken;
        });
        next();
    } else {
        next();
    }
}

module.exports = {
    verifyAndAttachToken
}