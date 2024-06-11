import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../Contexts/AuthContext";
import { InfinitySpin } from "react-loader-spinner";

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const { currentUser } = useContext(AuthContext);

  // Fetch user details and listed items from the database
  useEffect(() => {
    axios.post("/api/profile", { token: currentUser.token }).then((res) => {
      console.log(res.data);
      setUser(res.data.user);
      setTotal(res.data.totalUsers);
      setLoading(false);
    });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("details");
    navigate("/");
    window.location.reload();
  };

  const handleEditProfile = () => {
    navigate(`/editProfile/${user._id}`);
  };

  return (
    <div className="bg-gray-800">
      <div className="max-w-5xl mx-auto min-h-screen bg-white p-6 rounded-lg shadow-md">
        <h1 className="w-fit m-auto text-3xl text-white text-center font-semibold bg-red-500 rounded-xl py-2 px-5 ">
          {currentUser.token ===
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjIxMDA1MjE1MjAwNDFAaWV0bHVja25vdy5hYy5pbiIsImlhdCI6MTcwMTEwODc5MiwiZXhwIjoxNzAxMTk1MTkyfQ.tuoLoyp6HZLgUTqtQy1QTTA5P4Qlc_1uKGO0RRwYtzM" ? (
            <>Admin Profile</>
          ) : (
            <>User Profile</>
          )}
        </h1>

        {loading ? (
          <div className="flex items-center justify-center h-96">
            <InfinitySpin width="200" color="#424242" />
          </div>
        ) : (
          <div>
            <div className="my-7 mx-auto w-[97%] sm:w-[75%] md:w-[70%] text-xl text-red-600 font-semibold flex flex-col gap-7 p-4 sm:p-10 border-2 border-solid border-red-600 rounded-xl ">
              {user ? (
                <div>
                  <div>
                    <span className="text-gray-800">Name : </span> {user.name}
                  </div>
                  <div className="text-xl text-red-600 font-semibold">
                    <span className="text-gray-800">Email : </span>
                    <span className="break-words">{user.email}</span>
                  </div>
                  <div className="text-xl text-red-600 font-semibold">
                    <span className="text-gray-800">Phone : </span>
                    <span className="break-words">{user.phone}</span>
                  </div>
                  <div className="text-xl text-red-600 font-semibold">
                    <span className="text-gray-800">Address : </span>
                    <span className="break-words">{user.address}</span>
                  </div>
                  {currentUser.token ===
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjIxMDA1MjE1MjAwNDFAaWV0bHVja25vdy5hYy5pbiIsImlhdCI6MTcwMTEwODc5MiwiZXhwIjoxNzAxMTk1MTkyfQ.tuoLoyp6HZLgUTqtQy1QTTA5P4Qlc_1uKGO0RRwYtzM" && (
                    <div className="text-xl text-red-600 font-semibold">
                      <span className="text-gray-800">
                        Total number of users :{" "}
                      </span>
                      <span className="break-words">{total}</span>
                    </div>
                  )}

                  <div className="flex flex-row mt-3.5 justify-between ">
                    <button
                      className="bg-gray-600 hover:bg-gray-700 active:bg-gray-800 text-white text-base py-2 rounded-lg w-fit"
                      onClick={handleLogout}
                    >
                      Log out
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 active:bg-red-700 text-white text-base py-2 rounded-lg w-fit"
                      onClick={handleEditProfile}
                    >
                      Edit details
                    </button>
                  </div>
                </div>
              ) : (
                <div>Loading user data...</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
