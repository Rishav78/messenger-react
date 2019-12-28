const router = require('express').Router();
const controllers = require('../controllers');

router.post('/', controllers.signup.signup);

module.exports = router;