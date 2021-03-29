const router = require('express').Router();
const userCtrl = require('../controllers/user')

router.post('/disconnect', userCtrl.disconnect);
router.post('/:id', userCtrl.viewProfil);
router.patch('/:id/modify', userCtrl.profilUpdate);

module.exports = router;