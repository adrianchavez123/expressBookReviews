const axios = require('axios');
axios.defaults.baseURL = 'http://localhost:5000';
const url = '/';

async function getAvailableBooks(){
    console.log("getting available books");
    const result = await axios.get(url);
    console.log(result.data);
}


async function getBookByISBN(isbn){
    console.log("get book by ISBN");
    const result = await axios.get(`${url}isbn/${isbn}`);
    console.log(result.data);
}

async function getBookByAuthor(author){
    console.log("get book by author");
    const result = await axios.get(`${url}author/${author}`);
    console.log(result.data);
}

async function getBookByTitle(title){
    console.log("get book by title");
    const result = await axios.get(`${url}title/${title}`);
    console.log(result.data);
}

module.exports = {
    getAvailableBooks,
    getBookByISBN,
    getBookByAuthor,
    getBookByTitle
}