const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var BookSchema = new Schema({
    title: String,
    authot: String,
    category: String
});

module.exports = mongoose.model('Book', BookSchema);