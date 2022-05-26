const fs = require('fs');

function editCatController(req,res) {
    fs.readFile('./views/editCat.html', 'utf8' ,function (err,data) {
        if (err) {
            throw new Error(err);
        }

        res.write(data);

        res.end();
    });
}

module.exports = {
    editCatController
}