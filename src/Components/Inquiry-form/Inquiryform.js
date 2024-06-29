import React, { useState } from "react";
import SecondNavbar from "../Navbar/Navbar";
import { BASE_URL } from "../../BASE_URL";
import { toast, ToastContainer } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const Inquiryform = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [best_time_to_connect, setConnect] = useState("");
  const location = useLocation();
  const productId = location.state && location.state.productId;
  const startupId = location.state && location.state.startupId;
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!title || !description || !best_time_to_connect) {
      toast.error("All fields are required", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/inquiry/insert`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          title,
          description,
          best_time_to_connect,
          productId,
          startupId,
        }),
      });

      if (!response.ok) {
        throw new Error("Inquiry failed");
      }

      toast.success("Inquiry Successful!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });

      setTimeout(() => {
        navigate(-1); // Go back
      }, 2000);
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      toast.error("Inquiry failed!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
    }
  };

  return (
    <>
      <SecondNavbar />
      <section className="bg-gray-100 min-h-screen py-8">
        <ToastContainer />
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <h3 className="text-2xl font-semibold text-center text-white py-4 bg-green-600">
              Inquiry Form
            </h3>
            <div className="px-6 py-4">
              <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  className="w-full py-2 px-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  className="w-full py-2 px-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                  rows="6"
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="mb-4">
                <label htmlFor="best_time_to_connect" className="block text-gray-700 font-bold mb-2">
                  Best-Time To Connect
                </label>
                <select
                  id="best_time_to_connect"
                  className="w-full py-2 px-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                  onChange={(e) => setConnect(e.target.value)}
                >
                  <option value="">Select time</option>
                  <option value="12 to 3">12 to 3</option>
                  <option value="3 to 6">3 to 6</option>
                  <option value="6 to 9">6 to 9</option>
                  <option value="9 to 12">9 to 12</option>
                </select>
              </div>
              <div className="flex items-center justify-center mt-6">
                <button
                  className="bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Inquiryform;
