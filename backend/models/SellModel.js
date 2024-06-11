import mongoose from "mongoose";

const sellingSchema = new mongoose.Schema({
  userToken: String,
  userName: String,
  itemName: String,
  itemCost: Number,
  itemDescription: String,
  category: String,
  contactNumber: Number,
  pickupLocation: String,
  images:  [Object],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ItemToSell = mongoose.model("Item", sellingSchema);

export default ItemToSell;
