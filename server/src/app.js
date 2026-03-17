const express = require('express');
const cors = require('cors');

const chatRoutes = require('./routes/chatRoutes');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is running perfectly!');
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'Hello from your Express API!' });
});

app.use('/api/chat', chatRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;

