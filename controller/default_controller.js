const Quote = require("../models/Quote.js")
const User = require("../models/User.js")

const randomQoute = (list)=>{
    const random = Math.floor(Math.random()*list.length)
    return list[random]
}

const render_home = async(req,res)=>{
    try{
        const quoteList = await Quote.find()
        const quote = randomQoute(quoteList)
        res.render("index", {quote, title: "Homepage"})
    }catch(err){
        res.status(500).send(err)
    }
}

module.exports = {render_home}