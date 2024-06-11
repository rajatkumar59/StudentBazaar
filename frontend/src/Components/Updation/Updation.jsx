import React, { useEffect, useState } from "react";
import axios from "axios";
import Input from "../Input/Input";
import { InfinitySpin } from "react-loader-spinner";

import { useNavigate, useParams } from "react-router-dom";

const SellForm = () => {
  const { id } = useParams();
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [itemCost, setItemCost] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [blobURLs, setBlobURLs] = useState([]); // For Updation when needed
  const [visibilityOfBlobURLs, setVisibilityOfBlobURLs] = useState(true); // For Updation when needed

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.post("/api/itemDetails", { id: id }).then((res) => {
      console.log(res.data);
      setItemName(res.data.itemName);
      setItemDescription(res.data.itemDescription);
      setContactNumber(res.data.contactNumber);
      setPickupLocation(res.data.pickupLocation);
      setItemCost(res.data.itemCost);
      setCategory(res.data.category);
      setImages(res.data.images);

      function base64ToArrayBuffer(base64) {
        let binaryString = window.atob(base64);
        let len = binaryString.length;
        let bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes.buffer;
      }

      const theBlobURLs = res.data.images.map((img) => {
        const base64Image = img.buffer;
        const imageType = img.mimetype;
        const arrayBuffer = base64ToArrayBuffer(base64Image);
        const blob = new Blob([arrayBuffer], { type: imageType });
        const blobUrl = URL.createObjectURL(blob);
        return blobUrl;
      });
      setBlobURLs(theBlobURLs);
      console.log("blobURLs", theBlobURLs);

      setLoading(false);
    });
  }, []);

  const handleImageUpload = (e) => {
    let selectedImages = Array.from(e.target.files);
    const maxFileSize = 500 * 1024;

    if (selectedImages.some((image) => image.size > maxFileSize)) {
      alert(
        "One or more of the selected images exceeds the maximum size of 500 kb"
      );
      selectedImages = [];
    } else {
      setImages((prevImages) => [...prevImages, ...selectedImages]);
    }
  };

  const clearUploads = () => {
    setImages([]);
    setVisibilityOfBlobURLs(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append(
      "userToken",
      JSON.parse(localStorage.getItem("details")).token
    );
    formData.append(
      "userName",
      JSON.parse(localStorage.getItem("details")).name
    );
    formData.append("itemName", itemName);
    formData.append("itemCost", itemCost);
    formData.append("itemDescription", itemDescription);
    formData.append("category", category);
    formData.append("contactNumber", contactNumber);
    formData.append("pickupLocation", pickupLocation);
    formData.append("id", id);

    Array.from(images).forEach((file) => {
      formData.append("images", file);
    });
    navigate("/");
    try {
      console.log();
      const response = await axios.post("/api/updateItem", formData);
      console.log(response);

      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className=" bg-gray-900">
      <div className="container mx-auto md:w-1/3 p-6">
        <h2 className="text-2xl text-white opacity-95 font-semibold mb-4">
          Update Item
        </h2>
        {loading ? (
          <div className="flex items-center justify-center h-screen">
            <InfinitySpin width="200" color="#424242" />
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            action="/api/sell"
            method="post"
            type="multipart/form-data"
          >
            <div className="mb-4">
              <Input
                label="Item Name"
                name="itemName"
                type="text"
                placeholder="Enter item name"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
            </div>
            <div className="mb-4 w-1/2">
              <Input
                label="Cost (Rs)"
                name="itemCost"
                type="number"
                placeholder="Enter item cost"
                value={itemCost}
                onChange={(e) => setItemCost(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="itemDescription"
                className="block text-white text-sm mb-2"
              >
                Description (300 words max)
              </label>
              <textarea
                rows="4"
                name="itemDescription"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Enter item description"
                value={itemDescription}
                onChange={(e) => setItemDescription(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <Input
                label="Contact Number"
                name="contactNumber"
                type="number"
                placeholder="Enter contact number"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <div className="mt-1">
                <select
                  id="item_category"
                  name="item_category"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="" disabled selected>
                    Select Category
                  </option>
                  <option value="Electronics">Electronics</option>
                  <option value="Books">Books</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <Input
                label="Pickup Location"
                name="pickupLocation"
                type="text"
                placeholder="Enter pickup location"
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="itemImages"
                className="block text-white text-sm mb-2"
              >
                Item Images (Up to 3 images each less than 500 KB)
              </label>
              <label
                htmlFor="itemImages"
                className="bg-red-500 hover:bg-red-600 mb-2 text-white px-3 py-2 rounded-lg cursor-pointer transition duration-300 ease-in-out"
              >
                Upload Images
              </label>
              <button
                type="button"
                className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded-lg cursor-pointer ml-2 transition duration-300 ease-in-out"
                onClick={clearUploads}
              >
                Clear Uploads
              </button>
              <input
                type="file"
                name="images"
                id="itemImages"
                className="hidden"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
              />

              {visibilityOfBlobURLs &&
                blobURLs.map((blobURL, index) => (
                  <img
                    key={index}
                    src={blobURL}
                    alt={`Uploaded ${index + 1}`}
                    className="mt-2 max-h-40"
                  />
                ))}

              {!visibilityOfBlobURLs && (
                <div className="mt-2">
                  <p className="font-semibold text-white text-sm mb-2 mt-5">
                    Uploaded Images:
                  </p>
                  {images.map((image, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(image)}
                      alt={`Uploaded ${index + 1}`}
                      className="mt-2 max-h-40"
                    />
                  ))}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition duration-300 ease-in-out"
            >
              Update
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SellForm;
