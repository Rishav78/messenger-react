const services = require('../services');
const auth = require('../auth/validToken');

exports.seachnewfriend = async (data, cb) => {
    const { Token } = data;
    const { authenticated, user} = auth.validToken(Token);
    if(!authenticated) return cb({ authenticated });
    const { _id } = user.user;
    const users = await services.friends.searchNewFriend(_id);
    cb({ authenticated, users });
}

exports.addnewfriend = async (data, cb) => {
    const { Token } = data;
    const { authenticated, user} = auth.validToken(Token);
    if(!authenticated) return cb({ authenticated });
    const { _id } = user.user;
    const { _id:friendid } = data;
    const { success } = await services.friends.addnewfriend(_id, friendid);
    cb({ authenticated, success });
}

exports.getfriends = async (data, cb) => {
    const { Token } = data;
    const { authenticated, user} = auth.validToken(Token);
    if(!authenticated) return cb({ authenticated });
    const { _id } = user.user;
    const { friends } = await services.friends.getfriends(_id)
    cb({ authenticated, friends });
}