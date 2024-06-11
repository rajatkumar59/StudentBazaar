import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupeeSign } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../Contexts/AuthContext";

const ItemCard = (props) => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const base64Image = props.rest.image ? props.rest.image.buffer : null;
  const imageType = props.rest.image ? props.rest.image.mimetype : null;
  const placeholderImageURL =
    "https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image-768x518.jpg";

  const src = props.rest.image
    ? `data:${imageType};base64,${base64Image}`
    : placeholderImageURL;

  const moreInfo = async () => {
    navigate(`/item/${props.rest._id}`);
  };

  const takeOrder = async () => {
    if (!currentUser) {
      alert("Please login to place an order!");
      return;
    }
    await axios
      .post("/api/takeOrder", { id: props.rest._id, token: currentUser.token })
      .then((res) => {
        console.log(res.data);
        alert("Order placed successfully!");
        // navigate("/orders");
      });
  };

  return (
    <div
      className={`m-0 p-4 ${
        props.width === "full"
          ? "w-full"
          : `w-1/2 md:w-1/4 lg:w-${props.width} xl:w-${props.width}`
      } cursor-pointer`}
    >
      <div className="card flex flex-col rounded-lg shadow-md hover:shadow-lg bg-slate-50">
        <div className="prod-img" onClick={moreInfo}>
          <img
            src={src}
            alt={props.rest.itemName}
            className="w-full h-28 sm:h-64 object-cover rounded-lg object-center"
          />
        </div>
        <div className="prod-title px-3 md:p-4" onClick={moreInfo}>
          <p className="text-lg sm:text-xl text-gray-900 font-bold">
            {props.rest.itemName.length > 9
              ? props.rest.itemName.slice(0, 15) + "..."
              : props.rest.itemName}
          </p>
        </div>
        <div className="prod-info gap-0 p-1 px-3 md:p-4 flex flex-col md:flex-row md:justify-between md:items-center md:h-1/2 ">
          <p className="text-red-600 text-md mb-2 md:mb-4" onClick={moreInfo}>
            <FontAwesomeIcon icon={faIndianRupeeSign} /> {props.rest.itemCost}
          </p>
          <button
            className="bg-gray-900 hover:bg-red-500 text-white text-sm md:py-2 md:px-4 rounded-full focus:outline-none"
            onClick={moreInfo}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
