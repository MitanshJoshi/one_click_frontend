import React, { useState,useEffect } from "react";
import "./shoes.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faHeart,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { useRef } from "react";
import { FreeMode, Pagination } from "swiper/modules";
import Shoes_image from "../../Mini-component/Shoe-image/Shoes-image";
import ReviewList from "../Review-list/ReviewList";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../../BASE_URL";
const Shoes = () => {
  const navigate = useNavigate();

  const swipperArray = [
    { img: "./shoes.png" },
    { img: "./shoes.png" },
    { img: "./shoes.png" },
    { img: "./shoes.png" },
    { img: "./shoes.png" },
    { img: "./shoes.png" },
    { img: "./shoes.png" },
    { img: "./shoes.png" },
    { img: "./shoes.png" },
    { img: "./shoes.png" },
    { img: "./shoes.png" },
    { img: "./shoes.png" },
    { img: "./shoes.png" },
    { img: "./shoes.png" },
    { img: "./shoes.png" },
    { img: "./shoes.png" },
    { img: "./shoes.png" },
  ];

  
  const [shoes, setshoes] = useState([]);
  const { _id } = useParams();

  const handleAbout = () => {
    // Navigate to the next page and pass _id as part of the state object
    navigate("/supplier-detail", { state: { shoes, _id:_id } });
  };
  const handleInquiryNow = () => {
    console.log('shoes is', shoes)
    // Check if shoes data is available
    if (!shoes || !shoes._id || !shoes.startupId) {
      // If shoes data is not available, fetch it first
      fetchData().then(() => {
        // Once shoes data is fetched, navigate to the inquiry form
        navigate("/inquiryform", {
          state: { productId: shoes._id, startupId: shoes.startup._id },
        });
      });
    } else {
      // If shoes data is already available, navigate to the inquiry form
      navigate("/inquiryform", {
        state: { productId: shoes._id, startupId: shoes.startupId },
      });
    }
  };
  

  const fetchData = async () => {
      // console.log(localStorage.getItem("tokenData"));
      console.log("hyyyyyy");
  
      try {
        const response = await fetch(
          `${BASE_URL}/api/product/productdisplaydetail?product_id=${_id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
          }
        );
         console.log(response)
        if (!response.ok) {
          throw new Error("Request failed");
        }
        const responseData = await response.json();
        setshoes(responseData.data[0]);
        // console.log(setshoes);
        console.log(responseData)
      } catch (error) {
        if (error) {
          toast.error("Something went wrong!", {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 1000,
          });
        }
      }
    };

    console.log("soes is",shoes)
    useEffect(() => {
      fetchData();
    }, []);
  return (
    <>
      <div className="container">
        <ToastContainer/>
        
        <div className="row mt-5 pt-4">
          <div className="col-4">
            <div>
              <div className="detail-image-box">
                <img src="/shoes.png" alt="" className="img-fluid" />
              </div>
              <div className="detail-shoes-slider mt-4">
                <Swiper
                  slidesPerView={3.5}
                  spaceBetween={20}
                  freeMode={true}
                  pagination={{
                    clickable: true,
                  }}
                  // modules={[FreeMode, Pagination]}
                  className="mySwiper"
                  style={{ overflowX: "auto" }}
                >
                  {swipperArray &&
                    swipperArray.map((e) => {
                      return (
                        <>
                          <SwiperSlide style={{ height: "100px" }}>
                            <div className="shoes-slider">
                              <img
                                src="/shoes.png"
                                alt=""
                                className="img-fluid"
                              />
                            </div>
                          </SwiperSlide>
                        </>
                      );
                    })}
                </Swiper>
              </div>
              <div>
                <div className="about-supplier">
                  <div>
                    <div className="about-supplier-title-photo">
                      <img
                        src="/supplier-1.png"
                        alt=""
                        className="img-fluid"
                      />
                    </div>
                    <div className="supplier-follow-buttons mt-3">
                      <button>Follow</button>
                    </div>
                    <div className="detail-supplier-detail mt-4">
                      <div className="detail-supplier-name d-flex justify-content-between">
                        <h4>Tab Sport</h4>
                        <div>
                          <h5 className="mb-0">
                            4.8
                            <FontAwesomeIcon
                              icon={faStar}
                              style={{ color: "gold" }}
                            />
                          </h5>
                          <span>13 reviews</span>
                        </div>
                      </div>
                      <div className="detail-supplier-address">
                        <p>
                          218/B, Near Mala sheri <br />
                          Mumbai, Maharastra - 259632
                        </p>
                        <h6>Open Now :</h6>
                        <p>Mon - Sun :- 10:30 am - 9:30 pm</p>
                      </div>
                      <div className="detail-about-supplier-button mt-4">
                        <button onClick={handleAbout}>ABOUT SUPPLIER</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-8">
            <div>
              <div className="details-product-title mb-4">
                <div>
                  <h3>{shoes.productName}</h3>
                  <FontAwesomeIcon icon={faHeart} />
                  <span className="ms-1">Add to my wishlist</span>
                </div>
                <div>
                  <img src="/back.png" alt="" />
                </div>
              </div>
              <div>
                <div className="row detail-shoe-uses">
                  <div className="col-6">
                    <div className="d-flex align-items-center">
                      <h6 className="mb-0">Occasion</h6>
                      <p className="mb-0">Sports</p>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="d-flex align-items-center">
                      <h6 className="mb-0" style={{ width: "60px" }}>
                        Color
                      </h6>
                      <p className="mb-0">Red</p>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="d-flex align-items-center">
                      <h6 className="mb-0">Size</h6>
                      <p className="mb-0">12</p>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="d-flex align-items-center">
                      <h6 className="mb-0" style={{ width: "60px" }}>
                        Type
                      </h6>
                      <p className="mb-0">Running Shoes, Womens Shoes</p>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-between mt-5 mb-5">
                  <div className="detail-product-price">
                    <p className="mb-0">$ {shoes.productprice}</p>
                    <del>$ 65.12</del>
                  </div>
                  <div className="detail-product-button">
                  <button onClick={handleInquiryNow}>Inquiry Now</button>

                  </div>
                </div>
                <div className="detail-description">
                  <h6 className="mb-2">Description</h6>
                  <p>
                   {shoes.description}
                  </p>
                </div>
                <div className="mt-5">
                  <div className="detail-specification">
                    <div className="detail-specification-title mb-4">
                      <h6>Specification</h6>
                    </div>
                    <div className="detail-specifications">
                      <div className="mb-3 d-flex justify-content-between">
                        <h6>Product Model</h6>
                        <p className="text-end">Escaper Mesh</p>
                      </div>
                      <div className="mb-3 d-flex justify-content-between">
                        <h6>Manufacture details</h6>
                        <p className="text-end">
                          48/B, Batahouse, malaseri Bhat-gandhinagar
                        </p>
                      </div>
                      <div className="mb-3 d-flex justify-content-between">
                        <h6>Product weight</h6>
                        <p className="text-end">0.7190kg, 719gm</p>
                      </div>
                      <div className="mb-3 d-flex justify-content-between">
                        <h6>Brand</h6>
                        <p className="text-end">Puma</p>
                      </div>
                      <div className="mb-3 d-flex justify-content-between">
                        <h6>Size</h6>
                        <p className="text-end">11</p>
                      </div>
                      <div className="mb-3 d-flex justify-content-between">
                        <h6>Type</h6>
                        <p className="text-end">Running shoes, womens shoes</p>
                      </div>
                      <div className="d-flex justify-content-between">
                        <h6 className="mb-0">Color</h6>
                        <p className="text-end mb-0">Navy</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 mt-5">
            <div className="details-more-product-supplier mb-3">
              <h6>More from this seller</h6>
            </div>
            <div>
              <Swiper
                slidesPerView={5.5}
                spaceBetween={20}
                freeMode={true}
                pagination={{
                  clickable: true,
                }}
                // modules={[FreeMode, Pagination]}
                className="mySwiper"
              >
                {swipperArray &&
                  swipperArray.map((e) => {
                    return (
                      <>
                        <SwiperSlide
                          style={{
                            height: "400px",
                          }}
                        >
                          <div>
                            <div className="shoes-detail-box">
                              <div className="shoes-detail-head">
                                <p className="mb-0">RFQ</p>
                                <FontAwesomeIcon
                                  icon={faHeart}
                                  style={{ color: "red" }}
                                />
                              </div>
                              <div className="shoes-image-box">
                                <img
                                  src="/shoes.png"
                                  alt=""
                                  className="img-fluid"
                                />
                              </div>
                              <div className="shoes-detail-content">
                                <div className="shoes-detail-title">
                                  <h6 className="mb-1">
                                  Round toe leather loafer shoe(Black)
                                  </h6>
                                  <span>Rainbow shoes & enterprise</span>
                                </div>
                                <div className="shoes-detail-location">
                                  <FontAwesomeIcon
                                    icon={faLocationDot}
                                    style={{
                                      fontSize: "10px",
                                      color: "#74CC7E",
                                    }}
                                  />
                                  <p className="mb-0 ms-1">Prototype</p>
                                </div>
                                <div className="shoes-price d-flex align-items-center ">
                                  <span>₹</span>
                                  <p className="mb-0">1200</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </SwiperSlide>
                      </>
                    );
                  })}
              </Swiper>
            </div>
          </div>
          <div className="review-list-header">
            <div className="review-list-title mb-4">
              <h3>Reviews</h3>
              <a href="" style={{ cursor: "pointer" }}>
                View more
              </a>
            </div>
            <div>
              <ReviewList />
              <ReviewList />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shoes;