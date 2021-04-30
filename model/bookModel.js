const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = new Schema({
    BookId: {
        type: Schema.Types.ObjectId,
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
    Arrival: {
        type: String,
        required: true
    }
})



const bookModel = mongoose.model('bookModel', bookSchema)
module.exports = bookModel