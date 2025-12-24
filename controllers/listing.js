const Listing = require("../models/listing.js");

// index route
module.exports.index = async(req,res)=>{
    const lists = await Listing.find({});
    res.render("listings/index.ejs",{lists});
}

// show route
module.exports.show = async (req, res) => {
  const { id } = req.params;

  const listdata = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",   // 👈 populate review author
      },
    })
    .populate("owner");

  if (!listdata) {
    req.flash("error", "Listing does not exist");
    return res.redirect("/listings");
  }

  res.render("listings/show.ejs", { listdata });
}

// add new listing route

module.exports.addnewlist = async(req,res,next)=>{
   
     let{title,description,price,image,location,country} = req.body;

     let newdata = new Listing({
  title,
  description,
  price,
  image,
  location,
  country,
  
});


newdata.owner = req.user._id;  // user which is logging now
await newdata.save();   

req.flash("success", "New listing created!");
res.redirect("/listings");


}

// edit listing form
module.exports.editlistForm = async(req,res)=>{
    let{id} = req.params;
    const listdata = await Listing.findById(id);
    if (!listdata) {
    throw new ExpressError( 404,"Listing not found");
}

    res.render("listings/edit.ejs",{listdata})
}

// edit listing
module.exports.editlist = async(req,res)=>{
    let{id} = req.params;
   

    let{title,description,price,image,location,country} = req.body;
  await Listing.findByIdAndUpdate(
  id,
  { title, description, price, image, location, country },
  { new: true, runValidators: true }
);
req.flash("success"," listing updated !");
  res.redirect(`/listings/${id}`);
}

// destroy/delete listing route

module.exports.deletelist = async (req,res)=>{
    let{id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success"," listing deleted !");
    res.redirect("/listings");
}