const express = require('express');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const router = express.Router();

const sauceCtrl = require('../controllers/sauce');

router.post('/', auth, multer, sauceCtrl.newSauce);
router.get('/', auth, multer, sauceCtrl.findSauce);
router.get('/', auth, multer, sauceCtrl.findOneSauce);
router.put('/', auth, multer, sauceCtrl.updateSauce);
router.delete('/', auth, multer, sauceCtrl.deleteSauce);



module.exports = router;