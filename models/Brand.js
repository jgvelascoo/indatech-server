import mongoose from "mongoose";

const brandSchema = mongoose.Schema({
  name: { type: String, required:  true },
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  enabled: { type: Boolean, default: true },
},
{
  collection: 'brand'
});

var Brand = mongoose.model("Brand", brandSchema);

export default Brand;