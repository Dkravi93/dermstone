const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  title: {
    type: String,
    text : true,
    trim: true,
    maxLength: [100, "Product name cannot exceed 100 characters"],
  },
  price: {
    type: Number,
    required: [true, "Please enter product price"],
    maxLength: [5, "Price cannot exceed 5 characters"],
    default: 0.0,
  },
  description: {
    type: String,
    required: [true, "Please enter product description"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  MSRP :{
    type: Number,
    default: 0,
  },
  category : {
    type : String,
    enum : ["men", "SkinMedica", "BestSellers", "Neocutis", "NewArrivals", "skinCare", "Beauty"],
    required : [true,`Please select the valid category`]
  },
  reviews: {
    type: Number,
    default: 0,
  },
  image : {
    type: String,
    required: [true, "Please enter product image"],
  },
  qty: {
    type: Number,
    default: 0,
  },

},
{
    timestamps : true,
    versionKey : false,
})



productSchema.index( { name : 'text' });

module.exports = mongoose.model("Product", productSchema);
