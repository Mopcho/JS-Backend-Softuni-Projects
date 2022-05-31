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

async function getCubeById(id) {
    let cube = await Cube.findById(id).lean();

    return cube;
}

async function likeCubeById(id) {
    await Cube.findByIdAndUpdate(id,{ $inc: { likes : 1 } });
}

async function searchByNameAndDiff(name = '',fromI = 0,toI = 7) {
    let from;
    let to;

    if (fromI == '') {
        from = 0;
    } else {
        from = Number(fromI) - 1;
    }

    if(toI == '') {
        to = 7;
    } else {
        to = Number(toI) + 1;
    }

    let cubes = await Cube.find({ "name": { "$regex": name, "$options": "i" } }).where("difficultyLevel").lt(to).gt(from).lean();

    return cubes;
}

async function editCubeById(id,cube) {
    console.log(cube);

    await Cube.findByIdAndUpdate(id, {name : cube.name, difficultyLevel : cube.difficultyLevel , imgPath : cube.imgPath, description: cube.description});
}

exports.cubeService = {
    postCube,
    getAll,
    getCubeById,
    likeCubeById,
    searchByNameAndDiff,
    editCubeById
}