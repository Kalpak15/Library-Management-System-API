const express = require('express');
const dbConnect = require('./config/database.js');
const bookRoutes = require('./routes/bookRoutes');
const auth = require('./routes/auth');

require('dotenv').config();

const app = express();
dbConnect();

app.use(express.json());
app.use('/api/v1/books', bookRoutes);
app.use('/api/v1/', auth);



app.get('/', (req, res) => {
  res.json({ message: 'Library Management API Running' });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`);
});