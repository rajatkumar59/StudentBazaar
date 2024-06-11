import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapPin,
  faPhoneVolume,
  faUser,
  faIndianRupeeSign,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { InfinitySpin } from "react-loader-spinner";
import { AuthContext } from "../../Contexts/AuthContext";

const ItemInfo = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState({});

  const { currentUser } = useContext(AuthContext);

  let blobURLs = [];

  // Fetch item details from the database
  useEffect(() => {
    axios
      .post("/api/itemDetails", { id: id })
      .then((res) => {
        localStorage.setItem("item", JSON.stringify(res.data));
        setItem(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Function to convert base64 string to ArrayBuffer
  function base64ToArrayBuffer(base64) {
    let binaryString = window.atob(base64);
    let len = binaryString.length;
    let bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  }

  // Map function to convert each image to a blob URL
  if (!loading) {
    blobURLs = item.images.map((img) => {
      const base64Image = img.buffer;
      const imageType = img.mimetype;
      const arrayBuffer = base64ToArrayBuffer(base64Image);
      const blob = new Blob([arrayBuffer], { type: imageType });
      const blobUrl = URL.createObjectURL(blob);
      return blobUrl;
    });
  }

  const takeOrder = async () => {
    if (!currentUser) {
      alert("Please login to place an order!");
      return;
    }
    await axios
      .post("/api/takeOrder", { id: item._id, token: currentUser.token })
      .then((res) => {
        console.log(res.data);
        alert("Order placed successfully!");
        // navigate("/orders");
      });
  };

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <InfinitySpin width="200" color="#424242" />
        </div>
      ) : (
        <div className="overflow-hidden flex-col flex items-center h-screen justify-center bg-gray-800 ">
          <div className=" items-start w-full m-5 px-14 hidden md:block">
            <Link
              to="/"
              onClick={() => {
                localStorage.removeItem("item");
              }}
              className="text-white bg-red-500 rounded-3xl hover:bg-red-700 px-6 py-2 transition duration-300 ease-in-out"
            >
              Dashboard
            </Link>
          </div>
          <div className="bg-white shadow-lg rounded-lg flex items-center mx-8 md:mx-14 flex-col md:flex-row  md:h-full w-full">
            {/* Image Carousel */}
            <Carousel
              infiniteLoop
              autoPlay
              swipeable
              onClickItem={(index) => {
                window.open(blobURLs[index], "_blank");
              }}
              showArrows={true}
              showThumbs={false}
              className="md:w-1/2 md:h-auto p-2 cursor-pointer bg-gray-800 m-5 mt-10"
            >
              {blobURLs.map((url, index) => {
                return (
                  <div key={index}>
                    <img
                      src={url}
                      className="h-64 md:h-96 object-cover"
                      alt="Product"
                    />
                  </div>
                );
              })}
            </Carousel>
            {/* Product Details */}
            <div className="p-4 md:px-10 md:w-3/4 ">
              {/* Product Name */}
              <h2 className="text-2xl font-semibold">{item.itemName}</h2>

              {/* Price */}
              <p className="text-red-600 text-md mb-4">
                {" "}
                <FontAwesomeIcon icon={faIndianRupeeSign} /> {item.itemCost}
              </p>
              <hr />

              {/* Description */}
              <p className="text-gray-700 mt-2">{item.itemDescription}</p>

              <div className="mt-4">
                <p className="font-semibold text-xl mb-3">
                  Category : {item.category}
                </p>
              </div>

              {/* Provider Details */}
              <div className="mt-4">
                <p className="font-semibold text-xl mb-1 md:mb-3">
                  Provider Details :
                </p>
                <p className="py-1 ">
                  {" "}
                  <FontAwesomeIcon icon={faUser} size="xl" />{" "}
                  <span className="mx-2"> {item.userName} </span>
                </p>

                <p className="py-1 ">
                  <FontAwesomeIcon icon={faMapPin} flip size="2xl" />{" "}
                  <span className="mx-2">{item.pickupLocation}</span>
                </p>
                <button
                  className="bg-gray-900 hover:bg-red-500 text-white py-2 px-4 rounded-full focus:outline-none mb-6"
                  onClick={takeOrder}
                >
                  Confirm Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ItemInfo;
