import React, { useEffect, useState } from "react";
import "./myinquiry.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import SecondNavbar from "../Navbar/Navbar";
import { BASE_URL } from "../../BASE_URL";
import { toast, ToastContainer } from "react-toastify";
const Myinquiry = () => {
  const startUpId= useParams()

  const navigate = useNavigate();
  const handleNavigate = (item) => {
    navigate("/myinquirychar", { state: { item } });
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
          startupId: startUpId._id ,
        }),
      });

      const data = await response.json();
      setinquiry(data.data);
    
  };

  useEffect(() => {
    handlesubmit();
  }, []);

  return (
    <>
      <SecondNavbar />
      <div className="container" style={{ marginTop: "50px" }}>
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
            style={{ height: "auto", marginBottom: "20px", marginTop: "10px" }}
          >
            <div className="product-info">
              <img
                src="./shoe-list.png"
                alt="Product"
                style={{ width: "25%", maxWidth: "150px" }}
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
      </div>
    </>
  );
};

export default Myinquiry;
