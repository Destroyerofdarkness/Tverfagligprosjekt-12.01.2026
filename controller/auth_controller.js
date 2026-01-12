const User = require("../models/User.js")


const render_login = (req, res) => {
  try {
    res.render("login", { title: "Sign In" });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const render_register = (req, res) => {
  try {
    res.render("register", { title: "Sign Up" });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const sign_up_user = async(req,res)=>{
    const {passwd,conPass} = req.body
    try{
        if(passwd === conPass){
        const userId = await User.register(req.body)
        
        res.redirect("/")
        }else{
            throw Error("Password doesn't match")
        }
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
}


module.exports = {render_login, render_register, sign_up_user}
