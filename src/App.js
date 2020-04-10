const express = require('express');
const bodyParser= require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Book = require('./models/Book');

dotenv.config();
const PORT = process.env.PORT;
const DB = process.env.DATABASE;
const app = express();

// connect to database
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
.then(() => {
    console.log('DB connected')
})
.catch((err) => {
    console.log(`Error connecting to the database:\n ${err}`);
});

app.listen(PORT, () =>{
    console.log(`App listening on port ${PORT}`)
});
