import User from "../models/UserModel.js";

const EditProfile = async (req, res) => {
  console.log("request ki body", req.body);
  const { name, email, phone, address } = req.body;
  try {
    const user = await User.updateOne(
      { verificationToken: req.body.token },
      { $set: { name, email, phone, address } }
    );
    return res.status(200).send(user);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("Internal server error");
  }
};

export { EditProfile };
