'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// *** Require in our model ****

const Books = require();

// ** Middleware **
app.use(cors());


// *** BRING IN MONGOOSE ***
const mongoose = require('mongoose');

// *** PER MONGOOSE DOCS PLUG AND PLAY CODE ****
mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');

const PORT = process.env.PORT || 3001;

app.get('/test', (request, response) => {

  response.send('test request received')

})

// ENDPOINT
app.get('/', (request, response) => {
  response.status(200).send('Welcome!');
});


// ***** ENDPOINT TO GET ALL THE CATS FROM MY DATABASE *****

app.get('/cats', getCats);

async function getCats(request, response, next){
{
  try {
    let allBooks = await Cat.find({}); 
    // Model.find({}) - gets all the docs from the database

    response.status(200).send(allBooks);

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
