import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import CartImg from "./images/cart.png";
import ManuImg from "./images/menu.png";
import HeartImg from "./images/heart.png";
import LoginImg from "./images/login.png";
import SearchImg from "./images/search-line.png";
import { useState } from "react";
import { IconContext } from "react-icons";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./Sidebar";
import { AuthContext } from "../../Contexts/AuthContext";

export default function Header() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const { currentUser } = useContext(AuthContext);
  // console.log(currentUser.token);

  const searchHandler = (e) => {
    e.preventDefault();
    if (!search) return;
    navigate(`/search/${search}`);
    window.location.reload();
  };

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <header className="header">
      <nav className="nav-bar">
        <div className="nav-bar-upper-section">
          {/* <!-- student bazaar logo --> */}

          <div className="menu-upper flex flex-row items-center ">
            <div className="navbar-seactiom">
              <IconContext.Provider value={{ color: "#fff" }}>
                <div className="navbar">
                  <Link to="#" className="menu-bars">
                    <FaIcons.FaBars onClick={showSidebar} />
                  </Link>
                </div>
                <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
                  <ul className="nav-menu-items" onClick={showSidebar}>
                    <li className="navbar-toggle">
                      <Link to="#" className="menu-bars">
                        <AiIcons.AiOutlineClose />
                      </Link>
                    </li>
                    {SidebarData.map((item, index) => {
                      if (
                        currentUser &&
                        currentUser.token ===
                          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjIxMDA1MjE1MjAwNDFAaWV0bHVja25vdy5hYy5pbiIsImlhdCI6MTcwMTEwODc5MiwiZXhwIjoxNzAxMTk1MTkyfQ.tuoLoyp6HZLgUTqtQy1QTTA5P4Qlc_1uKGO0RRwYtzM"
                      ) {
                        return (
                          <li key={index} className={item.cName}>
                            <Link to={item.path}>
                              {item.icon}
                              <span>{item.title}</span>
                            </Link>
                          </li>
                        );
                      } else if (index !== 7) {
                        return (
                          <li key={index} className={item.cName}>
                            <Link to={item.path}>
                              {item.icon}
                              <span>{item.title}</span>
                            </Link>
                          </li>
                        );
                      }
                    })}
                  </ul>
                </nav>
              </IconContext.Provider>
            </div>

            <div className="student-bazaar-logo">
              <h2 className="student-bazaar-logo-left">Student</h2>
              <h2 className="student-bazaar-logo-right">
                <pre>Bazaar</pre>
              </h2>
            </div>
          </div>

          {/* <!-- search bar  --> */}
          <div className="search-box">
            <form action="" className="abc flex flex-row ">
              <input
                type="text"
                name="search"
                id="srch"
                placeholder="Search here..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  console.log(search);
                }}
              />
              <button
                type="submit"
                className="search-btn"
                onClick={searchHandler}
              >
                <i className="fa-solid fa-search"></i>
              </button>
            </form>
          </div>

          {/* <!-- side section of bar --> */}
          <div className="side-icons-section">
            {currentUser ? (
              <Link to="/profile" className="Login">
                <img src={LoginImg} className="pb-1" alt="" />
                <div className="Login-text">Profile</div>
                <div className="Underline"></div>
              </Link>
            ) : (
              <>
                <Link to="/login" className="Login">
                  <img src={LoginImg} alt="" />
                  <div className="Login-text">Login</div>
                  <div className="Underline"></div>
                </Link>
                <Link to="/signup" className="Login">
                  <i className="fa-solid fa-right-to-bracket text-white text-2xl md:pb-2"></i>
                  <div className="Login-text">Sign Up</div>
                  <div className="Underline"></div>
                </Link>
              </>
            )}

            {currentUser &&
              currentUser.token ===
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjIxMDA1MjE1MjAwNDFAaWV0bHVja25vdy5hYy5pbiIsImlhdCI6MTcwMTEwODc5MiwiZXhwIjoxNzAxMTk1MTkyfQ.tuoLoyp6HZLgUTqtQy1QTTA5P4Qlc_1uKGO0RRwYtzM" && (
                <Link to="/showOrders" className="Wish">
                  <i className="fa-solid fa-clipboard-list text-white text-lg md:text-3xl pb-2 mt-1"></i>
                  <div className="Wish-text">Orders</div>
                  <div className="Underline"></div>
                </Link>
              )}

            {currentUser &&
              currentUser.token ===
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjIxMDA1MjE1MjAwNDFAaWV0bHVja25vdy5hYy5pbiIsImlhdCI6MTcwMTEwODc5MiwiZXhwIjoxNzAxMTk1MTkyfQ.tuoLoyp6HZLgUTqtQy1QTTA5P4Qlc_1uKGO0RRwYtzM" && (
                <Link to="/sell" className="Cart">
                  <div className=" text-white font-bold text-2xl  md:text-4xl text-center">
                    +
                  </div>
                  <div className="Cart-text">Add</div>
                </Link>
              )}

            {currentUser &&
              currentUser.token !==
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjIxMDA1MjE1MjAwNDFAaWV0bHVja25vdy5hYy5pbiIsImlhdCI6MTcwMTEwODc5MiwiZXhwIjoxNzAxMTk1MTkyfQ.tuoLoyp6HZLgUTqtQy1QTTA5P4Qlc_1uKGO0RRwYtzM" && (
                <Link to="/showMyOrders" className="Cart">
                  <i class="fa-solid fa-list-ol text-white text-xl md:text-3xl pb-1"></i>
                  <div className="Cart-text">My Orders</div>
                  <div className="Underline"></div>
                </Link>
              )}
          </div>
        </div>

        <hr className="Break-section" />

        <div className="search-input md:hidden p-2 flex flex-row bg-slate-950">
          <input
            type="text"
            placeholder="Enter your search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 border rounded mr-2"
          />
          <button type="submit" className="search-btn" onClick={searchHandler}>
            <i className="fa-solid fa-search"></i>
          </button>
        </div>

        <div className="nav-bar-lower-section">
          <ul className="icons">
            <Link to="/" className="Home">
              Home
            </Link>
            <Link to="/books" className="Home">
              Books
            </Link>
            <Link to="/electronics" className="Home">
              Electronics
            </Link>
            <Link to="/furniture" className="Home">
              Furniture
            </Link>

            <Link to="/other" className="Home">
              Other
            </Link>
            <Link to="/Sells" className="Home">
              Sell
            </Link>
            <Link
              className="Home"
              onClick={() =>
                window.scrollTo({
                  top: document.body.scrollHeight,
                  behavior: "smooth",
                })
              }
            >
              Contact us
            </Link>
            <Link to="/about" className="Home">
              About us
            </Link>
            {currentUser &&
              currentUser.token ===
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjIxMDA1MjE1MjAwNDFAaWV0bHVja25vdy5hYy5pbiIsImlhdCI6MTcwMTEwODc5MiwiZXhwIjoxNzAxMTk1MTkyfQ.tuoLoyp6HZLgUTqtQy1QTTA5P4Qlc_1uKGO0RRwYtzM" && (
                <Link to="/adminListings" className="Home">
                  Items
                </Link>
              )}
          </ul>
        </div>
      </nav>
    </header>
  );
}
