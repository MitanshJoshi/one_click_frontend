import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../BASE_URL";
import SecondNavbar from "../Components/Navbar/Navbar";
import StartUpProfile from "../Components/StartUpProfile/StartUpProfile";
import "react-toastify/dist/ReactToastify.css";

const EditInquiry = () => {
  const { state } = useLocation();
  const { inquiryId } = useParams();
  const _id = state && state._id;
  const data = state && state.data;
  console.log('data',data);
  

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [best_time_to_connect, setConnect] = useState("");
  

  const [grantName, setGrantName] = useState("");
  const [grantAmount, setGrantAmount] = useState("");
  const [dateWhenAvailable, setDateWhenAvailable] = useState("");
  const [grantFrom, setGrantFrom] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchGrantDetails();
  }, []);

  const fetchGrantDetails = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/investorInquiry/getInquiryById/${inquiryId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("investorToken")?localStorage.getItem("investorToken"):localStorage.getItem("token"),
        },
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const data = await response.json();
      console.log('data',data);
      
      const inquiry=data.inquiry;

      setTitle(inquiry.title);
      setDescription(inquiry.description);
      setConnect(inquiry.best_time_to_connect);

    } catch (error) {
      console.error("Error fetching grant details:", error);
      toast.error("Something went wrong!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
    }
  };

  const handleBack= () =>{
    localStorage.setItem("myData","inquiry")
    navigate(-1);
  }

  const handleEditInquiry = async (e) => {
    e.preventDefault();
    if (!title || !description || !best_time_to_connect) {
      toast.error("All fields are required!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/investorInquiry/updateInquiry/${inquiryId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("investorToken")?localStorage.getItem("investorToken"):localStorage.getItem("token"),
        },
        body: JSON.stringify({
          title: title,
          description: description,
          best_time_to_connect: best_time_to_connect,
        }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      toast.success("Inquiry updated successfully!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });

      setTimeout(() => {
        navigate(-1, { state: { abc: "editinquiry" } });
        localStorage.setItem("myData", "inquiry");
      }, 1000);
    } catch (error) {
      console.error("Error updating Inquiry:", error);
      toast.error("Something went wrong!", {
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
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden w-[40%]">
            <h3 className="text-2xl font-semibold text-center text-white py-4 backk">
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
                  value={title}
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
                  value={description}
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
                  value={best_time_to_connect}
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
              {data=="edit"?<div className="flex items-center justify-center mt-6 add-start-up-button">
                <button
                  className=" text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={handleEditInquiry}
                >
                  Submit
                </button>
              </div>:<div className="flex items-center justify-center mt-6 add-start-up-button">
                <button
                  className=" text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={handleBack}
                >
                  Back
                </button>
              </div>}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EditInquiry;
