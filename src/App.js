const express = require('express');
const bodyParser= require('body-parser');
const mongoose = require('mongoose');

const PORT = 8080;
const app = express();

app.listen(PORT, () =>{
    console.log(`App listening on port ${PORT}`)
});
