const Book = require('../models/book');
const slugify = require('slugify');

exports.index = (req, res) =>{
    res.status(200).send({
        message: 'Mongoose Essentials'
    });
}

exports.create = (req, res) => {
    var {title, author, category} = req.body;
    var slug = slugify(title);

    Book.create({slug, title, author, category}, (err, book) => {
        if(err){
            res.status(400).json({error: `Error creating new post\n ${err}`});
        } else {
            res.status(201).json(book);
        }
    });
}

exports.listAll = (req, res) => {
    Book.find({})
    .exec((err, books) => {
        if(err){
            res.status(404).send(`Error retrieving information from database\n ${err}`);
        } else {
            res.status(200).json(books);
        }
    });
}

exports.findBySlug = (req, res) => {
    var {slug} = req.params;

    Book.findOne({slug})
    .exec((err, book) => {
        if(err){
            res.status(404).send(`Error retrieving book\n ${err}`);
        } else {
            res.status(200).json(book);
        }
    });
}

exports.update = (req, res) => {
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
}

exports.remove = (req, res) => {
    var {slug} = req.params;

    Book.findOneAndRemove({slug})
    .exec((err, book) =>{
        console.log(book);
        if(err){
            console.log(json(`Error deleting book from database\n ${err}`));
            res.status(404).json(`Error deleting book from database\n ${err}`);
        } else {
            console.log(book);            
            res.status(200).json(book);
        }
    });
}