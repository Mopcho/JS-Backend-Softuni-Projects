const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
    name : {
        type: String,
        required : [true, 'Name is mandatory !']
    },
    description : {
        type: String,
        required : [true, 'Description is mandatory !'],
        maxlength : [50, 'Too long description !']
    },
    difficultyLevel : {
        type: Number,
        min : [1, 'Difficulty cant be below 1'],
        max : [6, 'Difficulty cant be above 6']
    },
    likes : Number,
    imgPath : {
        type : String,
        validate : {
            validator : function(v) {
                if(v.includes('http')) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    },
    accessories : [{
        type : mongoose.Types.ObjectId,
        ref : 'Accessory'
    }],
    user : {
        type:  mongoose.Types.ObjectId,
        ref : 'User',
        required : true
    }
});

//methods , queries , virtuals , middlewares ( pre , post )
//<------------- Error handling ---------------->

const Cube = mongoose.model('Cube',cubeSchema);

module.exports = {
    Cube
}