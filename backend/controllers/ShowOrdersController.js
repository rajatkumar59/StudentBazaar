import OrderDetails from "../models/OrderModal.js";

const ShowOrders = async (req, res) => {
  try {
    const items = await OrderDetails.aggregate([
    //   {
    //     $match: {
    //       userToken: req.body.token,
    //     },
    //   },
      {
        $project: {
          clientName: 1,
          clientNumber: 1,
          clientAddress: 1,
          itemName: 1,
          itemCost: 1,
          userName: 1,
          image: { $arrayElemAt: ["$images", 0] },
        },
      },
    ]);
    console.log("Items are : ", items);
    return res.status(200).send(items);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("Internal server error");
  }
};

const ShowMyOrders = async (req, res) => {
  try {
    console.log("Token", req.body.token)
    const items = await OrderDetails.aggregate([
      {
        $match: {
          clientToken: req.body.token,
        },
      },
      {
        $project: {
          clientName: 1,
          clientNumber: 1,
          itemName: 1,
          itemCost: 1,
          userName: 1,
          image: { $arrayElemAt: ["$images", 0] },
        },
      },
    ]);
    console.log("Items are : ", items);
    return res.status(200).send(items);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("Internal server error");
  }
}

export { ShowOrders, ShowMyOrders };
