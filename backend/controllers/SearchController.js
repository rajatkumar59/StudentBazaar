import ItemToSell from "../models/SellModel.js";

const searchItem = async (req, res) => {
  console.log("Request body : ", req.body);
  const itemName = req.body.searchedItem;

  try {
    const items = await ItemToSell.find(
      { itemName: { $regex: itemName, $options: "i" } },
      {
        itemName: 1,
        itemCost: 1,
        userName: 1,
        category: 1,
        image: { $arrayElemAt: ["$images", 0] },
      }
    );

    return res.status(200).send(items);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("Internal server error");
  }
};

export { searchItem };
