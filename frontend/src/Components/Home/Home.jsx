import React, { useContext, useState, useRef, useEffect } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { InfinitySpin } from "react-loader-spinner";
import "./Home.css";
import mianimags from "./images/mian-imags.jpg";
import logo from "./images/logo.png";
import book from "./images/book.jpg";
import bottomLowerLeft from "./images/bottom-lower-left.png";
import bottomLowerRight from "./images/bottom-lower-right.png";
import calculator from "./images/calculato.jpg";
import telegram from "./images/telegram_icon.png";
import watch from "./images/watch.jpg";
import whatsapp from "./images/WhatsApp_icon.png";
import axios from "axios";
import ItemCard from "../ItemCard/ItemCard";
import { SearchContext } from "../../Contexts/SearchContext";
import Pagination from "@mui/material/Pagination";
import { FaWhatsapp, FaTelegram } from "react-icons/fa";
 

export default function Home(props) {
  const { searchedItem } = useParams();
  const contentRef = useRef(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchedItems, setSearchedItems] = useState([]);
  const [fetchCount, setFetchCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { currentSearch } = useContext(SearchContext);

  // Fetch all items from the database
  useEffect(() => {
    if (searchedItem) {
      axios
        .post(`/api/search?limit=8&page=${currentPage}`, { searchedItem })
        .then((res) => {
          const filteredItems = res.data;
          setSearchedItems(filteredItems);
        })
        .catch((error) => {
          console.error("Error fetching searched items:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      axios
        .post(`/api/dashboard?limit=8&page=${currentPage}`, {
          category: props.category,
        })
        .then((res) => {
          const allItems = res.data;
          setItems(allItems);
          setSearchedItems(allItems);
        })
        .catch((error) => {
          console.error("Error fetching dashboard items:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }

    axios
      .get("/api/count")
      .then((res) => {
        console.log(res.data);
        setFetchCount(res.data.count);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentPage, props.search]);

  const scrollToContent = () => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlePageChange = (event, page) => {
    setLoading(true);
    setCurrentPage(page);
  };

  return (
    <>
      {(props.category === "" || props.category=== null) && !searchedItem  ? (
        <>
          <div className="main">
            <div className="hero">
              <div className="main-left">
                <div className="shopAndSave">
                  <h1> Buy & Sell</h1>
                </div>
                <div className="left-writ-tex">
                  <h3>Your go to destination for budget-friendly </h3>
                </div>
                <div className="studentEssentail">
                  <h4>student essentials</h4>
                </div>
                <div className="btn">
                  <NavLink>
                    <div onClick={scrollToContent}>
                      <span data-attr="Buy"> Buy</span>
                      <span data-attr="Now">Now </span>
                    </div>
                  </NavLink>
                </div>
              </div>

              <div className="main-right">
                <div className="right-image hidden sm:block">
                  <img src={mianimags} alt="" />
                </div>
              </div>
            </div>
          </div>

          {/* /// */}

          <div className="flex flex-col sm:flex-row justify-evenly items-center py-7">
          <div className="mb-5 sm:mb-0">
            <div className="  bg-green-700 hover:bg-green-900 transition ease-in-out duration-300 text-white font-bold py-3 px-5 rounded cursor-pointer max-[520px]:py-1.5 max-[520px]:px-2">

                <a href={"https://chat.whatsapp.com/DLf9wlGi7T7LQCDGrHllcS"} target="_blank" rel="noopener noreferrer" className="flex" >
                  <FaWhatsapp size={35} style={{ marginRight: '5px' }} />
                  <span className="text-2xl max-[520px]:text-base ">Join Whatsapp Group</span>
                </a>
                
            </div>
          </div>

          <div >
              <div className="max-[520px]:py-1.5 max-[520px]:px-3 bg-blue-500 hover:bg-blue-600 transition ease-in-out duration-300 text-white font-bold py-3 px-5 rounded cursor-pointer ">

              <a href={"https://t.me/storeiet"} target="_blank" rel="noopener noreferrer" className="flex" >
                <FaTelegram size={35} style={{ marginRight: '5px' }} />
                <span className="text-2xl max-[520px]:text-base"> Join Telegram Group</span>
              </a>
                  
                </div>
          </div>
      </div>
        </>
      ) : (
        <></>
      )}

      <div className="text-below-btn content" ref={contentRef}>
        <h3>Available Products :</h3>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-96">
          <InfinitySpin width="200" color="#424242" />
        </div>
      ) : (
        <div className="p-5 flex flex-wrap px-10 justify-center md:justify-start">
          {searchedItems
            .filter(
              (item) =>
                props.category !== "" && props.category === item.category
            )
            .map((item) => (
              <ItemCard key={item._id} rest={item} />
            ))}
          {searchedItems
            .filter((item) => props.category === "" || props.category === null)
            .map((item) => (
              <ItemCard key={item._id} rest={item} />
            ))}
        </div>
      )}

      <div className="flex items-center justify-center">
        <Pagination
          count={Math.ceil(fetchCount / 8)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          size="large"
          className="bg-slate-50 m-3.5 py-1.5 rounded-full"
        />
      </div>

      <div className="grid-wrapper">
        <div className="image-grid1">
           <Link   
                    to="/books"
                    onClick={() =>
                       window.scrollTo({ top: 0, behavior: "smooth" })
                    }  
                      >
              <img src={book} alt="Books" />
            </Link>
        </div>
        <div className="image-grid2">
          <div className="image-grid21">
          <Link 
                  to="/search/calculator"
                  onClick={() =>
                     window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  >
          <img src={calculator} alt="" />
          </Link>
            
          </div>
          <div className="image-grid22">
                <Link   
                      to="/search/Watch"
                      onClick={() =>
                         window.scrollTo({ top: 0, behavior: "smooth" })
                      }
                >
          <img src={watch} alt="watch" />
          </Link>
          </div>
        </div>
      </div>
      {/* </div> */}

      <div className="bottom-div">
        <div className="left-bottom-div">
          <img src={bottomLowerLeft} alt="" />
          <div className="text-lower">
            <h2>Sell What You Don't Need,</h2>
            <h2>Buy What You Do</h2>
          </div>
        </div>

        <div className="right-bottom-div">
          <img src={bottomLowerRight} alt="" />
          <div className="text-lower-right">
            <h2>Join the Green Revolution,</h2>
            <h2>One Purchase at a Time</h2>
          </div>
        </div>
      </div>
    </>
  );
}
