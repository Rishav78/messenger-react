const users = require('../models/users');

exports.valid = async (phone, password) => {
    const user = await users.findOne({ phone }, { _id: 1, password: 1 });    
    if(!user) return { authenticated: false, err_msg: 'user doest not exist' };
    const { _id } = user;
    if(user.password !== password) return { authenticated: false, err_msg: 'incorrect password' };

    return { authenticated: true, _id };
}