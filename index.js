const express = require('express');

const app = express();
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}.`);
});

app.get('/', (req, res) => {
  res.status(200).send('OK');
});
