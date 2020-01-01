const router = require('express').Router();

router.use('/exist', require('./chatExistRoute'));
router.use('/', require('./existingChatsRoute'));

module.exports = router;