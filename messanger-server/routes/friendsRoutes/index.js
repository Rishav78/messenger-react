const router = require('express').Router();

router.use('/', require('./getFriendRoute'));
router.use('/searchnew', require('./searchUserFriendRoutes'));


module.exports = router;