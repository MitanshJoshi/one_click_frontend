import React, { useState, useEffect } from "react";
import "./shoes.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faHeart, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import ReviewList from "../Review-list/ReviewList";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../../BASE_URL";

const Shoes = () => {
  const navigate = useNavigate();
  const { _id } = useParams();

  const swipperArray = [
    { img: "/shoes.png" },
    { img: "/shoes.png" },
    { img: "/shoes.png" },
    { img: "/shoes.png" },
    { img: "/shoes.png" },
    { img: "/shoes.png" },
    { img: "/shoes.png" },
    { img: "/shoes.png" },
    { img: "/shoes.png" },
    { img: "/shoes.png" },
    { img: "/shoes.png" },
    { img: "/shoes.png" },
    { img: "/shoes.png" },
    { img: "/shoes.png" },
    { img: "/shoes.png" },
    { img: "/shoes.png" },
    { img: "/shoes.png" }
  ];

  const [shoes, setShoes] = useState({});
  const [otherProducts, setOtherProducts] = useState([]);
  const [supplier, setSupplier] = useState({});

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/product/productdisplaydetail?product_id=${_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token")
          }
        }
      );

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const responseData = await response.json();
      if (responseData.data && responseData.data.length > 0) {
        const productData = responseData.data[0];
        setShoes(productData);
        setSupplier(productData.startup || {});
        setOtherProducts(productData.otherProducts || []);
      } else {
        throw new Error("No data found");
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
      toast.error("Something went wrong!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAbout = () => {
    navigate("/supplier-detail", { state: { shoes, _id: _id } });
  };

  const handleInquiryNow = () => {
    if (!shoes || !shoes._id || !shoes.startupId) {
      fetchData().then(() => {
        navigate("/inquiryform", {
          state: { productId: shoes._id, startupId: shoes.startup._id }
        });
      });
    } else {
      navigate("/inquiryform", {
        state: { productId: shoes._id, startupId: shoes.startupId }
      });
    }
  };

  return (
    <>
      <div className="container">
        <ToastContainer />
        <div className="row mt-5 pt-4">
          <div className="col-4">
            <div>
              <div className="detail-image-box">
                <img
                  src="/shoes.png"
                  alt=""
                  className="img-fluid"
                />
              </div>
              <div className="detail-shoes-slider mt-4">
                <Swiper
                  slidesPerView={3.5}
                  spaceBetween={20}
                  freeMode={true}
                  pagination={{
                    clickable: true
                  }}
                  className="mySwiper"
                  style={{ overflowX: "auto" }}
                >
                  {swipperArray.map((e, index) => (
                    <SwiperSlide key={index} style={{ height: "100px" }}>
                      <div className="shoes-slider">
                        <img src={e.img} alt="" className="img-fluid" />
                      </div>
                    </SwiperSlide>
                  ))}
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
                        <h4>{supplier.startupName}</h4>
                        <div>
                          <h5 className="mb-0">
                            4.8
                            <FontAwesomeIcon
                              icon={faStar}
                              style={{ color: "gold" }}
                            />
                          </h5>
                          <span>{shoes.reviews ? shoes.reviews.length : 0} reviews</span>
                        </div>
                      </div>
                      <div className="detail-supplier-address">
                        <p>
                          {supplier.address}
                          <br />
                          {supplier.city}, {supplier.state} - {supplier.pincode}
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
                  <p>{shoes.description}</p>
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
                        <h6>Net Quantity</h6>
                        <p className="text-end">1N</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5">
                  <div className="detail-related-product">
                  <div className="detail-specification-title mb-4">
                      <h6>More From Seller</h6>
                    </div>
                    <div className="row">
                      {otherProducts.map((product) => (
                        <div className="col-md-4" key={product._id}>
                          <div className="detail-related-product-card mb-4">
                            <img
                              src="/shoes.png"
                              alt=""
                              className="img-fluid"
                            />
<div className="shoes-detail-content">
                                  <div className="shoes-detail-title">
                                    <h6
                                      className="mb-1"
                                      style={{ fontWeight: "600" }}
                                    >
                                      {product.productName}
                                    </h6>
                                    <span>{product.description}</span>
                                  </div>
                                  <div className="shoes-detail-location">
                                    <FontAwesomeIcon
                                      icon={faLocationDot}
                                      style={{
                                        fontSize: "10px",
                                        color: "#74CC7E",
                                      }}
                                    />
                                    <p className="mb-0 ms-1">{product.location}</p>
                                  </div>
                                  <div className="shoes-price d-flex align-items-center ">
                                    <span>₹</span>
                                    <p className="mb-0">{product.productprice}</p>
                                  </div>
                                </div>
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-[10px]">
            <div className="review-list-title mb-4 pt-[30px] ml-[30px]">
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
    </>
  );
};

export default Shoes;
