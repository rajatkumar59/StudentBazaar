import nodemailer from "nodemailer";
import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import "dotenv/config.js";
import dns from "dns";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_PASSWORD,
  },
});

const signup = async (req, res) => {
  const { name, email, phone, address, password } = req.body;
  console.log(req.body);

  // Check if the email is valid
  let validEmail = false;

  const emailParts = email.split("@");
  const domain = emailParts[1];

  try {
    const addresses = await dns.promises.resolveMx(domain);
    console.log("Addresses are : ",addresses)

    if (addresses && addresses.length !== 0) {
      console.log("Email domain exists and can receive emails.");
      validEmail = true;
    }
  } catch (error) {
    console.error(error);
    if (!validEmail) {
      console.log("Email domain does not exist or cannot receive emails.");
      return res.status(401).send({
        message: "Email domain does not exist or cannot receive emails.",
        errorName: "Invalid email",
      });
    }
  }

  // Check if a user with the same email already exists
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    // A user with the same email already exists
    console.log("Existing User");
    return res.status(400).send({
      message: "User already exists. Please login.",
      errorName: "Existing user",
    });
  }

  // Generate a verification token
  const verificationToken = jwt.sign({ email }, process.env.SECRET_KEY, {
    expiresIn: "1d", // Token expires in 1 day
  });

  // Create a new user with the verification token
  const newUser = new User({
    name,
    email,
    phone,
    address,
    password,
    isVerified: false,
    verificationToken,
  });

  try {
    await newUser.save();
    console.log("Saved new user : ", newUser)

    // Send a verification email to the user as the admin
    const verificationLink= `https://studentbazaar.in/verify-email?token=${verificationToken}`
    // const verificationLink= `http://localhost:5173/verify-email?token=${verificationToken}`


    await transporter.sendMail({
      from: "studentbazaar19@gmail.com",
      to: email,
      subject: "Verify your email",
      text: `Click the following link to verify your email: ${verificationLink}`,
    });

    res.send({
      message: "Signup successful. Please check your email for verification.",
    });
  } catch (error) {
    res.status(500).send({ message: "Signup failed. Please try again later." });
  }
};

const login = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    // No such user found
    console.log("User does not exist");
    return res.status(400).send({
      message: "User does not exist. Please signup.",
      errorName: "User does not exist",
    });
  }

  if (!existingUser.isVerified) {
    // Unverified user
    console.log("User is not verified");
    return res.status(400).send({
      message: "User is not verified. Please verify.",
      errorName: "User is not verified",
    });
  }

  if (existingUser.password !== password) {
    // Incorrect password
    console.log("Password is incorrect");
    return res.status(400).send({
      message: "Password is incorrect. Please try again.",
      errorName: "Password is incorrect",
    });
  }

  // Login successful
  console.log("Login successful");
  console.log(existingUser);
  res.status(200).send({ message: "Login successful.", token:existingUser.verificationToken,name:existingUser.name });
};

const verifyEmail = async (req, res) => {
  const { token } = req.query;
  console.log("This is verification token : ",token);

  try {
    // Verify the token and find the user
    const decoded = jwt.verify(token, "your_secret_key");
    const user = await User.findOne({ email: decoded.email });
    console.log("Entered");
    if (user) {
      user.isVerified = true;
      await user.save();
      res.send({ message: "Email verification successful." });
    } else {
      res
        .status(404)
        .send({ message: "Invalid token. Email verification failed." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Email verification failed." });
  }
};

export { signup, login, verifyEmail };
