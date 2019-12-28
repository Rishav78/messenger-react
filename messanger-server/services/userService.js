const users = require('../models/users');

exports.add = async (data) => {
    try {
        const { phone } = data;
        const user = new users(data);
        const exist = await users.findOne({ phone });
        if(exist) return { success: false, err_msg: 'user already exist' };
        await user.save();
        return { success: true };
    } catch(err) {
        console.log(err);
        return { success: false };
    } 
}

exports.userInformation = async _id => {
    try {
        const user = await users.findById(_id, { firstname: 1, lastname: 1 });
        return { success: true, user };
    } catch (err) {
        return { success:  false };
    }
}