const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
    name : String,
    description : String,
    difficultyLevel : Number,
    likes : Number,
    imgPath : String
});

const Cube = mongoose.model('Cube',cubeSchema);

module.exports = {
    Cube
}