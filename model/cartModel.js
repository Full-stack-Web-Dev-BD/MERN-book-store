const mongoose=require('mongoose')
const Schema=mongoose.Schema

const cartSchema=new Schema({
    CartID:Schema.Types.ObjectId,
    BookID:Array,
    UserID:Schema.Types.ObjectId,
    Quantity:Number
})



const cartModel=mongoose.model('cartModel',cartSchema)
module.exports =cartModel