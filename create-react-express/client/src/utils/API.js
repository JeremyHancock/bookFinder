import axios from "axios";
const keys = require('../keys');
const url = 'https://www.googleapis.com/books/v1/volumes?q=';
<<<<<<< HEAD
const apiKey = `&key=${keys.apiKey}`;

=======
const apiKey = `&key=${keys.token}`;
>>>>>>> e2a19d4ba60aaba920477ab97a2fef7afdb0b4bd
export default {
  // Gets all books
  
  getBooks: function (titleSearch) {
    let title = titleSearch.title.split(' ').join('+');
    let author = `+inauthor:${titleSearch.author.split(' ').join('+')}`;
    return axios.get(`${url}${title}${author}${apiKey}`);
  },
  // Gets the book with the given id
  getBook: function (id) {
    return axios.get(`${url}${id}${apiKey}`);
  },
  getSavedBooks: function (id) {
    return axios.get("/api/books/");
  },
  // Deletes the book with the given id
  deleteBook: function (id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function (bookData) {
    return axios.post("/api/books", bookData);
  }
};
