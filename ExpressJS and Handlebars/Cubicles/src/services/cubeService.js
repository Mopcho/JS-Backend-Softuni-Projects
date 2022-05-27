const fs = require('fs/promises');

async function getAll() {
    let allCubes = await fs.readFile('./src/cubes.json',{encoding:'utf-8'});
    
    return allCubes;
}

exports.cubeService = {
    getAll
}