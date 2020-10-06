const express = require('express');
const app = express();
const port = 3000;
const controller = require('./controller');

app.use(express.json());

app.use('/', controller.getBooks, (req, res) => {
  res.json(res.locals.data);
});

app.use((err, req, res, next) => {
  res.status(err.response.status).json(err);
});

app.listen(port, () => {
  console.log(`listening at https://localhost:${port}`);
});
