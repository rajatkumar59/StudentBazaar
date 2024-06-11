import OrderDetails from "../models/OrderModal.js";

const DeleteOrder = async (req, res) => {
  try {
    console.log("DeleteItemController.js: req.body.id:", req.body.id);
    const item = await OrderDetails.findOneAndDelete({
      _id: req.body.id,
    }).exec();
    return res.status(200).send(item);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("Internal server error");
  }
};

export { DeleteOrder };