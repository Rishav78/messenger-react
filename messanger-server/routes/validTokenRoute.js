const router = require('express').Router();
const controllers = require('../controllers');

router.get('/', controllers.validtoken.validToken);

module.exports = router;