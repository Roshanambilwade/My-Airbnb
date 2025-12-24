const mongoose = require("mongoose");
const Listing = require("../models/listing.js")


main()
.then((res)=>{
    console.log("connected")
})
.catch(err =>{
    console.log(err)
})

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}
Listing.insertMany([
  {
    title: "Cozy Beachfront Cottage",
    description:
      "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
    image:
      "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    price: 1500,
    location: "Malibu",
    country: "United States",
    owner: "6942da1dd6d23d3714e84d97",
  },
  {
    title: "Modern Loft in Downtown",
    description:
      "Stay in the heart of the city in this stylish loft apartment. Perfect for urban explorers!",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    price: 1200,
    location: "New York City",
    country: "United States",
    owner: "6942da1dd6d23d3714e84d97",
  },
  {
    title: "Mountain Retreat",
    description:
      "Unplug and unwind in this peaceful mountain cabin. Surrounded by nature, it's a perfect place to recharge.",
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    price: 1000,
    location: "Aspen",
    country: "United States",
    owner: "6942da1dd6d23d3714e84d97",
  },
  {
    title: "Historic Villa in Tuscany",
    description:
      "Experience the charm of Tuscany in this beautifully restored villa. Explore the rolling hills and vineyards.",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    price: 2500,
    location: "Florence",
    country: "Italy",
    owner: "6942da1dd6d23d3714e84d97",
  },
  {
    title: "Secluded Treehouse Getaway",
    description:
      "Live among the treetops in this unique treehouse retreat. A true nature lover's paradise.",
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    price: 800,
    location: "Portland",
    country: "United States",
    owner: "6942da1dd6d23d3714e84d97",
  },
  {
    title: "Luxury Safari Lodge",
    description:
      "Embark on a safari adventure while staying in a luxurious lodge. Witness wildlife like never before.",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    price: 3000,
    location: "Maasai Mara",
    country: "Kenya",
    owner: "6942da1dd6d23d3714e84d97",
  },
  {
    title: "Charming Ryokan",
    description:
      "Immerse yourself in Japanese culture at this traditional ryokan. Enjoy tatami mats and hot springs.",
    image:
      "https://images.unsplash.com/photo-1544986581-efac024faf62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    price: 900,
    location: "Kyoto",
    country: "Japan",
    owner: "6942da1dd6d23d3714e84d97",
  },
  {
    title: "Arctic Igloo Experience",
    description:
      "Watch the Northern Lights from your glass igloo in the Arctic Circle. A once-in-a-lifetime experience.",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    price: 2200,
    location: "Lapland",
    country: "Finland",
    owner: "6942da1dd6d23d3714e84d97",
  },
  {
    title: "Desert Oasis Camp",
    description:
      "Discover the magic of the desert in a comfortable oasis camp. Ride camels and stargaze at night.",
    image:
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    price: 700,
    location: "Sahara",
    country: "Morocco",
    owner: "6942da1dd6d23d3714e84d97",
  },
  {
    title: "Countryside B&B",
    description:
      "Relax in a cozy bed and breakfast in the peaceful countryside. Enjoy homemade meals and fresh air.",
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    price: 600,
    location: "Cotswolds",
    country: "United Kingdom",
    owner: "6942da1dd6d23d3714e84d97",
  },
  {
    title: "Overwater Bungalow",
    description:
      "Stay in a luxurious overwater bungalow with direct access to the crystal-clear sea.",
    image:
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    price: 4000,
    location: "Bora Bora",
    country: "French Polynesia",
    owner: "6942da1dd6d23d3714e84d97",
  },
  {
    title: "Rustic Farmhouse",
    description:
      "Experience life on a farm in this charming rustic farmhouse. Help with chores or simply relax.",
    image:
      "https://images.unsplash.com/photo-1586105251261-72a756497a12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    price: 500,
    location: "Napa Valley",
    country: "United States",
    owner: "6942da1dd6d23d3714e84d97",
  },
  {
    title: "Ski-In/Ski-Out Chalet",
    description:
      "Hit the slopes right from your doorstep in this comfortable ski chalet with mountain views.",
    image:
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    price: 1800,
    location: "Whistler",
    country: "Canada",
    owner: "6942da1dd6d23d3714e84d97",
  },
  {
    title: "Beachfront Villa",
    description:
      "Enjoy a private beach and stunning sunsets in this luxurious beachfront villa.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    price: 3500,
    location: "Phuket",
    country: "Thailand",
    owner: "6942da1dd6d23d3714e84d97",
  },
  {
    title: "Cave Hotel",
    description:
      "Stay in a unique cave hotel with modern amenities in a historic setting.",
    image:
      "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    price: 1100,
    location: "Cappadocia",
    country: "Turkey",
    owner: "6942da1dd6d23d3714e84d97",
  },
  {
    title: "Jungle Eco-Lodge",
    description:
      "Connect with nature in this sustainable eco-lodge nestled in the jungle.",
    image:
      "https://images.unsplash.com/photo-1501117716987-c8e1ecb2105c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    price: 950,
    location: "Costa Rica",
    country: "Costa Rica",
    owner: "6942da1dd6d23d3714e84d97",
  },
  {
    title: "Houseboat Stay",
    description:
      "Stay on a charming houseboat and enjoy life on the water with all modern comforts.",
    image:
      "https://images.unsplash.com/photo-1523287562758-66c7fc58967a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    price: 1300,
    location: "Kerala",
    country: "India",
    owner: "6942da1dd6d23d3714e84d97",
  },
  {
    title: "City Penthouse",
    description:
      "Live the high life in this luxurious penthouse with panoramic city views.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    price: 5000,
    location: "Dubai",
    country: "United Arab Emirates",
    owner: "6942da1dd6d23d3714e84d97",
  },
  {
    title: "Mediterranean Escape",
    description:
      "Relax by the sea in this beautiful Mediterranean villa with private pool.",
    image:
      "https://images.unsplash.com/photo-1590490359683-658d3d94b83a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    price: 2700,
    location: "Santorini",
    country: "Greece",
    owner: "6942da1dd6d23d3714e84d97",
  },
]);

