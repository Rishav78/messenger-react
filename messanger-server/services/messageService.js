const messages = require('../models/messages');
const chats = require('../models/chats');

exports.getmessages = async _id => {
    try {
        const message = await chats.findById(_id, { messages: 1 })
                .populate({
                    path: 'messages',
                    options: {
                        sort: {
                            createdAt: 1,
                        }
                    },
                    populate: {
                        path: 'sender',
                        select: {
                            firstname: 1,
                            lastname: 1,
                        },
                    },
                });
        return { success: true, message };
    } catch (err) {
        return { success: false };
    }
}

exports.saveMessage = async (_id, message, sender) => {
    try {
        const newmessage = new messages({ sender, message, status: 1 });
        let msg = await newmessage.save();
        await chats.updateOne({ _id }, { '$push': { 'messages': msg._id } });
        msg = await msg.populate({
            path: 'sender',
            select: {
                firstname: 1,
                lastname: 1
            }
        }).execPopulate();
        return { success: true, msg };
    } catch (err) {
        return { success: false };
    }
}