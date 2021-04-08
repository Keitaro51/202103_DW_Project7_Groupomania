const router = require('express').Router();
const authCtrl = require('../controllers/auth')

router.post('/sign', authCtrl.sign);
router.post('/login', authCtrl.login);
router.post('/forgot', authCtrl.forgot);

module.exports = router;