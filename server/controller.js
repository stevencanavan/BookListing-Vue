const axios = require('axios');
const parser = require('xml2js').parseStringPromise;
const controller = {};
require('dotenv').config();

const key = process.env.KEY;

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
    // parse XML into JS object using xml2js npm package
    .then((response, err) => {
      if (response.status === 200) {
        return parser(response.data, (err, result) => {
          return result;
        });
      } else {
        console.log('we are here');
        return next(err);
      }
    })
    // get title, author, and image data from Goodreads API response
    // store each 'book' as object with that data and add it to array
    // add array to res.locals to go to client
    .then((parsedData) => {
      const data = parsedData.GoodreadsResponse.search.shift().results.shift();
      const books = [];
      for (let book of data.work) {
        let title = book.best_book[0].title[0];
        let image_url = book.best_book[0].image_url[0];
        let author = book.best_book[0].author[0].name[0];
        books.push({
          title: title,
          image_url: image_url,
          author: author,
        });
      }
      res.locals.data = books;
      return next();
    })
    .catch((err) => {
      return next(err);
    });
};

module.exports = controller;
