const router = require('express').Router();
const userCtrl = require('../controllers/user')
const auth = require('../middleware/auth');

router.post('/disconnect', auth, userCtrl.disconnect);
router.post('/:id', auth, userCtrl.viewProfil);
router.patch('/:id', auth, userCtrl.profilUpdate);
router.get('/departmentList', userCtrl.departmentList);
router.delete('/delete/:id', auth, userCtrl.deleteProfil);

module.exports = router;