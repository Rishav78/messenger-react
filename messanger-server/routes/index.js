const router = require('express').Router();

router.use('/validtoken', require('./validTokenRoute'));
router.use('/login', require('./loginRoute'));
router.use('/signup', require('./signupRoute'));
router.use('/profilepicture', require('./profilePicRoute'));
router.use('/chat', require('./chatRoutes'));
router.use('/messages', require('./messageRoute'));
router.use('/friends', require('./friendsRoute'));

module.exports = router;