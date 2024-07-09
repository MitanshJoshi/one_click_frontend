import React, { useEffect, useState } from "react";
// import "./userinquiry.css";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../BASE_URL";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast, ToastContainer } from "react-toastify";
import { useSocketContext } from "../context/SocketContext";
import { faList, faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useScrollTrigger } from "@mui/material";

const InquiryByStartup = () => {
  const [inquiry, setInquiry] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  const { initializeSocket } = useSocketContext();
  const id=useParams();
  console.log('id iss',id);
  


  const inquirydata = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/investorInquiry/getInquiryByStartup/${id._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      if (!response.ok) {
        throw new Error("Request failed");
      }
      const responseData = await response.json();
      setInquiry(responseData.inquiry);
      console.log("this is resp",responseData);
    } catch (error) {
      toast.error("Something went wrong!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
    }
  };

  const handleDeleteInquiry = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/investorInquiry/deleteInquiry/${selectedInquiry}`,
        {
          method: "DELETE",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete Inquiry");
      }

      setShowConfirmation(false);
      inquirydata();
      toast.success("Inquiry deleted successfully!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
    } catch (error) {
      console.error("Error deleting Inquiry:", error);
      toast.error("Something went wrong!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  useEffect(() => {
    inquirydata();
  }, []);

  const navigate = useNavigate();

  const handleEdit = (inquiry) => {
    // const navigate = useNavigate();
    initializeSocket(inquiry.userId, inquiry.startupId); 
    navigate("/chatwithinvestor", { state: { item: inquiry, data: "startup" } }); 
  };

  return (
    <div className="container" style={{ marginTop: "50px" }}>
      <div className="">
        <div className="product-list-view">
          <div className="product-info">
            <p>Investor Photo</p>
          </div>
          <div className="product-info">
            <p>Investor Name</p>
          </div>
          <div className="product-info">
            <p>Inquiry Title</p>
          </div>
          <div className="product-info">
            <p>Best Time To Connect</p>
          </div>
          <div className="product-info">
            <p>Inquiry Date</p>
          </div>
          <div className="product-info">
            <p>View Details</p>
          </div>
          <div className="product-info">
            <p>Actions</p>
          </div>
        </div>

        {inquiry.filter((item)=>item.InquiryBy==="startup").map((item) => (
          <div
            key={item._id}
            className="product-list-view"
            style={{ height: "auto", marginBottom: "20px", marginTop: "10px" }}
          >
            <div className="product-info flex justify-center items-center">
              <img
                src={item?.investorPhoto}
                alt="Product"
                className="w-[50px] h-[75px]"
                // style={{ width: "25%", height: "2%" }}
              />
            </div>
            <div className="product-info">
              <h5>{item?.investorName}</h5>
            </div>
            <div className="product-info">
              <h5>{item?.title}</h5>
            </div>
            <div className="product-info">
              <h5>{item?.best_time_to_connect}</h5>
            </div>
            <div className="product-info">
              <h5>{item.createdAt.slice(0, 10)}</h5>
            </div>
            <div className="product-info startup-product-add-button">
              <button onClick={() => handleEdit(item, "view")}>View</button>
            </div>
            <div className="product-info">
              <FontAwesomeIcon
                icon={faEdit}
                className="me-3 cursor-pointer"
                onClick={() => handleEdit(item)}
              />
              <FontAwesomeIcon
                icon={faTrashAlt}
                className="cursor-pointer"
                onClick={() => {
                  setSelectedInquiry(item._id);
                  setShowConfirmation(true);
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <ToastContainer />
      {showConfirmation && (
        <div className="confirmation-modal">
          <div className="confirmation-content">
            <h1 className="confirmation-message">
              Are you sure you want to delete this Inquiry?
            </h1>
            <div className="buttons-container">
              <button className="btng" onClick={handleDeleteInquiry}>
                Yes
              </button>
              <button className="btnr" onClick={handleCancelDelete}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InquiryByStartup;
