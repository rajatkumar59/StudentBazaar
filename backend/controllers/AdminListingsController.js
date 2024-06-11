import ItemToSell from "../models/SellModel.js";

const ItemsListedByAdmin = async (req, res) => {
    try {
      const items = await ItemToSell.aggregate([
        {
          $project: {
            itemName: 1,
            itemCost: 1,
            userName: 1,
            image: { $arrayElemAt: ["$images", 0] },
          },
        },
      ]);
      return res.status(200).send(items);
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).send("Internal server error");
    }
  };

  export { ItemsListedByAdmin };