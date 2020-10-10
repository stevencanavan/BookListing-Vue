const axios = require('axios');
const parser = require('xml2js').parseStringPromise;
const controller = {};

const key = 'wB2QnQlmCrym3YtD2D5g';

controller.getBooks = (req, res, next) => {
  console.log('req.params', req.params.term);
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
      // return new Promise((resolve, reject) => {
      //   parser(response.data, (err, result) => {
      //     resolve(result);
      //   });
      // });
      return parser(response.data, (err, result) => {
        return result;
      });
    })
    .then((parsedData) => {
      console.log('parsed data', parsedData);
      res.locals.data = parsedData;
      return next();
    })
    .catch((err) => {
      console.log('error');
      return next(err);
    });
};

module.exports = controller;
