const router = require('express').Router();
const controllers = require('../controllers');
const auth = require('../auth/validToken');

router.get('/', auth.verifyToken, controllers.messages.getmessages);

module.exports = router;