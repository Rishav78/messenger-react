const services = require('../services');
const auth = require('../auth/validToken');

exports.updateMessage = async data => {
    const { Token } = data;
    const { authenticated} = auth.validToken(Token);
    if(!authenticated) return { authenticated };

    const { user, msg } = data;
    const { _id:userid } = user;
    const { _id } = msg;

    const { success } = await services.messages.updateMessage(_id, userid);
    if(!success) return { success };
    msg.sendto.push(user);
    return { msg, success };
}

exports.getmessages = async (req, res) => {
    const { id } = req.query;
    const msg = await services.messages.getmessages(id);
    res.json(msg);
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