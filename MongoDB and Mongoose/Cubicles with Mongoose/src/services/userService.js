const {User} = require('../Models/User');

async function saveUser(user) {
    const userObj = new User(
        {
            username : user.username,
            email : user.email,
            password : user.password,
        }
    )

    await userObj.save();
}

async function getUser(email) {
    let userObj = await User.findOne({email : email}).lean();

    return userObj;
}

async function getUsers(username) {

}

exports.userService = {
    saveUser,
    getUser,
    getUsers
}