exports.isAuth = (req,res,next) => {
    if  (!req.user) {
        return res.render('404');
    }

    next();
}