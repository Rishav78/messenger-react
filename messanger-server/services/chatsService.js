const chats = require('../models/chats');
const users = require('../models/users');

exports.createPrivateChatroom = async chatmembers => {
    try {
        const query = { chattype: false, chatmembers };
        const chatroom = new chats(query);
        const chat = await chatroom.save();
        chatmembers.forEach( async _id => {
            console.log(_id);
            await users.updateOne({ _id }, { '$push': { 'activeChats': chat._id } });
        });
        const { _id } = chat;
        return { success: true, _id };
    } catch (err) {
        return { success: false };
    }
}

exports.ongoningChats = async _id => {
    const chats = await users.findById(_id, { activeChats: 1 })
        .populate({
            'path': 'activeChats',
            'select': {
                chatname: 1,
                chattype: 1,
                updatedAt: 1,
            },
            'populate': {
                'path': 'chatmembers',
                'select': {
                    firstname: 1,
                    lastname: 1,
                }
            },
            'options': { 'sort': { 'updatedAt': -1 } } 
        });
    return chats;
}

exports.alreadyGoingon = async (_id, friendid) => {
    const { activeChats } = await users.findById(_id, { 'activeChats': 1 })
            .populate({
                path: 'activeChats',
                select: {
                    _id: 1,
                },
                match: {'$and': [
                    {
                        'chattype': false
                    },
                    {
                        'chatmembers': { '$eq': friendid }
                    }
                ]}
            });
    return { activeChats };
}

exports.chatInformation = async _id => {
    try {
        const chat = await chats.findById(_id, { messages: 0 })
                .populate({
                    path: 'chatmembers',
                    select: {
                        firstname: 1,
                        lastname: 1,
                        phone: 1,
                    }
                });
        return { success: true, chat };
    } catch (err) {
        return { success: false };
    }
}