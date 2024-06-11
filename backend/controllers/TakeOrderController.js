import User from "../models/UserModel.js";
import ItemToSell from "../models/SellModel.js";
import OrderDetails from "../models/OrderModal.js";

const TakeOrder = async (req, res) => {
  try {
    const listingId = req.body.id;
    const clientToken = req.body.token;

    const item = await ItemToSell.findById(listingId);
    const client = await User.findOne({ verificationToken: clientToken });

    // console.log("This is item", item);
    // console.log("This is client", client);

    const {
      userToken,
      userName,
      itemName,
      itemCost,
      itemDescription,
      contactNumber,
      pickupLocation,
    } = item;

    const images = item.images;

    const clientName = client.name;
    const clientNumber = client.phone;
    const clientAddress = client.address;

    // console.log("This is userToken", userToken);
    // console.log("This is userName", userName);
    // console.log("This is itemName", itemName);
    // console.log("This is itemCost", itemCost);
    // console.log("This is itemDescription", itemDescription);
    // console.log("This is contactNumber", contactNumber);
    // console.log("This is pickupLocation", pickupLocation);
    // console.log("This is images", images);
    // console.log("This is clientName", clientName);
    // console.log("This is clientNumber", clientNumber);
    // console.log("This is clientToken", clientToken")

    const order = new OrderDetails({
      clientName,
      clientNumber,
      clientAddress,
      clientToken,
      userToken,
      userName,
      itemName,
      itemCost,
      itemDescription,
      contactNumber,
      pickupLocation,
      images
    });

    try {
      await order.save();
      console.log("Order placed successfully!");
      return res.status(200).send("Order placed successfully!");
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).send("Internal server error");
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("Internal server error");
  }
};

export { TakeOrder };
