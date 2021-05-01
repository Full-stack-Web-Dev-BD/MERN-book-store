const BookModel = require('../model/bookModel')
const bookRouter = require('express').Router()

bookRouter.get('/getallbook', (req, res) => {
    BookModel.find((err, doc) => {
        if (err) {
            res.json(err)
            return console.log(err)
        }
        res.json(doc)
    })
})



bookRouter.post('/search', (req, res) => {
    const text = req.body.text
    const splited = text.split(/[ ,]+/);

    BookModel.find()
        .then(books => {
            let result = []
            books.map(book => {
                let x = book.BookName
                let splitedBook = x.split(' ')
                splitedBook.map(word => {
                    splited.map(sp => {
                        if (word === sp) {
                            return result.push(book)
                        }
                    })
                })
            })
            return res.status(200).json(result)
        })
        .catch(err => {
            return res.json({ message: 'error' })
        })
})
bookRouter.get('/getsingle/:id', (req, res) => {
    BookModel.findOne({ _id: req.params.id })
        .then(doc => {
            return res.json(doc)
        })
        .catch(err => {
            console.log(err)
            return res.json({ err })
        })
})

bookRouter.post('/searchcategory', (req, res) => {
    console.log(req.body)
    BookModel.find({ Category: req.body.category })
        .then(doc => {
            console.log(doc)
            res.json(doc)
        })
        .catch(err => {
            return res.json({ message: 'error' })
        })
})
module.exports = bookRouter