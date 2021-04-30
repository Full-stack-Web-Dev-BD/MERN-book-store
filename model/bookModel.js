const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = new Schema({
    BookId: {
        type: String,
        required: true
    },
    BookName: {
        type: String,
        required: true
    },
    Publisher: {
        type: String,
        required: true
    },
    Category: {
        type: String,
        required: true
    },
    Lang: {
        type: String,
        required: true
    },
    Author: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    Price: {
        type: Number,
        required: true
    },
    Published: {
        type: String,
        required: true
    },
    NewArrival: {
        type: String,
        required: true
    },
    Img: String
})



const bookModel = mongoose.model('bookModel', bookSchema)
module.exports = bookModel