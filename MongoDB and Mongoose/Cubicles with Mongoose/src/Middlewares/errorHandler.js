exports.errorHandler = (errMsg,req,res,next) => {
    console.log(`Error Handle : ${errMsg}`);

    res.render('404',{errMsg});
}