import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
// Vercel sets environment variables automatically, so we might not have them immediately from .env file.
import app from './src/app.js';
const port = process.env.PORT || 5000;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port: ${port}`)
})


  