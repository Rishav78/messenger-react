const auth = require('../auth/validToken');

exports.validToken = (req, res) => {
    const { Token } = req.query;
    const valid = auth.validToken(Token);
    res.json(valid);
}

exports.validtoken = data => {
    const {Token} = data;
    const valid = auth.validToken(Token);
    return valid;
}