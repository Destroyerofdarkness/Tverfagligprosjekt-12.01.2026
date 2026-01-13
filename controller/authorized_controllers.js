const User = require("../models/User.js");
const Quote = require("../models/Quote.js");
const user_page_priv_render = async (req, res, next) => {
  const username = req.params.user;
  try {
    console.log(username);
    const quotes = await User.findQuotes(username);
    const user = await User.findOne({ username: username });
    console.log(quotes);
    res.render("userPriv", { quotes, title: `Quotes - ${user.username}` });
  } catch (err) {
    res.status(500).send(err);
    next();
  }
};
const user_page_priv_post = async (req, res) => {
  try {
    await Quote.publish(req.body);
    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { user_page_priv_render, user_page_priv_post };
