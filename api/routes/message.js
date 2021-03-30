const router = require('express').Router();

const auth = require('../middleware/auth');
const messageCtrl = require('../controllers/message');

router.post('/lasts', auth, messageCtrl.lastsMessages);
router.post('/new', auth, messageCtrl.newMessage);
router.post('/:id', auth, messageCtrl.viewMessage);
router.patch('', auth, messageCtrl.modifyMessage);
router.delete('/', auth, messageCtrl.deleteMessage);


module.exports = router;