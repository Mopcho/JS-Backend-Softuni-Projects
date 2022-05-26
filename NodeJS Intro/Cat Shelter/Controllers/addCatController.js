const fs = require('fs/promises');

async function addCatController(req,res) {
    let data = await fs.readFile('./views/addCat.html', 'utf8');

    let breeds = await fs.readFile('./catBreedsDB.json');

    breeds = JSON.parse(breeds);

    let html = data.replace('{{options}}', breeds.map(breed => optionTemplate(breed)).join(''));

    res.write(html);

    res.end();
}

module.exports = {
    addCatController
}

let optionTemplate = (value) => `
<option value="${value}">${value}</option>
`;
