import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../Contexts/AuthContext";

const OrderCard = (props) => {
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
    navigate(`/myOrderDetails/${props.rest._id}`);
  };

  return (
    <div
      onClick={moreInfo}
      className={`m-0 p-4 ${
        props.width === "full"
          ? "w-full"
          : `sm:w-1/2 md:w-1/4 lg:w-${props.width} xl:w-${props.width}`
      } cursor-pointer`}
    >
      <div className="card flex flex-col rounded-lg shadow-md hover:shadow-lg bg-slate-50">
        <div className="prod-img">
          <img
            src={src}
            alt={props.rest.itemName}
            className="w-full h-48 sm:h-64 object-cover rounded-lg object-center"
          />
        </div>
        <div className="prod-title p-4">
          <p className="text-lg sm:text-xl text-gray-900 font-bold">
            {props.rest.itemName}
          </p>
          {props.orderType !== "myOrder" && (
            <>
              <p className="text-gray-700">Provider: {props.rest.userName}</p>
              <p className="text-gray-700">Buyer: {props.rest.clientName}</p>
              <p className="text-gray-700">
                Buyer Phone: {props.rest.clientNumber}
              </p>
              <p className="text-gray-700">
                Buyer Address: {props.rest.clientAddress}
              </p>
            </>
          )}
        </div>
        <div className="prod-info grid grid-cols-2 gap-4 p-4">
          <p className="text-lg sm:text-xl font-bold text-gray-900">
            Rs. {props.rest.itemCost}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
