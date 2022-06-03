const { Accessory } = require("../Models/Accessory");
const { Cube } = require("../Models/Cube");

async function createAccessory(accessoryObj) {
    let accessory = new Accessory({
        name : accessoryObj.name, 
        description : accessoryObj.description,
        imgPath : accessoryObj.imgPath,
    })

    await accessory.save();
}

async function getAll() {
    let allAccessories = await Accessory.find().lean();

    return allAccessories;
}

async function filterOut(accessoriesArr) {
    //Filter this cube's accessories out of the request
    let accessories = await Accessory.find({ "_id" : {$nin : accessoriesArr}}).lean();

    return accessories;
}

async function getById(id) {
    let accessory = await Accessory.findById(id).lean();

    return accessory;
}

async function editAceessoryById(id,accessory) {
    await Accessory.findByIdAndUpdate(id, {
        name : accessory.name, 
        imgPath : accessory.imgPath, 
        description: accessory.description, 
        cubes : accessory.cubes
    });
}

async function getAccessories(accessoriesArr) {
    let accessories = await Accessory.find({"_id" : {$in : accessoriesArr}}).lean();

    return accessories;
}

async function attachAccessory(cubeId , accessoryId) {
    const cube = await Cube.findById(cubeId);
    const accessory = await Accessory.findById(accessoryId);

    cube.accessories.push(accessory);
    accessory.cubes.push(cube);

    await cube.save();
    await accessory.save();

    return cube;
}

exports.accessoryService = {
    createAccessory,
    getAll,
    filterOut,
    getById,
    editAceessoryById,
    getAccessories,
    attachAccessory
}