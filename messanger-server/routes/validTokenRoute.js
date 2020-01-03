const router = require('express').Router();
const auth = require('../auth/validToken');
const controllers = require('../controllers');

router.get('/', controllers.validtoken.validToken);

module.exports = router;