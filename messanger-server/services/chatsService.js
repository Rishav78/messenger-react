const chats = require('../models/chats');
const users = require('../models/users');

exports.createPrivateChatroom = async chatmembers => {
    const select = { firstname: 1, lastname: 1, imageid: 1 };
    try {
        const query = { chattype: false, chatmembers };
        const chatroom = new chats(query);
        let chat = await chatroom.save();
        chat = await chat.populate({ path: 'chatmembers', select }).execPopulate();
        chatmembers.forEach( async _id => {
            await users.updateOne({ _id }, { '$push': { 'activeChats': chat._id } });
        });
        return { success: true, chat };
    } catch (err) {
        return { success: false };
    }
}

exports.createGroupChat = async (chatmembers, chatname) => {
    const select = { firstname: 1, lastname: 1, imageid: 1 };
    try {
        const query = { chattype: true, chatmembers, chatname, imageid: 'default.png' };
        const chatroom = new chats(query);
        let chat = await chatroom.save();
        chat = await chat.populate({ path: 'chatmembers', select }).execPopulate();
        chatmembers.forEach( async _id => {
            await users.updateOne({ _id }, { '$push': { 'activeChats': chat._id } });
        });
        return { success: true, chat };
    } catch (err) {
        return { success: false };
    }
}

exports.existingChats = async _id => {   
    const { activeChats:chats } = await users.findById(_id, { activeChats: 1 })
        .populate({
            'path': 'activeChats',
            'populate': [
                    {
                        'path': 'chatmembers',
                        'select': {
                            firstname: 1,
                            lastname: 1,
                            imageid: 1
                        }
                    },
                    {
                        path: 'messages',
                        populate: {
                            path: 'sender',
                            select: {
                                firstname: 1,
                                lastname: 1,
                            }
                        },
                        options: {
                            limit: 1,
                            sort: { updatedAt: -1 }
                        }
                    }
            ],
            'options': { 'sort': { 'updatedAt': -1 } } 
            });
    return chats;
}

exports.chatExists = async (_id, friendid) => {
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