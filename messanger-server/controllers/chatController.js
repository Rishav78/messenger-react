const services = require('../services');
const auth = require('../auth/validToken');


exports.getOngoingChats = async (data, cb) => {
    const { Token } = data;
    const { authenticated, user } = auth.validToken(Token);
    if(!authenticated) return cb({authenticated: false});
    const { _id } = user.user;
    const chats = await services.chats.ongoningChats(_id);
    cb({ authenticated: true, chats, _id });
}

exports.createPrivateChatroom = async (data, cb) => {
    const { Token } = data;
    const { authenticated, user } = auth.validToken(Token);

    if(!authenticated) return cb({authenticated: false});

    const { _id } = user.user;
    const { activeChats:chat } = await services.chats.alreadyGoingon(_id, data._id);
    console.log(chat);
    if(chat.length > 0) return cb({ authenticated, chat: chat[0] });
    
    const chatmembers = [data._id, _id];
    const res = await services.chats.createPrivateChatroom(chatmembers);
    cb(res);
}

exports.chatInformation = async (data, cb) => {
    const { Token } = data;
    const { authenticated, user } = auth.validToken(Token);

    if(!authenticated) return cb({authenticated: false});

    const { _id } = data;

    const chat = await services.chats.chatInformation(_id);
    cb({ authenticated, ...chat, _id: user.user._id }); 

}