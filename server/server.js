import dotenv from 'dotenv';
dotenv.config();

import app from './src/app.js';

const port = process.env.PORT || 5000;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port: ${port}`);
});