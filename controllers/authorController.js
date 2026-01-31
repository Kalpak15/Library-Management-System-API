const Author = require('../models/Author');


exports.getAuthors = async (req, res) => {
  try {
    const { page = 1, limit = 10, name, country } = req.query;

    const filter = {};
    if (name) filter.name = new RegExp(name, 'i');
    if (country) filter.country = new RegExp(country, 'i');

    const authors = await Author.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Author.countDocuments(filter);

    res.json({
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      totalAuthors: total,
      data: authors
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * GET /authors/:id
 */
exports.getAuthorById = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }
    res.json(author);
  } catch {
    res.status(400).json({ message: 'Invalid ID format' });
  }
};

/**
 * POST /authors (Auth required)
 */
exports.createAuthor = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const author = await Author.create(req.body);
    res.status(201).json(author);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * PUT /authors/:id (Auth required)
 */
exports.updateAuthor = async (req, res) => {
  try {
    const author = await Author.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }

    res.json(author);
  } catch {
    res.status(400).json({ message: 'Invalid ID format' });
  }
};

/**
 * DELETE /authors/:id (Auth required)
 */
exports.deleteAuthor = async (req, res) => {
  try {
    const author = await Author.findByIdAndDelete(req.params.id);

    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }

    res.json({ message: 'Author deleted successfully' });
  } catch {
    res.status(400).json({ message: 'Invalid ID format' });
  }
};
