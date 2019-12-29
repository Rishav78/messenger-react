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
    const chatmembers = [data._id, _id];
    const res = await services.chats.createPrivateChatroom(chatmembers);
    cb({ ...res, _id });
}

exports.alreadyGoingon = async (data, cb) => {
    const { Token } = data;
    const { authenticated, user } = auth.validToken(Token)

    if(!authenticated) return cb({authenticated: false});

    const { _id } = user.user;
    let { activeChats:chat } = await services.chats.alreadyGoingon(_id, data._id);
    chat = chat.length > 0 ? chat[0] : null;
    console.log(chat)
    return cb({ authenticated, chat });

}

exports.chatInformation = async (data, cb) => {
    const { Token } = data;
    const { authenticated, user } = auth.validToken(Token);

    if(!authenticated) return cb({authenticated: false});

    const { _id } = data;

    const chat = await services.chats.chatInformation(_id);
    cb({ authenticated, ...chat, _id: user.user._id }); 

}