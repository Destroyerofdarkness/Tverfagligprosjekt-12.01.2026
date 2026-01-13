const Quote = require("../models/Quote.js")
const User = require("../models/User.js")

const randomQoute = (list)=>{
    const random = Math.floor(Math.random()*list.length)
    return list[random]
}

const user_page_public_render =async(req,res, next)=>{
    const username = req.params.user
    try{
        console.log(username)
        const quotes = await User.findQuotes(username)
        const user = await User.findOne({username:username })
        console.log(quotes)
        res.render("userPub",{quotes, title: `${user.username}'s quotes`})
    }catch(err){
        console.log(err)
        res.status(500)
        next()
    }
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

module.exports = {render_home,
    user_page_public_render
}