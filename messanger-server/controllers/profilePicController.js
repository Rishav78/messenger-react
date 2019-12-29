const auth = require('../auth/validToken');
const controllers = require('../services');
const services = require('../services');
const path = require('path');


exports.updateProfilePicture = (req, res) => {
    const { Token } = req.query;
    const { files } = req;
    const { authenticated, user} = auth.validToken(Token);
    if(!authenticated) return cb({ authenticated });

    if(!files) return {authenticated, success: false};

    const { _id } = user.user;
    const filename = files.filename.name;
    const extention = path.extname(filename);
    files.filename.mv(path.join(__dirname, '..', 'assets', 'images', `${user.user._id}${extention}`), async function(err) {
        if(err) throw err;
        services.profilepic.updateProfilePicture(_id, `${user.user._id}${extention}`);
        res.json({ filename: `${user.user._id}${extention}`, authenticated, success: true})
    });
}

exports.getProfilePicture = (req, res) => {
    const { id } = req.query;
    res.sendFile(path.join(__dirname, '..', 'assets', 'images', id));
}