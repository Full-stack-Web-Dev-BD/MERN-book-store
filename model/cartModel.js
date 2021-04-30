const mongoose=require('mongoose')
const Schema=mongoose.Schema

const cartSchema=new Schema({
    name:String,
    email:String,
    password:String,
})



const cartModel=mongoose.model('cartModel',cartSchema)
module.exports =cartModel