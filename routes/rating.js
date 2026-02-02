const express = require('express');
const router = express.Router({ mergeParams: true });
const auth = require('../middleware/auth');
const controller = require('../controllers/reviewController');

// GET /books/:id/reviews
router.get('/:id/reviews', controller.getReviewsByBook);

// POST /books/:id/reviews (auth)
router.post('/:id/create', auth, controller.createReview);

// PUT /books/:id/reviews/:reviewId (auth)
router.put('/:reviewId/update', auth, controller.updateReview);

// DELETE /books/:id/reviews/:reviewId (auth)
router.delete('/:reviewId/delete', auth, controller.deleteReview);

module.exports = router;

