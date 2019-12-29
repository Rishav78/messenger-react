const users = require('../models/users');

exports.updateProfilePicture = async (_id, imageid) => {
    try {
        await users.updateOne({ _id }, { imageid });
        return { success: true };
    } catch (err) {
        return { success: false };
    }

}