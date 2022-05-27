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

async function addCube(cube) {
    let allCubes = await fs.readFile('./src/cubes.json',{encoding:'utf-8'});

    allCubes = JSON.parse(allCubes);

    allCubes.push(cube);

    await fs.writeFile('./src/cubes.json',JSON.stringify(allCubes,null,4));
}

exports.cubeService = {
    getAll,
    getCube,
    addCube
}