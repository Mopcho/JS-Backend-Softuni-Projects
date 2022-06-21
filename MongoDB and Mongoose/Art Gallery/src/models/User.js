const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : [true, 'Username is required!']
    },
    password : {
        type : String,
        required : [true, 'Password is required!']
    },
    address : {
        type : String,
        required : [true, 'Address is required!']
    },
    publications : [{
        type : mongoose.Types.ObjectId,
        ref : 'Publications'
    }]
});

const User = mongoose.Model('User', userSchema);

exports.User = User;