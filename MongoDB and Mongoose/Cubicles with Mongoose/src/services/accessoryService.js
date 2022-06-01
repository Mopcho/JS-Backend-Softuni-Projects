const { Accessory } = require("../Models/Accessory");

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


exports.accessoryService = {
    createAccessory,
    getAll,
    filterOut,
    getById,
    editAceessoryById
}