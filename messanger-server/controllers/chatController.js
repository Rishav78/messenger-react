const services = require('../services');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const auth = require('../auth/validToken');

function saveImage(buffer, name) {
    const dir = path.join(__dirname, '..', 'assets', 'images', name);
    fs.open(dir, 'a', 0755, function(err, fd) {
        if (err) throw err;

        fs.write(fd, buffer, null, 'Binary', function(err, written, buff) {
            fs.close(fd, function() {
                console.log('File saved successful!');
            });
        })
    });
}

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

exports.createGroupChat = async (data, cb) => {
    const { Token } = data;
    const { authenticated, user } = auth.validToken(Token);

    if(!authenticated) return cb({authenticated: false});

    const { _id } = user.user;
    const { members, chatname } = data;
    const chatmembers = [...members, _id];
    const res = await services.chats.createGroupChat(chatmembers, chatname);
    cb({ ...res, _id });

}

exports.chatExists = async (req, res) => {
    const { id } = req.query;
    const { user:_id } = req;
    const { activeChats } = await services.chats.chatExists(_id, id);
    const chat = activeChats.length > 0 ? activeChats[0] : null;
    res.json({chat});
}