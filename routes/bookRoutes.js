const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const controller = require('../controllers/bookController');

router.get('/', controller.getBooks);
router.get('/:id', controller.getBookById);
router.post('/create', auth, controller.createBook);
router.put('/update/:id', auth, controller.updateBook);
router.delete('/delete/:id', auth, controller.deleteBook);

module.exports = router;