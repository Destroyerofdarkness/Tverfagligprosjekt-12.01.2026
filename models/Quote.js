const {Schema, model} = require("mongoose");


const quoteSchema = new Schema({
    quote:{
        type: String,
        required: [true, "Enter the content of the Quote"],
        maxLength: [100, "The max length of the quote is 100 characters"],
        unique: true, 
    },
    origin:{
        type:String,
        required:[true, "Enter the origin of the Quote"],
    },
    createdBy:{
        type:String,
        required:true, 
    }
})

quoteSchema.statics.publish = async (info)=>{
const newQuote = await new Quotes({
    quote:info.quote,
    origin:info.origin,
    createdBy:info.user
})
await newQuote.save()
return;
}


const Quotes = model("Quotes", quoteSchema)
module.exports = Quotes