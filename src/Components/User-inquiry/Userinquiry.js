import React, { useEffect, useState } from "react";
import "./userinquiry.css";
import { Link, useNavigate , } from "react-router-dom";
import { BASE_URL } from "../../BASE_URL";
import { toast, ToastContainer } from "react-toastify";

const Userinquiry = () => {
  
  const [inquiry,setinquiry]=useState([])
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
      setinquiry(responseData.data);
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

  const navigate = useNavigate()
  const handlenavigate =(item,_id)=>{
    navigate("/Userinquirychat", { state: { item ,_id } })
   
}

  return (
    <div className="container" style={{ marginTop: "50px",  }}>
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
        <div key={item.id} className="product-list-view" style={{ height: "auto", marginBottom: "20px", marginTop:"10px" }}>
          <div className="product-info">
            <img src="/shoe.png" alt="Product" style={{ width: "25%", maxWidth: "150px", }} />
          </div>
          <div className="product-info">
            <p>{item?.productDetails?.[0]?.productName}</p>
          </div>
          <div className="product-info">
            <p>{item.startupName}</p>
          </div>
          <div className="product-info">
            <p>{item.createdAt.slice(0,10)}</p>
          </div>
          <div className="product-info">
          <button className="btn btn-success" onClick={() => handlenavigate(item,"63b3dd7840ee7256cfce95a1")}>view</button>
          </div>
        </div>
      ))}

      <div className="chatpop">
        
      </div>
    </div>
  );
};

export default Userinquiry;
