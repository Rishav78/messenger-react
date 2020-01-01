const services = require('../services');
const jwt = require('jsonwebtoken');
const auth = require('../auth/validToken');

exports.existingChats = async (req , res) => {
    const { user:_id } = req;
    const chats = await services.chats.existingChats(_id);
    res.json({ chats, _id });
}

exports.createPrivateChatroom = async (data, cb) => {
    const { Token } = data;
    const { authenticated, user } = auth.validToken(Token);

    if(!authenticated) return cb({authenticated: false});

    const { _id } = user.user;
    const chatmembers = [data._id, _id];
    const res = await services.chats.createPrivateChatroom(chatmembers);
    cb({ ...res, _id });
}

exports.chatExists = async (req, res) => {
    const { id } = req.query;
    const { user:_id } = req;
    const { activeChats } = await services.chats.chatExists(_id, id);
    const chat = activeChats.length > 0 ? activeChats[0] : null;
    console.log(chat);
    res.json({chat});
}