const Listing = require("../models/listing.js");
const Booking = require("../models/booking.js");

// booking route
module.exports.book = async(req,res)=>{
  let{id} = req.params;
  let listdata = await Listing.findById(id);
  res.render("booking/bookform.ejs",{listdata})

}
// create new booking

module.exports.createbook = async (req, res) => {
  let { id } = req.params;
  let { checkIn, checkOut, guests } = req.body;

  // 1️⃣ Prevent double booking
  const existingBooking = await Booking.findOne({
    listing: id,
    $or: [
      {
        checkIn: { $lt: checkOut },
        checkOut: { $gt: checkIn },
      },
    ],
  });

  if (existingBooking) {
    req.flash("error", "Listing already booked for selected dates");
    return res.redirect(`/listings/${id}`);
  }

  // 2️⃣ Create booking
  let newBooking = new Booking({
    listing: id,
    user: req.user._id,
    checkIn,
    checkOut,
    guests,
  });

  await newBooking.save();

  req.flash("success", "Booking confirmed");
  res.redirect(`/listings/${id}`);
}

// show my booking route
module.exports.mybook = async (req, res) => {
  let mybook = await Booking.find({ user: req.user._id })
    .populate("listing");

  res.render("booking/showbook.ejs", { mybook });
}

// cancle booking
module.exports.cancelbook = async (req, res) => {
  let { id } = req.params;

  const booking = await Booking.findById(id);

  if (!booking) {
    req.flash("error", "Booking not found");
    return res.redirect("/mybookings");
  }

  // Only booking owner can cancel
  if (!booking.user.equals(req.user._id)) {
    req.flash("error", "You are not allowed to cancel this booking");
    return res.redirect("/mybookings");
  }

  await Booking.findByIdAndDelete(id);

  req.flash("success", "Booking cancelled successfully");
  res.redirect("/mybookings");
}