const fs = require('fs/promises');

async function addBreedController(req,res) {
    let data = await fs.readFile('./views/addBreed.html', 'utf8');

    res.write(data);
    
    res.end();
}

module.exports = {
    addBreedController
}