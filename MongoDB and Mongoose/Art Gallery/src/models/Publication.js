const mongoose = require('mongoose');

const publicationSchema = new mongoose.Schema({
    title : {
        type : String,
        required : [true,'Title is required!']
    },
    paintingTechnique : {
        type : String,
        required : [true,'Painting technique is required!']
    },
    artPicture: {
        type : String,
        required : [true,'Art picture is required!']
    },
    certificateOfAuthenticity : {
        type : String,
        required : [true,'Title is required!'],
        validator : {
            validate : (x) => {
                return x == 'no' || x == 'yes';
            }
        }
    },
    author : {
        type : mongoose.Types.ObjectId,
        ref : 'User'
    },
    usersShared : [{
        type : mongoose.Types.ObjectId,
        ref : 'User'
    }]
});

const Publication = mongoose.Model('Publication',publicationSchema);

exports.Publication = Publication;