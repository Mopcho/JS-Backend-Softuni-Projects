const fs = require('fs/promises');
const qs = require('querystring');

function addCatBreed(req,res) {
    let body = '';
    let query = '';

    req.on('data', (data)=> {
        body += data;
    });

    req.on('end', async () => {
        query = qs.parse(body);

        let catBreedsRaw = await fs.readFile('./catBreedsDB.json');
        
        let catBreeds = JSON.parse(catBreedsRaw);
        
        if(catBreeds.includes(query.breed)) {
            res.writeHead(301, { Location: '/cats/add-breed' });
            res.end();
            return;
        }

        catBreeds.push(query.breed);

        await fs.writeFile('./catBreedsDB.json',JSON.stringify(catBreeds));

        res.writeHead(301, { Location: '/cats/add-breed' });

        res.end();
    });
}

module.exports = {
    addCatBreed
}

//Kakvo 6te stane ako e taka :
/*
async function addCatBreed(req,res) {
    let body = '';
    let query = '';
    let catBreedsRaw = await fs.readFile('./catBreedsDB.json');

    req.on('data', (data)=> {
        body += data;
    });

    req.on('end', () => {
        query = qs.parse(body);

        
        let catBreeds = JSON.parse(catBreedsRaw);
        
        catBreeds.push();
    });
}
*/