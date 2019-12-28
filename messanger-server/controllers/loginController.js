const jwt = require('jsonwebtoken');
const services = require('../services');

exports.login = async (req, res) => {
    const { phone, password } = req.body;
    const { authenticated, _id, err_msg } = await services.validuser.valid(phone, password);

    if(!authenticated) return res.json({ authenticated, err_msg });
    
    jwt.sign({ user: { _id } }, 'secretKey', function(err, Token){
        if(err) throw err;
        return res.json({ authenticated, Token });
    });
}