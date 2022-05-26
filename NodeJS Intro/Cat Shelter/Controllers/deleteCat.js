const fs = require('fs/promises');
const url = require('url');

async function deleteCat(req,res) {
    let requestUrl = url.parse(req.url);

    let query = requestUrl.query;

    let catId = query.split('=')[1];

    let catsRaw = await fs.readFile('./catsDB.json','utf-8');

    let cats = JSON.parse(catsRaw);

    let newCats = [];

    for (let cat of cats) {
        if(catId != cat.id) {
            newCats.push(cat);
        }
    }

    await fs.writeFile('./catsDB.json',JSON.stringify(newCats));

    console.log(`Deleted Cat with Id : ${catId}`);

    res.writeHead(301, { Location: '/home' });

    res.end();
}

module.exports = {
    deleteCat
}