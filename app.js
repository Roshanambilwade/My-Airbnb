require("dotenv").config();




const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js")
const Review = require("./models/reviews.js");
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/expressError.js");
const session = require("express-session");




const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const Booking = require("./models/booking.js");


 const { listingSchema, reviewSchema } = require("./schema.js");
const { isLoggedIn , saveRedirectUrl , isOwner, isReviewAuthor} = require("./middleware.js");
//
// aquire backend logic
const listcontroller = require("./controllers/listing.js");
const reviewcontroller = require("./controllers/review.js");
const usercontroller = require("./controllers/user.js");
const bookcontroller = require("./controllers/booking.js");
const { title } = require("process");

app.set("view engine","ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));  // for parsing form data
app.use(express.json());    
app.use(methodOverride("_method")); 
app.engine('ejs', ejsMate);   

mongoose.set("strictQuery", false);  // because i use mongo 6 not 7
const port = process.env.PORT || 8080;

const atlasUrl = process.env.ATLAS;
main()
.then((res)=>{
    console.log("connected")
})
.catch(err =>{
    console.log(err)
})

async function main() {
    await mongoose.connect(atlasUrl);
   
    
}

const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        const errMsg = error.details.map(el => el.message).join(",");
        throw new ExpressError(400,errMsg); // fixed order
    }
    next();
};
const validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        const errMsg = error.details.map(el => el.message).join(",");
        throw new ExpressError(400,errMsg); // fixed order
    }
    next();
};





app.use(session({
  
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
   cookie: {
   // expires:Date.now()+7*24*60*60*1000,  any one maxage or expires
    httpOnly: true,
   maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
  }
}));
app.use(flash());
app.use(passport.initialize());  // use password
app.use(passport.session());  // use sessions 

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.curruser = req.user;
  next();
});

/// demo user 

// app.get("/User", async (req, res) => {
//   let fakeUser = new User({
//     email: "student@gmail.com",
//     username: "delta-student",
//   });

//   let newUser = await User.register(fakeUser, "helloworld");  // hellworld = password
//   res.send(newUser);
// });


// new route
app.get("/listings/new",isLoggedIn,(req,res)=>{
    // if(!req.isAuthenticated()){  // checks is user logged in or not using sessions  // used isLoggedIn middleware for clearity
    //     req.flash("error","you must be loggeg in to create listing !")
    //     return res.redirect("/login");
    // }
    res.render("listings/add.ejs");
})


// index route
app.get("/listings", wrapAsync(listcontroller.index));

// show listing route
app.get("/listings/:id", wrapAsync(listcontroller.show));

// add new listing route

app.post("/listings",validateListing,wrapAsync(listcontroller.addnewlist));

// edit listing form foute route
app.get("/listings/:id/edit",isLoggedIn,isOwner,wrapAsync(listcontroller.editlistForm));

// edit listing route
app.patch("/listings/:id",validateListing,isLoggedIn,isOwner,wrapAsync(listcontroller.editlist));
// delete route

app.delete("/listings/:id",isLoggedIn,isOwner,wrapAsync(listcontroller.deletelist));

// root route
// app.get("/",(req,res)=>{
//     res.redirect("/listings");
// })




// review crete route

app.post("/listings/:id/review",isLoggedIn,validateReview,wrapAsync(reviewcontroller.createreview));
    
/// delete rerview route

app.delete("/listings/:id/review/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewcontroller.deletereview))


// user routes
// new user signup form

app.get("/signUp",(req,res)=>{
    res.render("users/signup.ejs")
})

// new user signUp

app.post("/signUp", wrapAsync(usercontroller.signUp));

// user login form
app.get("/login", (req, res) => {
  res.render("users/login.ejs");
});

// user login
app.post(
  "/login",saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true, 
  }),
  usercontroller.login
);

/// user logout 
app.get("/logout", usercontroller.logout);

// find route
app.post("/find",wrapAsync(async(req,res)=>{
  let{hotel} = req.body;
  let found = await Listing.findOne({
  title: { $regex: hotel, $options: "i" }
});

  if(!found){
    req.flash("error","hotel does not exist");
    return res.redirect("/listings")
  }
  res.redirect(`/listings/${found._id}`);
}))

// booking route
app.get("/listing/:id/book",isLoggedIn,wrapAsync(bookcontroller.book))

app.post("/booking/:id", isLoggedIn, wrapAsync(bookcontroller.createbook));

// show booking route
app.get("/mybookings", isLoggedIn, wrapAsync(bookcontroller.mybook));

// Cancel booking
app.delete("/booking/:id", isLoggedIn,wrapAsync(bookcontroller.cancelbook));

// 404 handler (no route matched)
app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

// error handling middleware
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err); // ✅ DO NOT render again
  }

  const { status = 500, message = "Something went wrong!" } = err;
  res.status(status).render("error.ejs", { message });
});




app.listen(port,()=>{
    console.log("listening on port 8080");
})