const Review = require('../models/Reviews');

/**
 * GET /books/:id/reviews
 */
exports.getReviewsByBook = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const bookId = req.params.id;

    const reviews = await Review.find({ book: bookId })
      .populate('user', 'name email')
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await Review.countDocuments({ book: bookId });

    res.json({
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      totalReviews: total,
      data: reviews
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * POST /books/:id/reviews
 */
exports.createReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const bookId = req.params.id;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    const review = await Review.create({
      book: bookId,
      user: req.user.id,
      rating,
      comment
    });

    res.status(201).json({
      message: 'Review added successfully',
      review
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * PUT /books/:id/reviews/:reviewId
 */
exports.updateReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const review = await Review.findById(req.params.reviewId);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // optional ownership check
    if (review.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to edit this review' });
    }

    if (rating) review.rating = rating;
    if (comment) review.comment = comment;

    await review.save();

    res.json({
      message: 'Review updated successfully',
      review
    });
  } catch {
    res.status(400).json({ message: 'Invalid ID format' });
  }
};

/**
 * DELETE /books/:id/reviews/:reviewId
 */
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // optional ownership check
    if (review.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this review' });
    }

    await review.deleteOne();

    res.json({ message: 'Review deleted successfully' });
  } catch {
    res.status(400).json({ message: 'Invalid ID format' });
  }
};
