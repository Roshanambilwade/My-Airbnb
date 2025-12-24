const mongoose = require("mongoose");
const Review = require("./reviews.js");

const schema = mongoose.Schema;

const ListingSchema = new schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    image:{
        type:String,
        default:"https://plus.unsplash.com/premium_photo-1661915661139-5b6a4e4a6fcc?q=80&w=1267&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        set: (v) => v=== "" ? "https://plus.unsplash.com/premium_photo-1661915661139-5b6a4e4a6fcc?q=80&w=1267&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D":v,
    },
    price:{
        type:Number,
        required: true,
       min: 0,
    },
    location:{
        type:String,
    },
    country:{
        type:String,
    },
     reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
    ],
    owner: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
},


});

ListingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({
            _id: { $in: listing.reviews }
        });
    }
});

const Listing = mongoose.model("Listing",ListingSchema);

module.exports = Listing;