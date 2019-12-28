const services = require('../services');

exports.signup = async (req, res) => {
    const { firstname, lastname, phone, password } = req.body;
    
    if(!firstname || !lastname || !phone || !password)
        return res.json({ 'success': false, 'err_msg': 'empty fields' });
    
    const data = await services.user.add({ firstname, lastname, phone, password});

    res.json(data);
}