import React, { useEffect, useState } from "react";
import "./userinquiry.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTableCells,faList } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../BASE_URL";
import { useSocketContext } from "../../context/SocketContext";
import { toast, ToastContainer } from "react-toastify";

const Userinquiry = () => {
  
  const [inquiry, setInquiry] = useState([]);
  const { initializeSocket } = useSocketContext();
  const [listView, setListView] = useState(true);
  const [activeView, setActiveView] = useState("list");


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


  const inquirydata = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/inquiry/userInquiry`,
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
      setInquiry(responseData.data);
      console.log("respppp",responseData.data);
    } catch (error) {
      toast.error("Something went wrong!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
    }
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
  const handlenavigate = (item,data) => {
    initializeSocket(item.userId);
    navigate("/Userinquirychat", { state: { item:item, data:"userinquiry"} });
    console.log('item from userinquiry',item);
  };

  return (
    <div className="container" style={{ marginTop: "50px" }}>
      <div className="flex justify-between items-center mt-10 lg:mb-[100px] lg:mx-[100px]">
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
      {listView?
      (
      <>
      <div className="product-list-view">
        <div className="product-info">
          <p>Product Photo</p>
        </div>
        <div className="product-info">
          <p>Product Name</p>
        </div>
        <div className="product-info">
          <p>Start-up Name</p>
        </div>
        <div className="product-info">
          <p>Inquiry Date</p>
        </div>
        <div className="product-info">
          <p>View Detail</p>
        </div>
      </div>

      {inquiry.map((item) => (
        <div key={item._id} className="product-list-view" style={{ height: "auto", marginBottom: "20px", marginTop: "10px" }}>
          <div className="product-info flex justify-center items-center">
            <img src="/shoe.png" alt="Product" style={{ width: "25%", maxWidth: "150px" }} />
          </div>
          <div className="product-info">
            <h5>{item?.productDetails?.productName}</h5>
          </div>
          <div className="product-info">
            <h5>{item?.startupDetails?.startupName}</h5>
          </div>
          <div className="product-info">
            <h5>{item.createdAt.slice(0, 10)}</h5>
          </div>
          <div className="product-info">
            <button className="btn btn-success" onClick={() => handlenavigate(item)}>View</button>
          </div>
        </div>
      ))}</>):
      <div className="row mt-5 lg:mx-[100px]">
      {inquiry.map((item) => (
        <div key={item._id} className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="mb-3 flex items-center">
              <img src="/shoe.png" alt="Product" style={{ width: "25%", maxWidth: "150px" }} />
              <strong>{item?.productDetails?.productName}</strong>
              </h5>
              <p className="mb-1 flex">
                <strong>Startup Name: </strong>{" "}
                <p>{item?.startupDetails?.startupName}</p>
              </p>
              <p className="mb-1 flex">
                <strong>Inquiry Date: </strong>{" "}
                <p>{item.createdAt.slice(0, 10)}</p>
              </p>
              <div className="text-end">
            {/* Use Link instead of p tag for navigation */}
            <button
              className="btn btn-success"
              onClick={() => handlenavigate(item)}
            >
              view
            </button>
          </div>
            </div>
          </div>
        </div>
      ))}
    </div>
    }

      <ToastContainer />
    </div>
  );
};

export default Userinquiry;
