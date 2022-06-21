const bcrypt = require('bcrypt');
const { constants } = require('../configs/constants');
const {User} = require('../models/User');

async function registerUser({username , password , repeatPassword , address}) {
    if (!username || !password || !repeatPassword || !address) {
        throw new Error('All fields must be filled!');
    }

    if (password !== repeatPassword) {
        throw new Error('Passwords must match!');
    }
    
    // It would be good if you validate here if the some of the properties arent 1 symbol

    let hashedPassword = await bcrypt.hash(password,constants.salt);

    await User.create({username,password : hashedPassword, address});
}   

module.exports = {
    registerUser
}