const mongoose = require('mongoose');

const validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const userSchema = new mongoose.Schema({
    username : {
        type: String,
        required : true
    },
    email : {
        type: String,
        required : true,
        trim: true,
        lowercase: true,
        unique: true,
        validate : [validateEmail, 'Please fill a valid email adress!']
    },
    password : {
        type: String,
        required : true
    },
    
});

const User = mongoose.model('User',userSchema);

module.exports = {
    User
}