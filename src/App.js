const express = require('express');
const bodyParser= require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const PORT = process.env.PORT;
const app = express();


app.listen(PORT, () =>{
    console.log(`App listening on port ${PORT}`)
});
