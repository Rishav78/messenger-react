const router = require('express').Router();

router.use('/validtoken', require('./validTokenRoute'));
router.use('/login', require('./loginRoute'));
router.use('/signup', require('./signupRoute'));

module.exports = router;