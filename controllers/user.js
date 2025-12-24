const { model } = require("mongoose");
const User = require("../models/user.js");

module.exports.signUp = async (req, res) => {
    try{
    let { username, email, password } = req.body;
  const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);  // it check usernane is unique or not otherwies throw an error
  
   req.login(registeredUser, err => {
      if (err) return next(err);
      req.flash("success", "Welcome to Wanderlust!");  // automatic login after sign up 
      res.redirect("/listings");
    });
    }
    catch(e){
        req.flash("error",e.message)
        res.redirect("/signUp");
    }

  
}

module.exports.login = async (req, res) => {
    req.flash("success", "Welcome back to Wanderlust!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
  }

  // logout route

  module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "Logged you out!");
    res.redirect("/listings");
  });
}