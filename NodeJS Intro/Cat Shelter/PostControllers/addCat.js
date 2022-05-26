const fs = require('fs/promises');
const qs = require('querystring');

function addCat(req,res) {
    let body = '';
    let query = '';

    req.on('data', (data)=> {
        body += data;
    });

    req.on('end', async () => {
        query = qs.parse(body);

        //Somehow parse a fucking image

        let id = Math.floor(Math.random() * 10000);

        let catsRaw = await fs.readFile('./catsDB.json','utf-8');
        let cats = JSON.parse(catsRaw);

        cats.push({name,description,img,breed,id});

        await fs.writeFile('./catsDB.json',JSON.stringify(cats));

        res.writeHead(301, { Location: '/home' });

        res.end();
    });
}

module.exports = {
    addCat
}
