import mongoose from "mongoose";

const subcategorySchema = mongoose.Schema({
  name: { type: String, required:  true },
  category: { type: String, required: true },
  enabled: { type: Boolean, default: true },
},
{
  collection: 'subcategory'
});

var SubCategory = mongoose.model("SubCategory", subcategorySchema);

export default SubCategory;