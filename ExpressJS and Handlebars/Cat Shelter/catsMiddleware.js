let cats = [

]

function catMiddleware(req,res,next) {
    req.cats = cats;

    next();
}

module.exports = {
    catMiddleware
}