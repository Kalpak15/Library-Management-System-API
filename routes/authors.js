const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const controller = require('../controllers/authorController');

router.get('/', controller.getAuthors);
router.get('/:id', controller.getAuthorById);
router.post('/create', auth, controller.createAuthor);
router.put('/update/:id', auth, controller.updateAuthor);
router.delete('/delete/:id', auth, controller.deleteAuthor);

module.exports = router;
