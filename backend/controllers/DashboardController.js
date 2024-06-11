import ItemToSell from "../models/SellModel.js";

const dashboardListItems = async (req, res) => {
  // Retrieve the category from the request
  const category = req.body.category;

  console.log("Hello guys category is : ", category);

  let limit, page;

  // Retrieve the limit parameter from the query string, default to 5 if not provided
  limit = parseInt(req.query.limit) || 8;

  // Retrieve the cursor parameter from the query string
  page = req.query.page;
  console.log(page);
  // if (req.body.rendering == "admin") {
  //   limit = 8;
  //   page = 1;
  // }

  try {
    let aggregationPipeline = [
      {
        $project: {
          itemName: 1,
          itemCost: 1,
          userName: 1,
          category: 1,
          image: { $arrayElemAt: ["$images", 0] },
        },
      },
      {
        $sort: {
          _id: -1 // Sort in descending order based on _id field (assuming it represents creation time)
        }
      }
    ];

    if (category !== "" && category !== null && category !== undefined) {
      aggregationPipeline.unshift({
        $match: {
          category: category,
        },
      });
    }

    const items = await ItemToSell.aggregate(aggregationPipeline)
      .skip((page - 1) * 8)
      .limit(limit);

    return res.status(200).send(items);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("Internal server error");
  }
};

const totalNumberOfItems = async (req, res) => {
  try {
    const count = await ItemToSell.countDocuments();
    console.log(count);
    return res.status(200).send({ count });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("Internal server error");
  }
};

export { dashboardListItems, totalNumberOfItems };
