import mongoose from "mongoose";

const inventorySchema = mongoose.Schema({
  category: String,
  subcategory: String,
  brand: String,
  model: String,
  version: String,
  price: Number,
  discount: Number,
  finalPrice: Number,
  quantity: Number,
  processor: String,
  ram: String,
  storage: String,
  screen: String,
  graphics: String,
  details: String,
  status: String,
  folder: String,
  mainImg: String,
  othersImg: [String],
  location: [String],
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },  
  enabled: { 
    type: Boolean, 
    default: true },
},
{
  collection: 'inventory'
})

let Inventory = mongoose.model("Inventory", inventorySchema);

export default Inventory;