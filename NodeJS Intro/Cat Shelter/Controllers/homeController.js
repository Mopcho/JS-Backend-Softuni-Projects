const fs = require('fs/promises');

async function homeController(req,res) {
    let html =  await fs.readFile('./views/home/index.html', 'utf8');

    let cats = await fs.readFile('./catsDB.json', 'utf-8');

    cats = JSON.parse(cats);

    let htmlResult = html.replace('{{cats}}', cats.map(cat => catTemplate(cat)).join(''));

    res.write(htmlResult);

    res.end();
}

module.exports = {
    homeController
}

let catTemplate = (cat) => `
<li>
<img src="${cat.img}" alt="Black Cat">
<h3>${cat.name}</h3>
<p><span>Breed: </span>${cat.breed}</p>
<p><span>Description: </span>${cat.description}</p>
<ul class="buttons">
    <li class="btn edit"><a href="/cats/edit-cat?id=${cat.id}">Change Info</a></li>
    <li class="btn delete"><a href="/cats/delete-cat?id=${cat.id}">New Home</a></li>
</ul>
</li>
`;
