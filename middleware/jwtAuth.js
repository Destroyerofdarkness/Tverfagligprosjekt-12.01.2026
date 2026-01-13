const jwt = require("jsonwebtoken");
const User = require("../models/User")
const authenticate = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.secret, (err, decodedToken) => {
      if (err) {
        console.log("Error:", err);
        res.redirect("/sign-in");
      } else {
        console.log(decodedToken.id);
        next();
      }
    });
  } else {
    res.redirect("/sign-in");
  }
};

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log("User Token:", token);
  if (token) {
    jwt.verify(token, process.env.secret, async (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.locals.user = null;
        next();
      } else {
        console.log(decodedToken.id);
        const user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

const authorize = (req,res,next)=>{
  const user = req.params.user
  const loggedIn = res.locals.user.username
  if(user === loggedIn){
    next()
  }else{
    res.redirect(`/${user}`)
  }
}
module.exports = { authenticate, checkUser, authorize };
