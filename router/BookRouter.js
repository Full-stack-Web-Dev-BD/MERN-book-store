const BookModel= require('../model/bookModel')
const  bookRouter= require('express').Router()

bookRouter.get('/getallbook',(req,res)=>{
    BookModel.find((err, doc)=>{
        if(err){
            return console.log(err)
        }
        res.json(doc)
    })
})



module.exports= bookRouter