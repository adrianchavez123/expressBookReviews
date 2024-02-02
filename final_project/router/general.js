const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


const doesExist = (username)=>{
  let userswithsamename = users.filter((user)=>{
    return user.username === username
  });
  if(userswithsamename.length > 0){
    return true;
  } else {
    return false;
  }
}

public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!doesExist(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "Customer successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists"});    
    }
  } 
  return res.status(404).json({message: "Unable to register user. Please provide user and password."});
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
  return res.json(books)
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  return res.json(books)
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = +req.params.isbn;
  if(!isbn){
    return res.status(405).json({message: "Please provide an ISBN number."});
  }
  if(books[isbn]){
    return res.json(books[isbn]);
  }
  return res.status(404).json({message: "Book not found."});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  if(!author){
    return res.status(405).json({message: "Please provide the name of an author."});
  }
  const booksWrittenByAuthor = Object.entries(books)
      .map(entry => entry[1])
      .filter(book => book.author === author);

  if(booksWrittenByAuthor){
    return res.json(booksWrittenByAuthor);
  }
  return res.status(404).json({message: "Author not found."});

});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
  if(!title){
    return res.status(405).json({message: "Please provide a title."});
  }
  const booksByTitle = Object.entries(books)
      .map(entry => entry[1])
      .find(book => book.title === title);

  if(booksByTitle){
    return res.json(booksByTitle);
  }
  return res.status(404).json({message: "Title not found."});
  
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = +req.params.isbn;
  if(!isbn){
    return res.status(405).json({message: "Please provide an ISBN number."});
  }
  if(books[isbn]){
    return res.json(books[isbn].reviews);
  }
  return res.status(404).json({message: "Book not found."});
});

module.exports.general = public_users;
