import React, { useEffect, useState } from "react";
// import "./userinquiry.css";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../BASE_URL";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSocketContext } from "../context/SocketContext";
import { toast, ToastContainer } from "react-toastify";
import { faList, faTrashAlt, faEdit,faTableCells } from "@fortawesome/free-solid-svg-icons";

const InquiryDoneOnInvestor = () => {
  
  const [inquiry, setInquiry] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [activeView, setActiveView] = useState("list");
  const [listView, setListView] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  const listStyle = {
    background: "linear-gradient(to bottom, #9ad1a0, #00818a)",
  };

  const gridStyle = {
    background: "linear-gradient(to bottom, #9ad1a0, #00818a)",
  };

  const inactiveStyle = {
    background: "linear-gradient(to bottom, #c8dbca, #a4c7c9)",
  };

  const handleListView = () => {
    setListView(true);
    setActiveView("list");
  };

  const handleGridView = () => {
    setListView(false);
    setActiveView("grid");
  };

  const { initializeSocket } = useSocketContext();

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
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setListView(false);
        setActiveView("grid");
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Set the initial state

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navigate = useNavigate();

  const handleEdit = (inquiry,data) => {
    // const navigate = useNavigate();
    navigate(`/editinquiry/${inquiry._id}`,{state:{data:data}}); 
  };

  const handleView=(inquiry)=>{
    console.log('inquiry object is:',inquiry);
     initializeSocket(inquiry.investorId); 
    navigate("/chatwithinvestor", { state: { item: inquiry, data: "investor" } });
  }

  return (
    <div className="container" style={{ marginTop: "50px" }}>
      
      <div className="lg:mx-[100px]">
      <div className="startup-products-header ml-[55px] mb-5 flex justify-between items-center">
                <h6>All Inquiries</h6>
                <div className="ms-4 lg:block hidden">
            <FontAwesomeIcon
              icon={faList}
              className="startup-add-product-icons cursor-pointer"
              onClick={handleListView}
              style={activeView === "list" ? listStyle : inactiveStyle}
            />
            <FontAwesomeIcon
              icon={faTableCells}
              className="startup-add-product-icons startup-add-product-icons-2 cursor-pointer"
              onClick={handleGridView}
              style={activeView === "grid" ? gridStyle : inactiveStyle}
            />
          </div>
              </div>
     {listView?
     (<>
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
          <p>Best Time To Connect</p>
        </div>
        <div className="product-info">
          <p>Inquiry Date</p>
        </div>
        <div className="product-info">
          <p>View Details</p>
          </div>
      </div>

      {inquiry.filter((item)=>item.InquiryBy==="startup").map((item) => (
        <div key={item._id} className="product-list-view  product-list-view-content " >
          <div className="product-info flex justify-center items-center">
            <img src={item?.startupLogo} alt="Product" className="w-[50px] h-[75px]"/>
          </div>
          <div className="product-info">
            <h5>{item?.startupName}</h5>
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
            <button  onClick={() => handleView(item)}>View</button>
          </div>
        </div>
      ))}</>):
      <div className="row mt-5">
                {inquiry.filter((item)=>item.InquiryBy==="startup").map((partner) => (
                  <div key={partner._id} className="col-md-4 mb-4 ">
                    <div className="card">
                      <div className="card-body">
                        <div className="d-flex align-items-center mb-3 justify-between">
                          <div className="flex justify-center items-center">
                          <img
                            className="me-3"
                            src={partner.startupLogo}
                            alt=""
                            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                          />
                          <h5 className="mb-0"><strong>{partner.startupName}</strong></h5>
                          </div>
                         
                        </div>
                        <p><strong>Title:</strong> {partner.title}</p>
                        <p><strong>Best Time To Connect:</strong> {partner.best_time_to_connect}</p>
                        <p><strong>Inquiry Date:</strong> {partner.createdAt.slice(0, 10)}</p>
                        <div className="product-info w-full mt-3 text-white text-end">
                  <button className="backk px-4 py-2 rounded-lg" onClick={() => handleView(partner)}>View</button>
                </div>
                        
                      </div>
                    </div>
                  </div>
                ))}
              </div>}
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

export default InquiryDoneOnInvestor;
