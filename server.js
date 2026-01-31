const express = require('express');
const dbConnect = require('./config/database.js');
const bookRoutes = require('./routes/bookRoutes');
const auth = require('./routes/auth');
const authors  = require('./routes/authors')
const users = require('./routes/user')
const rating = require('./routes/rating')

require('dotenv').config();

const app = express();
dbConnect();

app.use(express.json());
app.use('/api/v1/books', bookRoutes);
app.use('/api/v1/book', rating);

app.use('/api/v1/authors', authors);
app.use('/api/v1/', users);
app.use('/uploads', express.static('uploads'));


app.get('/', (req, res) => {
  res.json({ message: 'Library Management API Running' });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`);
});