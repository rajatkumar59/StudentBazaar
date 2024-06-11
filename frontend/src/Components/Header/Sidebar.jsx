import React, { useContext } from "react";
import * as AiIcons from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";

const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Books",
    path: "/books",
    icon: <i className="fa-solid fa-book-open"></i>,
    cName: "nav-text",
  },
  {
    title: "Electronics",
    path: "/electronics",
    icon: <i className="fa-solid fa-plug"></i>,
    cName: "nav-text",
  },
  {
    title: "Furniture",
    path: "/furniture",
    icon: <i className="fa-solid fa-chair"></i>,
    cName: "nav-text",
  },
  {
    title: "Other",
    path: "/Other",
    icon: <i className="fa-solid fa-otter"></i>,
    cName: "nav-text",
  },
  {
    title: "Sell",
    path: "/Sells",
    icon: <FaShoppingCart />,
    cName: "nav-text",
  },
  {
    title: "About us",
    path: "/about",
    icon: <i className="fa-solid fa-circle-info"></i>,
    cName: "nav-text",
  },
  {
    title: "Items",
    path: "/adminListings",
    icon: <i className="fa-solid fa-circle-info"></i>,
    cName: "nav-text",
  },
];

export { SidebarData };
