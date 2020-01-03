const services = require('../services');
const jwt = require('jsonwebtoken');
const auth = require('../auth/validToken');

exports.validToken =  async (req, res) => {
    try {
        const {token} = req.query;
        const { user:usr } = jwt.verify(token, 'secretKey');
        const { _id } = usr;
        const { user }  = await services.user.userInformation(_id);
        if(user) {
            return res.json({ authenticated: true, user });
        } else {
            return res.json({ authenticated: false });
        }
    } catch (err) {
        return res.json({ authenticated: false })
    }
}

exports.validtoken = data => {
    const {Token} = data;
    const valid = auth.validToken(Token);
    return valid;
}