import React, { useEffect, useState } from "react";
import "./myinquiry.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  faTrashAlt,
  faEdit,
  faTableCells,
} from "@fortawesome/free-solid-svg-icons";
import SecondNavbar from "../Navbar/Navbar";
import { useSocketContext } from "../../context/SocketContext";
import { BASE_URL } from "../../BASE_URL";
import { toast, ToastContainer } from "react-toastify";

const Myinquiry = () => {
  const [listView, setListView] = useState(true);
  const [activeView, setActiveView] = useState("list");
  const startUpId = useParams();
  const { initializeSocket } = useSocketContext();

  const navigate = useNavigate();
  const handleNavigate = (item, data) => {
    console.log("item from myinquiry", item);
    console.log("startupid is:", item.startupData._id);

    initializeSocket(item.startupData._id);
    navigate("/Userinquirychat", { state: { item: item, data: "myinquiry" } });
  };

  const [inquiry, setinquiry] = useState([]);

  const handlesubmit = async () => {
    const response = await fetch(`${BASE_URL}/api/inquiry/sellingInquiry`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        startupId: startUpId._id,
      }),
    });

    const data = await response.json();
    setinquiry(data.data);
  };

  useEffect(() => {
    handlesubmit();
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

  return (
    <>
      <SecondNavbar />
      <div className="container" style={{ marginTop: "50px" }}>
        <div className="lg:mx-[100px]">
          <div className="flex justify-between items-center lg:mt-10 lg:mb-[100px]">
            <div className="startup-products-header lg:text-[22px] text-[18px]">
              <h6>My Inquiries</h6>
              <img src="" alt="" />
            </div>
            <div className="flex">
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
          </div>
          {listView ? (
            <>
              <div className="product-list-view">
                <div className="product-info">
                  <p>Product Photo</p>
                </div>
                <div className="product-info">
                  <p>Product Name</p>
                </div>
                <div className="product-info">
                  <p>User Name</p>
                </div>
                <div className="product-info">
                  <p>Email ID</p>
                </div>
                <div className="product-info">
                  <p>Contact No</p>
                </div>
                <div className="product-info">
                  <p>Inquiry Date</p>
                </div>
                <div className="product-info">
                  <p>View detail</p>
                </div>
              </div>

              {inquiry.map((item) => (
                <div
                  key={item.id}
                  className="product-list-view"
                  style={{
                    height: "auto",
                    marginBottom: "20px",
                    marginTop: "10px",
                  }}
                >
                  <div className="product-info">
                    <img
                      src="/shoe-list.png"
                      // alt="Product"
                      // style={{ width: "25%", maxWidth: "150px" }}
                    />
                  </div>
                  <div className="product-info">
                    <p>{item?.productData?.productName}</p>
                  </div>
                  <div className="product-info">
                    <p>{item?.userData?.name}</p>
                  </div>
                  <div className="product-info">
                    <p>{item?.userData?.email}</p>
                  </div>
                  <div className="product-info">
                    <p>{item?.userData?.contact}</p>
                  </div>
                  <div className="product-info">
                    <p>{item?.inquiryData?.createdAt.slice(0, 10)}</p>
                  </div>
                  <div className="product-info">
                    {/* Use Link instead of p tag for navigation */}
                    <button
                      className="btn btn-success"
                      onClick={() => handleNavigate(item)}
                    >
                      view
                    </button>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="row mt-5">
              {inquiry.map((item) => (
                <div key={item._id} className="col-md-4 mb-4">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="mb-3 flex">
                      <strong>Product Name: </strong>
                      {item?.productData?.productName}
                      </h5>
                      <p className="mb-1 flex">
                        <strong>User Name: </strong>{" "}
                        <p>{item?.userData?.name}</p>
                      </p>
                      <p className="mb-1 flex">
                        <strong>Email Id: </strong>{" "}
                        <p>{item?.userData?.email}</p>
                      </p>
                      <p className="mb-1 flex">
                        <strong>Contact No: </strong>{" "}
                        <p>{item?.userData?.contact}</p>
                      </p>
                      <p className="mb-1 flex">
                        <strong>Inquiry Date: </strong>{" "}
                        <p>{item?.inquiryData?.createdAt.slice(0, 10)}</p>
                      </p>
                      <div className="text-end">
                    {/* Use Link instead of p tag for navigation */}
                    <button
                      className="btn btn-success"
                      onClick={() => handleNavigate(item)}
                    >
                      view
                    </button>
                  </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Myinquiry;
