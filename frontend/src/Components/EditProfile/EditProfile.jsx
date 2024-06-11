import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Input from "../Input/Input";
import { BlueButton } from "../Buttons/Buttons";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext";

const EditProfile = () => {
  const { currentUser } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.post("/api/profile", { token: currentUser.token }).then((res) => {
      setName(res.data.name);
      setPhone(res.data.phone);
      setAddress(res.data.address);
      setLoading(false);
    });
  }, []);

  // Function to handle signup
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone || !address || !password) {
      alert("Please fill all the fields");
      return;
    }

    // setLoading(true);
    axios
      .post("/api/editProfile", {
        name,
        phone,
        address,
        password,
        token: currentUser.token,
      })

      .then((res) => {
        alert("Profile updated successfully!");
        navigate("/profile");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center">Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <Input
            label="Name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            <BlueButton val="Submit" loading={loading} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
