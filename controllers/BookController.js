const Book = require('../models/Book');


// GET /books
exports.getBooks = async (req, res) => {
  try {
    const { page = 1, limit = 10, title, author, category } = req.query;

    const filter = {};
    if (title) filter.title = new RegExp(title, 'i');
    if (author) filter.author = new RegExp(author, 'i');
    if (category) filter.category = new RegExp(category, 'i');

    const books = await Book.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Book.countDocuments(filter);

    res.json({
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      totalBooks: total,
      data: books
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /books/:id
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch {
    res.status(400).json({ message: 'Invalid ID format' });
  }
};

// POST /books
exports.createBook = async (req, res) => {
  try {
    const { title, author, category } = req.body;

    if (!title || !author || !category) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT /books/:id
exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!book) return res.status(404).json({ message: 'Book not found' });

    res.json(book);
  } catch {
    res.status(400).json({ message: 'Invalid ID format' });
  }
};

// DELETE /books/:id
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) return res.status(404).json({ message: 'Book not found' });

    res.json({ message: 'Book deleted successfully' });
  } catch {
    res.status(400).json({ message: 'Invalid ID format' });
  }
};



exports.uploadBookCover = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    book.coverImage = `/uploads/book-covers/${req.file.filename}`;
    await book.save();

    res.json({
      message: 'Book cover uploaded successfully',
      coverImage: book.coverImage
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
