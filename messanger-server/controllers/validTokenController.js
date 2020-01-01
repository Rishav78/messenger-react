const services = require('../services');
const auth = require('../auth/validToken');

exports.validToken =  async (req, res) => {
    const { user:_id } = req;
    const { user }  = await services.user.userInformation(_id);
    if(user) {
        return res.json({ authenticated: true, user });
    } else {
        return res.json({ authenticated: false });
    }
}

exports.validtoken = data => {
    const {Token} = data;
    const valid = auth.validToken(Token);
    return valid;
}