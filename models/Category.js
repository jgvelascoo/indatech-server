import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  name: { type: String, required:  true },
  enabled: { type: Boolean, default: true },
},
{
  collection: 'category'
});

var Category = mongoose.model("Category", categorySchema);

export default Category;