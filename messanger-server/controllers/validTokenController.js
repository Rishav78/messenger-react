const auth = require('../auth/validToken');

exports.validToken = (req, res) => {
    const { Token } = req.query;
    const valid = auth.validToken(Token);
    res.json(valid);
}

// exports.validToken = (data, cb) => {
//     const { Token } = data;
//     const valid = auth.validToken(Token);
//     console.log(valid);
//     cb(valid);
// }