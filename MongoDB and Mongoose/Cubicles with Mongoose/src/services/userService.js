const {User} = require('../Models/User');
const {constants} = require('../configs/constants');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function register(user) {
    console.log(user)

    //Validate
    if (!(user.email && user.username && user.password)) {
        return false;
    }

    let hashedPassword = await bcrypt.hash(user.password,constants.salt);

    await User.create({username : user.username, password : hashedPassword, email : user.email});
}

async function login(email,password) {
    //If there is a user with that combination
    //Set his username and email to the cookie  
    let user = await User.findOne({email : email});
    
    if(!user) {
        return false;
    }

    let isCorrect = await bcrypt.compare(password,user.password);

    if(!isCorrect) {
        return false;
    }

    let result = new Promise((resolve,reject) => {
        jwt.sign({_id : user._id,email : user.email, username : user.username},constants.secret,{expiresIn : '2d'}, (err,token)=> {
            if(err) {
                return reject(err);
            }

            resolve(token);
        });
    });

    return result;
}

async function getUser(email) {
    let userObj = await User.findOne({email : email}).lean();

    return userObj;
}

exports.userService = {
    register,
    getUser,
    login
}