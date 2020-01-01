const auth = require('../auth/validToken');
const controllers = require('../services');
const services = require('../services');
const path = require('path');


exports.updateProfilePicture = (req, res) => {
    const { files } = req;
    if(!files) return res.json({ success: false });
    const { user:_id } = req;
    const filename = files.filename.name;
    const extention = path.extname(filename);
    files.filename.mv(path.join(__dirname, '..', 'assets', 'images', `${_id}${extention}`), async function(err) {
        if(err) throw err;
        services.profilepic.updateProfilePicture(_id, `${_id}${extention}`);
        res.json({ filename: `${_id}${extention}`, success: true})
    });
}

exports.getProfilePicture = (req, res) => {
    const { id } = req.query;
    res.sendFile(path.join(__dirname, '..', 'assets', 'images', id));
}