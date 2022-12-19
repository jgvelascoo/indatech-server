import mongoose from "mongoose";

const locationSchema = mongoose.Schema({
  name: { type: String, required:  true },
  enabled: { type: Boolean, default: true },
},
{
  collection: 'location'
});

var Location = mongoose.model("Location", locationSchema);

export default Location;