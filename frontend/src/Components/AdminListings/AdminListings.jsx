// import React, { useState, useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { AuthContext } from "../../Contexts/AuthContext";
// import { InfinitySpin } from "react-loader-spinner";
// import ItemCard from "../../Components/ItemCard/ItemCard";

// const AdminListings = () => {
//   const navigate = useNavigate();

//   const [items, setItems] = useState([]);
//   const [listingLoading, setListingLoading] = useState(true);
//   const { currentUser } = useContext(AuthContext);

//   // Fetch user details and listed items from the database
//   useEffect(() => {
//     axios.get("/api/itemsListedByAdmin").then((res) => {
//       console.log("The response is : ",res.data);
//       setItems(res.data);
//       setListingLoading(false);
//     });
//   }, []);

//   // Delete an item from the database
//   const deleteItem = (id) => {
//     axios.post("/api/deleteItem", { id: id }).then((res) => {
//       console.log(res.data);
//       setItems(items.filter((item) => item._id !== id));
//     });
//   };

//   // Update an item in the database
//   const updateItem = (id) => {
//     navigate(`/updateItem/${id}`);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("details");
//     navigate("/");
//     window.location.reload();
//   };

//   return (
//     <div className="bg-gray-800">
//       <div className="max-w-5xl mx-auto min-h-screen bg-white p-6 rounded-lg shadow-md">
//         {listingLoading ? (
//           <div className="flex items-center justify-center h-96">
//             <InfinitySpin width="200" color="#424242" />
//           </div>
//         ) : (
//           <div>
//             <div className="my-7 mx-auto w-[97%] sm:w-[75%] md:w-[70%] text-xl text-red-600 font-semibold flex flex-col gap-7 p-4 sm:p-10 border-2 border-solid border-red-600 rounded-xl ">
//               <div className="mt-2 text-2xl text-gray-800 font-semibold">
//                 <span>Your Listings : </span>
//               </div>
//               <div>
//                 {items.length > 0 ? (
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
//                     {items.map((item) => (
//                       <div
//                         key={item._id}
//                         className="bg-white rounded-lg shadow-md p-4"
//                       >
//                         <ItemCard rest={item} width="full" />
//                         <div className="flex justify-end">
//                           <button
//                             onClick={() => updateItem(item._id)}
//                             className="bg-green-500 hover:bg-green-800 text-white text-sm py-1 px-4 rounded-lg w-fit mx-auto mt-3"
//                           >
//                             Update Item
//                           </button>
//                           <button
//                             onClick={() => deleteItem(item._id)}
//                             className="bg-red-500 text-white text-sm py-1 px-4 rounded-lg w-fit mx-auto mt-3"
//                           >
//                             Delete Item
//                           </button>
//                         </div>
//                       </div>
//                       ))}
//                     </div>
//                  ) : (
//                    <div>No items to display</div>
//                  )}
// //               </div>
// //             </div>
// //           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminListings;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { InfinitySpin } from "react-loader-spinner";
import axios from "axios";
import ItemCard from "../ItemCard/ItemCard";
import Pagination from "@mui/material/Pagination";

const AdminListings = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchCount, setFetchCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const category = "";

  // Fetch all items from the database
  useEffect(() => {
    axios
      .post(`/api/dashboard?limit=8&page=${currentPage}`, {
        category: category,
        rendering: "admin",
      })
      .then((res) => {
        const allItems = res.data;
        setItems(allItems);
      })
      .catch((error) => {
        console.error("Error fetching dashboard items:", error);
      })
      .finally(() => {
        setLoading(false);
      });

    axios
      .get("/api/count")
      .then((res) => {
        console.log(res.data);
        setFetchCount(res.data.count);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentPage]);

  const handlePageChange = (event, page) => {
    setLoading(true);
    setCurrentPage(page);
  };

  // Delete an item from the database
  const deleteItem = (id) => {
    axios.post("/api/deleteItem", { id: id }).then((res) => {
      console.log(res.data);
      setItems(items.filter((item) => item._id !== id));
    });
  };

  // Update an item in the database
  const updateItem = (id) => {
    navigate(`/updateItem/${id}`);
  };

  return (
    <>
      <div className="text-below-btn content">
        <h3>Available Listings :</h3>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-96">
          <InfinitySpin width="200" color="#424242" />
        </div>
      ) : items.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div key={item._id} className="bg-white rounded-lg shadow-md p-4 ">
              <ItemCard rest={item} width="full" />
              <div className="flex justify-end">
                <button
                  onClick={() => updateItem(item._id)}
                  className="bg-green-500 hover:bg-green-800 text-white text-sm py-1 px-4 rounded-lg w-fit mx-auto mt-3"
                >
                  Update Item
                </button>
                <button
                  onClick={() => deleteItem(item._id)}
                  className="bg-red-500 text-white text-sm py-1 px-4 rounded-lg w-fit mx-auto mt-3"
                >
                  Delete Item
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>No items to display</div>
      )}

      <div className="flex items-center justify-center">
        <Pagination
          count={Math.ceil(fetchCount / 8)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          size="large"
          className="bg-slate-50 my-3.5 md:m-3.5 py-1.5 rounded-full"
        />
      </div>
    </>
  );
};

export { AdminListings };
