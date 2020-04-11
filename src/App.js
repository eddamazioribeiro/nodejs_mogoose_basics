const express = require('express');
const bodyParser= require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const slugify = require('slugify');

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

// middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// endpoints
app.get('/', (req, res) =>{
    res.status(200).send({
        message: 'Mongoose Essentials'
    })
});

app.post('/book', (req, res) => {
    console.log(req.body);
    var {title, author, category} = req.body;
    var slug = slugify(title);

    Book.create({slug, title, author, category}, (err, book) => {
        if(err){
            res.status(400).json({error: `Error creating new post\n ${err}`});
        } else {
            res.status(201).json(book);
        }
    });
});

app.get('/books', (req, res) => {
    Book.find({})
    .exec((err, books) => {
        if(err){
            res.status(404).send(`Error retrieving information from database\n ${err}`);
        } else {
            res.status(200).json(books);
        }
    })
});

app.get('/book/:slug', (req, res) => {
    var {slug} = req.params;

    Book.findOne({slug})
    .exec((err, book) => {
        if(err){
            res.status(404).send(`Error retrieving book\n ${err}`);
        } else {
            res.status(200).json(book);
        }
    });
});

app.put('/book/:slug', (req, res) => {
    var {slug} = req.params;
    var {title, author, category} = req.body;

    Book.findOneAndUpdate({slug}, {title, author, category}, {new: true})
    .exec((err, newBook) => {
        if(err){
            res.status(404).send(`Error retrieving book\n ${err}`);
        } else {
            res.status(200).json(newBook);
        }
    });
});

app.delete('/book/:slug', (req, res) => {
    var {slug} = req.params;
    console.log(slug);

    Book.findOneAndRemove({slug})
    .exec((err, book) =>{
        console.log(err);
        console.log(book);
        if(err){
            console.log(json(`Error deleting book from database\n ${err}`));
            res.status(404).json(`Error deleting book from database\n ${err}`);
        } else {
            console.log(book);            
            res.status(200).json(book);
        }
    })
});

// running the app
app.listen(PORT, () =>{
    console.log(`App listening on port ${PORT}`)
});
