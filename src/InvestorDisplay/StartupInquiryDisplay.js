import React, { useEffect, useState } from "react";
// import "./userinquiry.css";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../BASE_URL";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast, ToastContainer } from "react-toastify";
import { useSocketContext } from "../context/SocketContext";
import {
  faList,
  faTrashAlt,
  faEdit,
  faTableCells,
} from "@fortawesome/free-solid-svg-icons";

const StartupInquiryDisplay = () => {
  const [inquiry, setInquiry] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [listView, setListView] = useState(true);
  const [activeView, setActiveView] = useState("list");
  const { initializeSocket } = useSocketContext();
  const id = useParams();
  console.log("id iss", id);

  const handleListView = () => {
    setListView(true);
    setActiveView("list");
  };

  const handleGridView = () => {
    setListView(false);
    setActiveView("grid");
  };

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
      console.log("this is resp", responseData);
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
        setActiveView("grid")
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Set the initial state

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navigate = useNavigate();

  const handleEdit = (item) => {
    initializeSocket(item.startupId);
    navigate("/chatwithinvestor", { state: { item: item, data: "startup" } });
  };
  const listStyle = {
    background: "linear-gradient(to bottom, #9ad1a0, #00818a)",
  };

  const gridStyle = {
    background: "linear-gradient(to bottom, #9ad1a0, #00818a)",
  };

  const inactiveStyle = {
    background: "linear-gradient(to bottom, #c8dbca, #a4c7c9)",
  };

  return (
    <div className="container" style={{ marginTop: "50px" }}>
        <div className="flex justify-between items-center mt-10 lg:mb-[100px]">
            <div className="startup-products-header lg:text-[22px] text-[18px]">
              <h6 >All Inquiries</h6>
              <img src="" alt="" />
            </div>
            <div className="flex">
              
               <div className="ms-4 lg:block hidden">
                  <FontAwesomeIcon
                    icon={faList}
                    className="startup-add-product-icons cursor-pointer"
                    onClick={handleListView}
                    style={activeView === 'list' ? listStyle : inactiveStyle}
                  />
                  <FontAwesomeIcon
                    icon={faTableCells}
                    className="startup-add-product-icons startup-add-product-icons-2 cursor-pointer"
                    onClick={handleGridView}
                    style={activeView === 'grid' ? gridStyle : inactiveStyle}
                  />
                </div>
            </div>
          </div>
      {listView ? (
        <>
          <div className="product-list-view flex flex-wrap">
            <div className="product-info w-1/6 text-center">
              <p>Investor Photo</p>
            </div>
            <div className="product-info w-1/6 text-center">
              <p>Investor Name</p>
            </div>
            <div className="product-info w-1/6 text-center">
              <p>Inquiry Title</p>
            </div>
            <div className="product-info w-1/6 text-center">
              <p>Best Time To Connect</p>
            </div>
            <div className="product-info w-1/6 text-center">
              <p>Inquiry Date</p>
            </div>
            <div className="product-info w-1/6 text-center">
              <p>View Details</p>
            </div>
          </div>

          {inquiry
            .filter((item) => item.InquiryBy === "investor")
            .map((item) => (
              <div
                key={item._id}
                className="product-list-view flex flex-wrap items-center mb-5 mt-2"
              >
                <div className="product-info w-1/6 flex justify-center items-center">
                  <img
                    src={item?.investorPhoto}
                    alt="Product"
                    className="w-[50px] h-[75px]"
                  />
                </div>
                <div className="product-info w-1/6 text-center">
                  <h5>{item?.investorName}</h5>
                </div>
                <div className="product-info w-1/6 text-center">
                  <h5>{item?.title}</h5>
                </div>
                <div className="product-info w-1/6 text-center">
                  <h5>{item?.best_time_to_connect}</h5>
                </div>
                <div className="product-info w-1/6 text-center">
                  <h5>{item.createdAt.slice(0, 10)}</h5>
                </div>
                <div className="product-info w-1/6 text-center text-white">
                  <button className="backk px-4 py-2 rounded-lg" onClick={() => handleEdit(item)}>View</button>
                </div>
              </div>
            ))}
        </>
      ) : (
        <div className="row mt-5">
                {inquiry.map((partner) => (
                  <div key={partner._id} className="col-md-4 mb-4 ">
                    <div className="card">
                      <div className="card-body">
                        <div className="d-flex align-items-center mb-3 justify-between">
                          <div className="flex justify-center items-center">
                          <img
                            className="me-3"
                            src={partner.investorPhoto}
                            alt=""
                            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                          />
                          <h5 className="mb-0"><strong>{partner.investorName}</strong></h5>
                          </div>
                         
                        </div>
                        <p><strong>Title:</strong> {partner.title}</p>
                        <p><strong>Best Time To Connect:</strong> {partner.best_time_to_connect}</p>
                        <p><strong>Inquiry Date:</strong> {partner.createdAt.slice(0, 10)}</p>
                        <div className="product-info w-full mt-3 text-white text-end">
                  <button className="backk px-4 py-2 rounded-lg" onClick={() => handleEdit(partner)}>View</button>
                </div>
                        
                      </div>
                    </div>
                  </div>
                ))}
              </div>
      )}

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

export default StartupInquiryDisplay;
