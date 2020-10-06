const axios = require('axios');
const controller = {};

const key = 'wB2QnQlmCrym3YtD2D5g';

controller.getBooks = (req, res, next) => {
  axios
    .get(
      `http://www.goodreads.com/search/index.xml?key=${key}&q=${req.params.term}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    .then((response) => {
      res.locals.data = response.data;
      return next();
    })
    .catch((err) => {
      return next(err);
    });
};

module.exports = controller;
