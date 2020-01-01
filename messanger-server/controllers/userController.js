const services = require('../services');
const auth = require('../auth/validToken');

exports.userinformation = async (req, res) => {
    const { user:_id } = req;
    const { user } = await services.user.userInformation(_id)
    return res.json(user);
}