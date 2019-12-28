const router = require('express').Router();
const controllers = require('../controllers');

router.post('/', controllers.login.login);

module.exports = router;