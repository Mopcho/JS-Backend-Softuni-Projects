const mongoose = require("mongoose");
const { Cube } = require("../Models/Cube")
const { User } = require("../Models/User")

async function postCube(cube,userEmail) {
    let newCube = new Cube(
        {
        _id : new mongoose.Types.ObjectId(),
        name : cube.name, 
        description : cube.description,
        difficultyLevel : cube.difficultyLevel,
        imgPath : cube.imgPath,
        user : cube.user,
        accessories : cube.accessories
        });

    let user = await User.findOne({email : userEmail});

    user.cubes.push(newCube._id);

    await user.save();

    await newCube.save();
}

async function getAll(nameI,fromI,toI) {
    let from = fromI == '' || fromI ==undefined? 0 : Number(fromI);
    let to = toI == '' || toI == undefined? 6 : Number(toI);
    let name = nameI == undefined? '' : nameI;

    let cubes = await Cube.find({ "name": { "$regex": name, "$options": "i" } }).where("difficultyLevel").lte(to).gte(from).lean();

    return cubes;
}

async function getCubeById(id) {
    let cube = await Cube.findById(id).lean();

    return cube;
}

async function likeCubeById(id,userId) {
    let cube = await Cube.findOne({_id : id});

    cube.likes.push(userId);

    cube.save();
}

async function editCubeById(id,cube) {
    await Cube.findByIdAndUpdate(id, {
        name : cube.name, 
        difficultyLevel : cube.difficultyLevel , 
        imgPath : cube.imgPath, 
        description: cube.description, 
        accessories : cube.accessories });

    //May need refactoring so you dont have to edit this all the time you add a new property to a model
}

async function getCubeWithAccessoriesById(cubeId) {
    let cube = await Cube.findById(cubeId).populate('accessories').lean();

    return cube;
}

async function deleteCubeById(cubeId) {
    await Cube.deleteOne({_id: cubeId});
}

exports.cubeService = {
    postCube,
    getAll,
    getCubeById,
    likeCubeById,
    editCubeById,
    getCubeWithAccessoriesById,
    deleteCubeById
}