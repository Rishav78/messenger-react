const router = require('express').Router();
const controllers = require('../controllers');

router.post('/', controllers.profilepicture.updateProfilePicture);
router.get('/', controllers.profilepicture.getProfilePicture)

module.exports = router;