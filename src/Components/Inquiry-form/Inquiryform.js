import React, { useState } from "react";
import SecondNavbar from "../Navbar/Navbar";
import "./inquiry.css";
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
      <section>
        <ToastContainer />
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
                      type="text"
                      className="form-control"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="inquiry-label mt-3">
                    <label htmlFor="">Description</label>
                    <textarea
                      className="d-block form-control"
                      rows="6"
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                </div>
                <div className="col-6 ">
                  <div className="inquiry-label mt-2">
                    <label htmlFor="">Best-Time To Connect</label>
                    <select
                      className="form-control"
                      onChange={(e) => setConnect(e.target.value)}
                    >
                      <option value="">Select time</option>
                      <option value="12 to 3">12 to 3</option>
                      <option value="3 to 6">3 to 6</option>
                      <option value="6 to 9">6 to 9</option>
                      <option value="9 to 12">9 to 12</option>
                    </select>
                  </div>
                </div>
                <div className="col-12 mt-4 d-flex align-item-center  justify-content-center">
                  <div className="inquiry-submit-button">
                    <button className="btn btn-success" onClick={handleSubmit}>
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