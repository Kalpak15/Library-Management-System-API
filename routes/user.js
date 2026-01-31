const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const controller = require('../controllers/UserController');

router.post('/register', controller.register);
router.post('/login', controller.login);

router.get('/', auth, controller.getUsers);
router.get('/:id', auth, controller.getUserById);

router.patch('/upload-profile-picture',auth,upload.single('profile'),controller.uploadProfilePicture);

module.exports = router;
