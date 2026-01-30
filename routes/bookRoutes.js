const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const controller = require('../controllers/bookController');

router.get('/', controller.getBooks);
router.get('/:id', controller.getBookById);
router.post('/', auth, controller.createBook);
router.put('/:id', auth, controller.updateBook);
router.delete('/:id', auth, controller.deleteBook);

module.exports = router;