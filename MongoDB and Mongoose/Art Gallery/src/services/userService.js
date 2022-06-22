const bcrypt = require('bcrypt');
const { constants } = require('../configs/constants');
const {User} = require('../models/User');
const jwt = require('jsonwebtoken');

async function registerUser({username , password , repeatPassword , address}) {
    if (!username || !password || !repeatPassword || !address) {
        throw new Error('All fields must be filled!');
    }

    if (password !== repeatPassword) {
        throw new Error('Passwords must match!');
    }

    if(password.includes(' ')) {
        throw new Error('Password musnt have whitespaces!');
    }

    username = username.trim();
    
    // It would be good if you validate here if the some of the properties arent 1 symbol

    let hashedPassword = await bcrypt.hash(password,constants.salt);

    await User.create({username,password : hashedPassword, address});
}   

async function loginUser({username,password}) {
    if (!username || !password) {
        throw new Error('All fields must be filled!');
    }

    username = username.trim();

    let user = await User.findOne({username : username});

    let isCorrectPass = await bcrypt.compare(password,user.password);

    if(!isCorrectPass) {
        throw new Error('No user with those credentials!');
    }

    let jwtPromise = new Promise((resolve, reject)=> {
        jwt.sign({username},constants.secret,{expiresIn : '2d'}, (err,token)=> {
            if(err) {
                return reject(err);
            }

            resolve(token);
        });
    });

    return jwtPromise;
}

module.exports = {
    registerUser,
    loginUser
}