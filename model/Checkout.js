const mongoose=require('mongoose')
const Schema=mongoose.Schema

const checkOutSchema=new Schema({
    totalPrice:String,
    fullName:String,
    companyName:String,
    adl1:String,
    adl2:String,
    city:String,
    rsD:String,
    country:String,
    pz:String,
})



const checkOut=mongoose.model('checkOut',checkOutSchema)
module.exports =checkOut