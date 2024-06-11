import React, { useState } from "react";
import axios from "axios";
import Input from "../Input/Input";
import { BlueButton } from "../Buttons/Buttons";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // New state for password visibility
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Function to handle signup
  const handleSignup = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("New user signup");
    console.log("Name : ", name);
    console.log("Email : ", email);
    console.log("Phone : ", phone);
    console.log("Address : ", address)
    console.log("Password : ", password);
    axios
      .post("/api/auth/signup", { name, email, phone, address, password })

      .then((res) => {
        alert(res.data.message);
        setName("");
        setEmail("");
        setPhone("");
        setAddress("");
        setPassword("");
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          // If the response status is 400, it's a duplicate user
          alert(err.response.data.message);
          setName("");
          setEmail("");
          setPhone("");
          setAddress("");
          setPassword("");
        } else if (err.response && err.response.status === 401) {
          alert("Invalid Email");
        } else {
          console.log(err);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center">Sign Up</h2>
        <form onSubmit={handleSignup}>
          <Input
            label="Name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Phone"
            type="number"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Input
            label="Address"
            type="text"
            placeholder="Enter your address"
            value={address}
          onChange={(e) => setAddress(e.target.value)}
          />
          <div className="flex flex-ro items-center justify-between">
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <i
              className={`fa-solid fa-eye-slash cursor-pointer ${
                showPassword ? "fa-eye" : "fa-eye-slash"
              }`}
              onClick={() => setShowPassword(!showPassword)}
            ></i>
          </div>
          <div className="text-center">
            <BlueButton val="Sign Up" loading={loading} />
          </div>
        </form>
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
