const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const { handleUserError } = require("../handlers/errorHandlers.js");
const maxValidDate = 24 * 60 * 60;
const signJwt = (id) => {
  return jwt.sign({ id }, process.env.secret, {
    expiresIn: maxValidDate,
  });
};

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

const sign_in_user = async (req, res) => {
  try {
    const userId = await User.login(req.body);
    const token = signJwt(userId);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxValidDate * 1000 });
    res.status(200).json({success:true})
  } catch (err) {
    console.log(err);
     const errors = handleUserError(err);
    res.status(300).json({ errors });
  }
};

const sign_up_user = async (req, res) => {
  try {
    const userId = await User.register(req.body);
    const token = signJwt(userId);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxValidDate * 1000 });
    res.status(200).json({ success: true });
  } catch (err) {
    const errors = handleUserError(err);
    res.status(300).json({ errors });
  }
};

const sign_out_user =(req,res)=>{
  try{
    res.cookie("jwt","",{httpOnly: true, maxAge: 10 })
    res.status(200).redirect("/sign-in")
  }catch(err){
    console.log(err)
    res.status(300).send(err)
  }
};

module.exports = { render_login, render_register, sign_up_user, sign_in_user,sign_out_user };
