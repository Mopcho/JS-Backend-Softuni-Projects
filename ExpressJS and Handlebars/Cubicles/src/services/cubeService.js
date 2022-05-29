const fs = require('fs/promises');

async function getAll() {
    let cubes = await fs.readFile('./src/cubes.json',{encoding:'utf-8'});

    let allCubes = JSON.parse(cubes);
    
    return allCubes;
}

async function getCube(id) {
    let allCubes = await getAll();
    
    let cube = allCubes.filter(cube => cube.id == id)[0];

    return cube;
}

async function addCube(cube) {
    let allCubes = await getAll();

    allCubes.push(cube);

    await fs.writeFile('./src/cubes.json',JSON.stringify(allCubes,null,4));
}

async function reRenderCube(cubeToBeRendered) {
    let allCubes = await getAll();

    console.log(allCubes)
    console.log(cubeToBeRendered)

    for (let i=0;i<allCubes.length;i++) {
        if(allCubes[i].id == cubeToBeRendered.id) {
            allCubes[i] = cubeToBeRendered;
        }
    }

    await fs.writeFile('./src/cubes.json',JSON.stringify(allCubes,null,4));
}

exports.cubeService = {
    getAll,
    getCube,
    addCube,
    reRenderCube
}