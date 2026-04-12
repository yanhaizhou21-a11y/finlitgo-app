require('dotenv').config({ path: '../.env' });
const app = require('./src/app');
const port = process.env.PORT || 5000;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port: ${port}`)
})

  