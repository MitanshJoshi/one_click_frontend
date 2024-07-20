import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../BASE_URL";
import SecondNavbar from "../Navbar/Navbar";
import StartUpProfile from "../StartUpProfile/StartUpProfile";
import "react-toastify/dist/ReactToastify.css";

const AddGrant = () => {
    const { state } = useLocation();
    const _id = state && state._id;
  

  const [grantName, setGrantName] = useState("");
  const [grantAmount, setGrantAmount] = useState("");
  const [dateWhenAvailable, setDateWhenAvailable] = useState("");
  const [grantFrom, setGrantFrom] = useState("");
  const navigate = useNavigate();

  const handleback = () => {
    localStorage.setItem("myData", "grant");
    navigate(-1);
  };

  const handleAddGrant = async (e) => {
    e.preventDefault();
    if (!grantName || !grantAmount || !dateWhenAvailable || !grantFrom) {
      toast.error("All fields are required!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/Grant/addGrant`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          grant_name: grantName,
          grant_amount: grantAmount,
          date_when_available: dateWhenAvailable,
          grant_from: grantFrom,
          startupId: _id,
        }),
      });
      console.log('id:',_id);

      if (!response.ok) {
        throw new Error("Request failed");
      }

      toast.success("Grant added successfully!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });

      setTimeout(() => {
        navigate(-1, { state: { abc: "addgrant" } });
        localStorage.setItem('myData', "grant");
      }, 1000);
    } catch (error) {
      console.error("Error adding grant:", error);
      toast.error("Something went wrong!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
    }
  };

  return (
    <>
      <SecondNavbar />
      <StartUpProfile />
      <div className="container mt-4">
        <ToastContainer />
        <div className="d-flex justify-content-between lg:ml-[200px] pt-[30px] text-[30px]">
          <h2 className="mb-5" style={{ fontWeight: "600" }}>
            Add Grant
          </h2>
        </div>
        <div className="flex flex-wrap justify-center items-center">
          <div className="w-full md:w-1/2 lg:w-1/3 p-3">
            <div className="add-award-form lg:mt-[-110px]" style={{ width: "100%" }}>
              <div className="mb-1">
                <p className="mb-3">Enter Grant Name</p>
                <input
                  type="text"
                  onChange={(e) => setGrantName(e.target.value.trim())}
                  value={grantName}
                  className="mb-3 form-control"
                  style={{ width: "100%", height: "46px" }}
                  required
                />
              </div>
              <div className="mb-4">
                <p className="mb-3">Enter Grant Amount</p>
                <input
                  type="number"
                  onChange={(e) => setGrantAmount(e.target.value.trim())}
                  value={grantAmount}
                  className="mb-3 form-control"
                  style={{ width: "100%", height: "46px" }}
                  required
                />
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 p-3">
            <div className="add-award-form lg:mt-1 mt-[-40px]">
              <div className="mb-1">
                <p className="mb-3">Enter Date When Available</p>
                <input
                  type="date"
                  onChange={(e) => setDateWhenAvailable(e.target.value)}
                  value={dateWhenAvailable}
                  className="mb-3 form-control"
                  style={{ width: "100%", height: "46px" }}
                  required
                />
              </div>
              <div className="mb-1">
                <p className="mb-3">Enter Grant From</p>
                <input
                  type="text"
                  onChange={(e) => setGrantFrom(e.target.value.trim())}
                  value={grantFrom}
                  className="mb-3 form-control"
                  style={{ width: "100%", height: "46px" }}
                  required
                />
              </div> 
              <div className="d-flex justify-between mt-5 mb-5 gap-3">
                <button
                  onClick={handleAddGrant}
                  className="add-award-submit-button"
                  style={{ height: "50px", width: "100%" }}
                >
                  SUBMIT
                </button>
                <button
                  onClick={handleback}
                  className="add-award-submit-button"
                  style={{ height: "50px", width: "100%" }}
                >
                  BACK
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddGrant;
