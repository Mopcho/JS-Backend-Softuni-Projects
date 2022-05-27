const fs = require('fs/promises');

async function getAll() {
    let allCubes = await fs.readFile('./src/cubes.json',{encoding:'utf-8'});
    
    return allCubes;
}

async function getCube(id) {
    let allCubes = await fs.readFile('./src/cubes.json',{encoding:'utf-8'});

    allCubes = JSON.parse(allCubes);
    
    let cube = allCubes.find(cube => cube.id == id);

    return cube;
}

exports.cubeService = {
    getAll,
    getCube
}