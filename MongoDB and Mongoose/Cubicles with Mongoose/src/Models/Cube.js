const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
    name : {
        type: String,
        required : true
    },
    description : {
        type: String,
        required : true,
        maxlength : [50, 'Too long description !']
    },
    difficultyLevel : {
        type: Number,
        min : 1,
        max : 6
    },
    likes : Number,
    imgPath : {
        type : String,
        validate : {
            validator : function(v) {
                return v.includes('http');
            }
        }
    },
    accessories : [{
        type : mongoose.SchemaTypes.ObjectId,
        ref : 'Accessory'
    }]
});

//methods , queries , virtuals , middlewares ( pre , post )

const Cube = mongoose.model('Cube',cubeSchema);

module.exports = {
    Cube
}