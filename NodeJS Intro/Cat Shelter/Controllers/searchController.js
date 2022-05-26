const fs = require('fs/promises');
const url = require('url');

async function searchController(req,res) {
    let html =  await fs.readFile('./views/home/index.html', 'utf8');

    let cats = await fs.readFile('./catsDB.json', 'utf-8');

    cats = JSON.parse(cats);

    let myUrl = url.parse(req.url);

    let query = myUrl.query.split('=')[1];

    let htmlResult = html.replace('{{cats}}', cats.map(cat => cat.name.includes(query) ? catTemplate(cat) : '').join(''));

    res.write(htmlResult);

    res.end();
}

module.exports = {
    searchController
}

let catTemplate = (cat) => `
<li>
<img src="${cat.img}" alt="Black Cat">
<h3>${cat.name}</h3>
<p><span>Breed: </span>${cat.breed}</p>
<p><span>Description: </span>${cat.description}</p>
<ul class="buttons">
    <li class="btn edit"><a href="/cats/edit-cat?${cat.id}">Change Info</a></li>
    <li class="btn delete"><a href="/cats/delete-cat?${cat.id}">New Home</a></li>
</ul>
</li>
`;
