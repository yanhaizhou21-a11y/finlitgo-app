const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Server is running perfectly!');
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'Hello from your Express API!' });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
