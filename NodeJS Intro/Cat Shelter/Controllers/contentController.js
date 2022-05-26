const fs = require('fs');

function contentController(req,res,url) {
    fs.readFile(`.${url}`, 'utf8' ,function (err,data) {
        if (err) {
            throw new Error(err);
        }

        res.write(data);

        res.end();
    });
}

module.exports = {
    contentController
}