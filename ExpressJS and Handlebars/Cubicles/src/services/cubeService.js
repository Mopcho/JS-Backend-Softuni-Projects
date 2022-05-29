const fs = require('fs/promises');

async function getAll() {
    let allCubes = await fs.readFile('./src/cubes.json',{encoding:'utf-8'});
    
    return allCubes;
}

async function getCube(id) {
    let allCubes = await fs.readFile('./src/cubes.json',{encoding:'utf-8'});

    allCubes = JSON.parse(allCubes);
    
    let cube = allCubes.filter(cube => cube.id == id)[0];

    return cube;
}

async function addCube(cube) {
    let allCubes = await fs.readFile('./src/cubes.json',{encoding:'utf-8'});

    allCubes = JSON.parse(allCubes);

    allCubes.push(cube);

    await fs.writeFile('./src/cubes.json',JSON.stringify(allCubes,null,4));
}

async function reRenderCube(cubeToBeRendered) {
    let cubes = await getAll();

    let allCubes = JSON.parse(cubes);

    console.log(cubeToBeRendered.id);

    for (let i=0;i<allCubes.length;i++) {
        console.log(allCubes[i].id);
        console.log(cubeToBeRendered.id);
        if(allCubes[i].id == cubeToBeRendered.id) {
            allCubes[i] = cubeToBeRendered;
        }
    }

    await fs.writeFile('./src/cubes.json',allCubes);
}

exports.cubeService = {
    getAll,
    getCube,
    addCube,
    reRenderCube
}