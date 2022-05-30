const { Cube } = require("../Models/Cube")

async function postCube(cube) {
    let newCube = new Cube(
        {
        name : cube.name, 
        description : cube.description,
        difficultyLevel : cube.difficultyLevel,
        imgPath : cube.imgPath,
        likes : cube.likes
        });

    await newCube.save();
}

async function getAll() {
    let allCubes = await Cube.find().lean();

    return allCubes;
}

exports.cubeService = {
    postCube,
    getAll
}