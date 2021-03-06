const router = require('express').Router();
const auth = require('../auth/validToken');
const controllers = require('../controllers');

router.post('/', auth.verifyToken, controllers.profilepicture.updateProfilePicture);
router.get('/', controllers.profilepicture.getProfilePicture)

module.exports = router;