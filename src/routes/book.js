const express = require('express');
const router = express.Router();
const {index, listAll, findBySlug, create, update, remove} = require('../controllers/book');

router.get('/', index);
router.get('/books', listAll);
router.get('/book/:slug', findBySlug);
router.post('/book', create);
router.put('/book/:slug', update);
router.delete('/book/:slug', remove);

module.exports = router;