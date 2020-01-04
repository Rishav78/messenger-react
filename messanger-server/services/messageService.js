const messages = require('../models/messages');
const chats = require('../models/chats');

exports.updateMessage = async (_id, userid) => {
    try {
        const select = { firstname: 1, lastname: 1, imageid: 1 };
        let msg = await messages.findByIdAndUpdate(_id, 
            { '$push': {'receivedby': { user: userid } } },
            {new: true, useFindAndModify: false});
        msg = await msg.populate({ path: 'receivedby.user', select })
            .populate({ path: 'sender', select }).execPopulate();
        console.log(msg);
        return { success: true, msg };
    } catch (err) {
        return { success:  false };
    }
}

exports.getmessages = async _id => {
    const select = { firstname: 1, lastname: 1, imageid: 1 };
    try {
        const { messages } = await chats.findById(_id, { messages: 1 })
            .populate({
                path: 'messages',
                options: {
                    sort: {
                        createdAt: 1,
                    }
                },
                populate: [
                    { path: 'receivedby.user', select },
                    { path: 'sender', select }
                ]
            });
        return { success: true, messages };
    } catch (err) {
        return { success: false };
    }
}

exports.saveMessage = async (_id, message, sender) => {
    const select = { firstname: 1, lastname: 1, imageid: 1 };
    try {
        const newmessage = new messages({ sender, message, sendto: [] });
        let msg = await newmessage.save();
        await chats.updateOne({ _id }, { '$push': { 'messages': msg._id } });
        msg = await msg.populate({ path: 'sender', select }).execPopulate();
        return { success: true, msg };
    } catch (err) {
        return { success: false };
    }
}