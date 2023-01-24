'use strict';

const mongoose = require('mongoose');

require('dotenv').config();
mongoose.connect(process.env.DB_URL);

const Book = require('./Models/books.js');

async function seed() {
 

  await Book.create({
    title: 'The Miracle of Mindfulness',
    description: 'Learning the skills of mindfulness--being awake and fully aware',
    status: true,
  });

  console.log('The MOM was created!');

  await Book.create({
    title: 'Gone Girl',
    description: 'Crime Thriller',
    status: true,
   
  });

  console.log('Gone Girl was created');

  await Book.create({
    title: 'Dark Places',
    description: 'Crime Thriller',
    status: true,
  });
  
  console.log('Dark Places was created');

  mongoose.disconnect();
}

seed();