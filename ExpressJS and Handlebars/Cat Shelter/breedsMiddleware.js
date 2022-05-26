let breeds = [];

function breedsMiddleware(req,res,next) {
    req.breeds = breeds;

    next();
}

module.exports = {
    breedsMiddleware
}