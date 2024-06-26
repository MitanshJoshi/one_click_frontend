import React, { useEffect, useState } from "react";
import "./userinquiry.css";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../BASE_URL";
import { toast, ToastContainer } from "react-toastify";

const Userinquiry = () => {
  
  const [inquiry, setInquiry] = useState([]);

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
      console.log(responseData.data);
    } catch (error) {
      toast.error("Something went wrong!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
    }
  };

  useEffect(() => {
    inquirydata();
  }, []);

  const navigate = useNavigate();
  const handlenavigate = (item) => {
    navigate("/Userinquirychat", { state: { item, _id: item._id } });
  };

  return (
    <div className="container" style={{ marginTop: "50px" }}>
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
          <div className="product-info">
            <img src="/shoe.png" alt="Product" style={{ width: "25%", maxWidth: "150px" }} />
          </div>
          <div className="product-info">
            <p>{item?.productDetails?.productName}</p>
          </div>
          <div className="product-info">
            <p>{item?.startupDetails?.startupName}</p>
          </div>
          <div className="product-info">
            <p>{item.createdAt.slice(0, 10)}</p>
          </div>
          <div className="product-info">
            <button className="btn btn-success" onClick={() => handlenavigate(item)}>View</button>
          </div>
        </div>
      ))}

      <ToastContainer />
    </div>
  );
};

export default Userinquiry;
