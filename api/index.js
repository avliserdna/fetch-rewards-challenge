
let dotenv = require('dotenv').config()
const express = require('express');

const app = express()

// Project using Mongoose to connect MongoDB
const mongoose = require('mongoose')

const db = mongoose.connection

const uri = process.env.uri

mongoose.connect(uri, {useNewUrlParser:true})
db.on('error', (error) => console.error(error));
db.once('open', () => console.log("Server is on."))
app.use(express.json())
const port = process.env.PORT; // Port value from .env

// Router and Routes go here

app.listen(port, () => console.log(`Server is listening on port ${port}`))
