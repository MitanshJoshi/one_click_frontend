import React, { useEffect, useState } from "react";
// import "./userinquiry.css";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../BASE_URL";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast, ToastContainer } from "react-toastify";
import { faList, faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";

const InvestorInquiry = () => {
  
  const [inquiry, setInquiry] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  const inquirydata = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/investorInquiry/getInquiryInvestor`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("investorToken"),
          },
        }
      );

      if (!response.ok) {
        throw new Error("Request failed");
      }
      const responseData = await response.json();
      setInquiry(responseData.inquiry);
      console.log(responseData.inquiry);
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
            Authorization: localStorage.getItem("investorToken"),
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
  const handlenavigate = (item) => {
    navigate("/Userinquirychat", { state: { item, _id: item._id } });
  };
  const handleEdit = (inquiry,data) => {
    // const navigate = useNavigate();
    navigate(`/editinquiry/${inquiry._id}`,{state:{data:data}}); // Example assuming grantId is passed
  };

  return (
    <div className="container" style={{ marginTop: "50px" }}>
      <div className="mx-[100px]">
      <div className="product-list-view">
        <div className="product-info">
          <p>Startup Photo</p>
        </div>
        <div className="product-info">
          <p>Startup Name</p>
        </div>
        <div className="product-info">
          <p>Inquiry Title</p>
        </div>
        <div className="product-info">
          <p>Description</p>
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

      {inquiry.map((item) => (
        <div key={item._id} className="product-list-view" style={{ height: "auto", marginBottom: "20px", marginTop: "10px" }}>
          <div className="product-info flex justify-center items-center">
            <img src={item?.startupLogo} alt="Product" style={{ width: "25%",height:"2%" }} />
          </div>
          <div className="product-info">
            <h5>{item?.startupName}</h5>
          </div>
          <div className="product-info">
            <h5>{item?.title}</h5>
          </div>
          <div className="product-info">
            <h5>{item?.description}</h5>
          </div>
          <div className="product-info">
            <h5>{item?.best_time_to_connect}</h5>
          </div>
          <div className="product-info">
            <h5>{item.createdAt.slice(0, 10)}</h5>
          </div>
          <div className="product-info startup-product-add-button">
            <button  onClick={() => handleEdit(item,"view")}>View</button>
          </div>
          <div className="product-info">
            <FontAwesomeIcon
                            icon={faEdit}
                            className="me-3 cursor-pointer"
                            onClick={() => handleEdit(item,"edit")}
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
              <button className="btng" onClick={handleDeleteInquiry}>Yes</button>
              <button className="btnr" onClick={handleCancelDelete}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
    
  );
};

export default InvestorInquiry;
