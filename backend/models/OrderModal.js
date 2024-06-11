import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  clientName: String,
  clientNumber: Number,
  clientAddress: String,
  clientToken: String,
  userToken: String,
  userName: String,
  itemName: String,
  itemCost: Number,
  itemDescription: String,
  contactNumber: Number,
  pickupLocation: String,
  images: [Object],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const OrderDetails = mongoose.model("Order", OrderSchema);

export default OrderDetails;
