const services = require('../services');
const auth = require('../auth/validToken');

exports.getmessages = async (data, cb) => {
    const { Token } = data;
    const { authenticated, user} = auth.validToken(Token);
    if(!authenticated) return cb({ authenticated });
    const { _id } = user.user;

    const msg = await services.messages.getmessages(data._id);
    cb({ authenticated, ...msg });
}

exports.saveMessage = async (data, cb) => {
    const { Token } = data;
    const { authenticated, user} = auth.validToken(Token);
    if(!authenticated) return cb({ authenticated });

    const { _id, message } = data;
    const msg = await services.messages.saveMessage(_id, message, user.user._id);
    cb({ authenticated, ...msg });
    return { ...msg, _id };
}