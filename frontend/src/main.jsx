import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Route,
  RouterProvider,
  Routes,
  Navigate,
  BrowserRouter,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "../Layout.jsx";
import Home from "./Components/Home/Home.jsx";
import AboutSection from "./Components/About/About.jsx";
import ContactSection from "./Components/Contact/Contact.jsx";
import Login from "./Components/Login/Login.jsx";
import Signup from "./Components/Signup/Signup.jsx";
import Verification from "./Components/VerificationPage/VerificationPage.jsx";
import Profile from "./Components/Profile/Profile.jsx";
import Seller from "./Components/Seller/Seller.jsx";
import ItemInfo from "./Components/ItemInfo/ItemInfo.jsx";
import Orders from "./Components/Orders/Orders.jsx";
import MyOrders from "./Components/MyOrders/MyOrders.jsx";
import OrderInfo from "./Components/OrderInfo/OrderInfo.jsx";
import Updation from "./Components/Updation/Updation.jsx";
import { AuthContextProvider } from "./Contexts/AuthContext.jsx";
import { ItemContextProvider } from "./Contexts/ItemContext.jsx";
import { AdminListings } from "./Components/AdminListings/AdminListings.jsx";
import EditProfile from "./Components/EditProfile/EditProfile.jsx";
import Sell from "./Components/Sell/Sell.jsx";
import axios from "axios";

import { AuthContext } from "./Contexts/AuthContext.jsx";

const App = () => {
  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser &&
      currentUser.token ===
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjIxMDA1MjE1MjAwNDFAaWV0bHVja25vdy5hYy5pbiIsImlhdCI6MTcwMTEwODc5MiwiZXhwIjoxNzAxMTk1MTkyfQ.tuoLoyp6HZLgUTqtQy1QTTA5P4Qlc_1uKGO0RRwYtzM" ? (
      children
    ) : (
      <Navigate to="/login" />
    );
  };
  // Set up axios base URL
  // axios.defaults.baseURL = "http://localhost:5000";
  axios.defaults.baseURL = "https://dark-gray-butterfly-yoke.cyclic.app";

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Home key="base" category="" />} />
          <Route path="about" element={<AboutSection />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route
            path="search/:searchedItem"
            element={<Home category="" search="yes" />}
          />
          <Route path="books" element={<Home key="books" category="Books" />} />
          <Route
            path="electronics"
            element={<Home key="electronics" category="Electronics" />}
          />
          <Route
            path="furniture"
            element={<Home key="furniture" category="Furniture" />}
          />
          <Route path="other" element={<Home key="other" category="Other" />} />
          <Route path="Sells" element={<Sell />} />
          <Route
            path="updateItem/:id"
            element={
              <RequireAuth>
                <Updation />
              </RequireAuth>
            }
          />
          <Route path="verify-email" element={<Verification />} />
          <Route path="profile" element={<Profile />} />
          <Route
            path="sell"
            element={
              <RequireAuth>
                <Seller />
              </RequireAuth>
            }
          />
          <Route path="item/:id" element={<ItemInfo />} />
          <Route
            path="showOrders"
            element={
              <RequireAuth>
                <Orders />
              </RequireAuth>
            }
          />
          <Route path="showMyOrders" element={<MyOrders />} />
          <Route path="myOrderDetails/:id" element={<OrderInfo />} />
          <Route
            path="adminListings"
            element={
              <RequireAuth>
                <AdminListings key="adminListings" />
              </RequireAuth>
            }
          />
        </Route>
        <Route path="editProfile/:id" element={<EditProfile />} />
      </Routes>
    </BrowserRouter>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ItemContextProvider>
        <App />
      </ItemContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
