'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// *** Require in our model ****

const Books = require('./Models/books');

// ** Middleware **
app.use(cors());

// ! dont forget to use middleware to parse json data from request.body

app.use(express.json());


// *** BRING IN MONGOOSE ***
const mongoose = require('mongoose');

// *** PER MONGOOSE DOCS PLUG AND PLAY CODE ****
mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});
const PORT = process.env.PORT || 3001;

app.get('/test', (request, response) => {

  response.send('test request received')

})

// ENDPOINT
app.get('/', (request, response) => {
  response.status(200).send('Welcome!');
});


// ***** ENDPOINT TO GET ALL THE CATS FROM MY DATABASE *****

app.get('/books', getBooks);

async function getBooks(request, response, next) {
  try {
    let allBooks = await Books.find({});
    // Model.find({}) - gets all the docs from the database

    response.status(200).send(allBooks);

  } catch (error) {
    console.log(error.message);
    next(error);
  }
}

// ** Endpoint to add a book ///
app.post('/books', postBooks);

async function postBooks(request, response, next){
  try {
    let createdBook = await Books.create(request.body);

    console.log(request.body);
    response.status(200).send(createdBook);
  }  catch (error) {
    console.log(error.message); 
    next(error)
  }
}


// ** ENDPOINT TO DELETE A BOOK  **//

app.delete('/books/:bookID', deleteBooks);

async function deleteBooks(request, response, next) {
  try {

    let id = request.params.bookID;
    await Books.findByIdAndDelete(id);
    
    console.log(request.params.bookID)

    response.status(200).send('Book Deleted')

  } catch (error) {
    console.log(error.message);
    next(error)
  }
}

// ** EndPoint to Update a book by an Identifier ////
app.put('/books/:bookID', updateMyBook);

async function updateMyBook(request, response, next){
  console.log('im here');
  try {
    let id = request.params.bookID;
    let data = request.body;
    console.log('id and data',id,data);
    
    const updateMyBook = await Books.findByIdAndUpdate(id, data, { new: true, overwrite: true});

    response.status(200).send(updateMyBook);

  } catch (error) {
    console.log(error.message);
    next(error);
  }
}


app.get('*', (request, response) => {
  response.status(404).send('Not availabe');
});

// ERROR
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});


app.listen(PORT, () => console.log(`listening on ${PORT}`));
