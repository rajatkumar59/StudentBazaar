import ItemToSell from "../models/SellModel.js";
import OrderDetails from "../models/OrderModal.js";

const ItemDetailsController = async (req, res) => {
  console.log("ItemDetailsController", req.body)
  if(req.body.type === "orderDetails") {
    try {
      const item = await OrderDetails.findById(req.body.id);
      // console.log({item});
      return res.status(200).send(item);
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).send("Internal server error");
    }
  }
  try {
    const item = await ItemToSell.findById(req.body.id);
    // console.log({item});
    return res.status(200).send(item);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("Internal server error");
  }
};

export { ItemDetailsController };