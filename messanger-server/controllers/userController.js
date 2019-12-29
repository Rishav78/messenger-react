const services = require('../services');
const auth = require('../auth/validToken');

exports.getUserInformation = async (data, cb) => {
    const { Token } = data;
    const { authenticated, user} = auth.validToken(Token);
    if(!authenticated) return cb({ authenticated });

    const { _id } = user.user;

    const usr = await services.user.userInformation(_id);
    cb({authenticated, ...usr});
}