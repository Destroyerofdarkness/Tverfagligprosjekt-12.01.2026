

const render_home = (req,res)=>{
    try{
        res.render("index")
    }catch(err){
        res.status(500).send(err)
    }
}

module.exports = {render_home}