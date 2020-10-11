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
      const data = parsedData.GoodreadsResponse.search.shift().results.shift();
      console.log('data', data);
      const books = [];
      for (let book of data.work) {
        console.log('book', book);
        console.log('title', book.best_book[0].title[0]);
        let title = book.best_book[0].title[0];
        let image_url = book.best_book[0].image_url[0];
        let author = book.best_book[0].author[0].name[0];
        books.push({
          title: title,
          image_url: image_url,
          author: author,
        });
      }
      console.log('books', books);
      res.locals.data = books;
      return next();
    })
    .catch((err) => {
      console.log('error', err);
      return next(err);
    });
};

module.exports = controller;
