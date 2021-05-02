const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
const mongoos = require('mongoose')
const userRouter = require('./router/userRouter')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
var fs = require('fs');
const path = require('path');

// Import  custom files 
const BookModel = require('./model/bookModel')
const bookRouter = require('./router/BookRouter')


var obj = JSON.parse(fs.readFileSync('./data.json', 'utf8'));

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())







app.use(userRouter)
app.use(bookRouter)
if (true) {
    // Serve static assets if in production
    app.use(express.static("client/build"));

    // index.html for all page routes
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}
// const mongoURI = 'mongodb+srv://user:user@mern.a77ou.mongodb.net/akh-analytic?retryWrites=true&w=majority'
const mongoURI = 'mongodb://localhost/booklist'
app.listen(PORT, () => {
    mongoos.connect(mongoURI, { useFindAndModify: false, useUnifiedTopology: true, useNewUrlParser: true }, (err => {
        if (err) {
            console.log(err)
            return
        } else {
            console.log('Mongodb  connected')

            // insert  data to mongodb  for first time  if  database empty !!!!
            BookModel.find((err, doc) => {
                if (err) {
                    console.log(err)
                }
                if (doc.length === 0) {
                    console.log('Loading Database !!')
                    console.log(doc)
                    obj.map(el => {
                        new BookModel(el)
                            .save()
                            .then(saved => {
                                console.log('Loading ... ')
                            })
                            .catch(err => {
                                console.log(err)
                            })
                    })
                }
            })
        }
    }))
    console.log(`Server started on port `, PORT)
})
