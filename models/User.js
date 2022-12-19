import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
  name: { type: String, required:  true },
  email: { type: String, required: true },
  password: { type: String, required: true },
},
{
  collection: 'user'
});

var User = mongoose.model("User", adminSchema);

export default User;