const mongoose = require('mongoose');

const accessorySchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true,'Name is required!']
    },
    imgPath : {
        type : String,
        validate : {
            validator : function(v) {
                if(v.includes('http')) {
                    return true;
                } else {
                    throw new Error('Image must be a valid link!')
                }
            }
        }
    },
    description : {
        type: String,
        required : [true, 'Description is required!'],
        maxlength : [50, 'Too long description !']
    },
    cubes : [{
        type: mongoose.Types.ObjectId,
        ref : "Cube"
    }]
});

//methods , queries , virtuals , middlewares ( pre , post )

const Accessory = mongoose.model('Accessory',accessorySchema);

module.exports = {
    Accessory
}