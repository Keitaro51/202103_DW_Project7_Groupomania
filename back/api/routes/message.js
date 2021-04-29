const router = require('express').Router();

const auth = require('../middleware/auth');
const messageCtrl = require('../controllers/message');

router.post('/lasts', auth, messageCtrl.lastsMessages);
router.post('/new', auth, messageCtrl.newMessage);
router.post('/:id', auth, messageCtrl.viewMessage);
router.patch('/modify', auth, messageCtrl.modifyMessage);
router.delete('/', auth, messageCtrl.deleteMessage);
router.post('/responses/:id', auth, messageCtrl.responseList);


module.exports = router;