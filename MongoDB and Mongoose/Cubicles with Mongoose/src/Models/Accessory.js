const mongoose = require('mongoose');

const accessorySchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    imgPath : {
        type : String,
        validate : {
            validator : function(v) {
                return v.contains('http');
            }
        }
    },
    description : {
        type: String,
        required : true,
        maxlength : [50, 'Too long description !']
    },
    cubes : [{
        type: mongoose.SchemaTypes.ObjectId,
        ref : "Cube"
    }]
});

//methods , queries , virtuals , middlewares ( pre , post )

const Accessory = mongoose.model('Accessory',accessorySchema);

module.exports = {
    Accessory
}