import React, { useState } from "react";
import SecondNavbar from "../Navbar/Navbar";
import "./inquiry.css";
import { BASE_URL } from "../../BASE_URL";
import { toast,ToastContainer } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const Inquiryform = () => {
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [best_time_to_connect, setConnect] = useState("");
  const location = useLocation();
  const productId = location.state && location.state.id;
  const startupId = location.state && location.state.startUpId;
  console.log(startupId)
  const Navigate =useNavigate()
  const handlesubmit = async () => {
      if(!title){
        toast.error("Title is required", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 1000,
      });return}
      if(!description){
        toast.error("Description is required", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 1000,
      });return}
      if(!best_time_to_connect){
        toast.error("Best-Time To Connect is required", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 1000,
      });return}
    try {
      const response = await fetch(`${BASE_URL}/api/inquiry/insert`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "Access-Control-Allow-Origin": "*",
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
        Navigate(-1);
      }, 2000);
    } catch (error) {
      if (error) {
        toast.error("Inquiry failed!", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 1000,
        });
      }
    }
  };
  return (
    <>
      <SecondNavbar />
      <section>
        <ToastContainer/>
        <div className="container">
          <div className="mt-5">
            <div className="review-list-title mb-4">
              <h3>Inquiry Form</h3>
            </div>
            <div>
              <div className="row">
                <div className="col-6">
                  <div className="inquiry-label">
                    <label htmlFor="">Title</label>
                    <input
                      type="tel"
                      name=""
                      id=""
                      className="form-control"
                      onChange={(e) => settitle(e.target.value)}
                      onInput={(e) => {
                        let value = e.target.value.replace(/[^0-9 a-z A-Z]/g, ''); // Remove non-numeric characters
                        // Check if the first digit is zero
                        if (value.length > 0 && value[0] === ' ') {
                          // If the first digit is zero, remove it
                          value = value.slice(1);
                        }
                        // Set the updated value
                        e.target.value = value;
                      }}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="inquiry-label mt-3">
                    <label htmlFor="">Description</label>
                    <textarea
                      name=""
                      id=""
                      cols="30"
                      rows="6"
                      className="d-block form-control"
                      onChange={(e) => setdescription(e.target.value)}
                      onInput={(e) => {
                        let value = e.target.value.replace(/[^0-9 a-z A-Z]/g, ''); // Remove non-numeric characters
                        // Check if the first digit is zero
                        if (value.length > 0 && value[0] === ' ') {
                          // If the first digit is zero, remove it
                          value = value.slice(1);
                        }
                        // Set the updated value
                        e.target.value = value;
                      }}
                    ></textarea>
                  </div>
                </div>
                <div className="col-6 ">
                  <div className="inquiry-label mt-2">
                    <label htmlFor="">Best-Time To Connect</label>
                    <select
                      type="tel"
                      name=""
                      id=""
                      className="form-control"
                      onChange={(e) => setConnect(e.target.value)}
                    >
                        <option value="">select time</option>
                        <option value="12 to 3">12 to 3</option>
                        <option value="3 to 6">3 to 6</option>
                        <option value="6 to 9">6 to 9</option>
                        <option value="9 to 12">9 to 12</option>
                    </select>
                  </div>
                </div>
                <div className="col-12 mt-4 d-flex align-item-center  justify-content-center">
                  <div className="inquiry-submit-button">
                    <button className="btn btn-success" onClick={handlesubmit}>
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Inquiryform;
