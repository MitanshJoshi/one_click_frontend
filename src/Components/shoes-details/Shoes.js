import React, { useState, useEffect } from "react";
import "./shoes.css"; // Import your existing CSS for any custom styles
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faComment, faShareNodes } from '@fortawesome/free-solid-svg-icons';
import { faFilter, faHeart, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { faStar } from "@fortawesome/free-solid-svg-icons";
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

  // Example swiper array
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
  const [reviews, setReviews] = useState([]);

  const [newReviewData, setNewReviewData] = useState({
    name: "",
    detail: "",
    stars: 0, // Default stars, can be modified
  });
  const [showAddReviewModal, setShowAddReviewModal] = useState(false);

  const handleReviewInputChange = (e) => {
    const { name, value } = e.target;
    setNewReviewData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Function to fetch reviews
  const fetchReviews = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/review/displayReviewByproductId/${_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token")
        }
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch reviews");
      }
  
      const responseData = await response.json();
      console.log('resppp', responseData);
  
      if (responseData.reviews) {
        setReviews(responseData.reviews);
        console.log('reviews', reviews);
      } else {
        setReviews([]);
        console.log('No reviews found for this product');
      }
  
    } catch (error) {
      // console.error("Error fetching reviews:", error.message);
      // toast.error("Failed to fetch reviews!", {
      //   position: toast.POSITION.BOTTOM_RIGHT,
      //   autoClose: 1000
      // });
    }
  };

  
  function reverseDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}


  // Function to fetch product and supplier data
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
    fetchReviews();
  }, []);

  const addReview = async (event) => {
    event.preventDefault(); // Prevent default form submission

    try {
      const response = await fetch(`${BASE_URL}/api/review/insert`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token")
        },
        body: JSON.stringify({
          stars: newReviewData.stars,
          startupId: supplier.startupId, // Adjust this according to your data structure
          detail: newReviewData.detail,
          productId: _id // Assuming _id is the product ID you want to associate with the review
        })
      });

      if (!response.ok) {
        throw new Error("Failed to add review");
      }

      const responseData = await response.json();
      console.log('respdata',responseData);
      
      toast.success("Review added successfully!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000
      });

      // Optionally, update state with the newly added review
      // For example, refetch all reviews after adding a new one
      fetchReviews();

      // Close the modal after adding review
      setShowAddReviewModal(false);
    } catch (error) {
      console.error("Error adding review:", error.message);
      toast.error("Failed to add review!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000
      });
    }
  };
  const editReview = async (reviewId, updatedReview) => {
    try {
      const response = await fetch(`${BASE_URL}/api/review/edit?review_id=${reviewId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token")
        },
        body: JSON.stringify(updatedReview)
      });
  
      if (!response.ok) {
        throw new Error("Failed to edit review");
      }
  
      const responseData = await response.json();
      toast.success("Review updated successfully!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000
      });
  
      // Optionally, update state with the edited review
      // For example, refetch all reviews after editing one
      fetchReviews();
    } catch (error) {
      console.error("Error editing review:", error.message);
      toast.error("Failed to edit review!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000
      });
    }
  };
  
  const deleteReview = async (reviewId) => {
    try {
      const response = await fetch(`${BASE_URL}/api/review/delete?review_id=${reviewId}`, {
        method: "DELETE",
        headers: {
          Authorization: localStorage.getItem("token")
        }
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete review");
      }
  
      const responseData = await response.json();
      toast.success("Review deleted successfully!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000
      });
  
      // Optionally, update state after deleting the review
      // For example, refetch all reviews after deleting one
      fetchReviews();
    } catch (error) {
      console.error("Error deleting review:", error.message);
      toast.error("Failed to delete review!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000
      });
    }
  };
  
  

  // Handle navigation to supplier detail page
  const handleAbout = () => {
    navigate("/supplier-detail", { state: { shoes, _id: _id } });
  };

  // Handle navigation to inquiry form
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
     <div className={`container ${showAddReviewModal ? "opacity-50"  : ""}`}>
        <ToastContainer />
        <div className="row mt-5 pt-4">
          {/* Left Section */}
          <div className="col-4 block lg:w-[33%] w-[100%]">
            {/* Product Images and Supplier Details */}
            <div>
              {/* Product Image */}
              <div className="detail-image-box">
                <img src="/shoes.png" alt="" className="img-fluid" />
              </div>
              {/* Swiper for Product Images */}
              <div className="detail-shoes-slider mt-4">
                <Swiper
                  slidesPerView={3.5}
                  spaceBetween={20}
                  freeMode={true}
                  pagination={{ clickable: true }}
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
              {/* Supplier Information */}
              <div className="about-supplier">
                <div>
                  <div className="about-supplier-title-photo">
                    <img src="/supplier-1.png" alt="" className="img-fluid" />
                  </div>
                  <div className="supplier-follow-buttons mt-3">
                    <button>Follow</button>
                  </div>
                  <div className="detail-supplier-detail mt-4">
                    <div className="detail-supplier-name d-flex justify-content-between">
                      <h4>{supplier.startupName}</h4>
                      <div>
                        {/* Displaying Supplier Rating */}
                        <h5 className="mb-0">
                          4.8
                          <FontAwesomeIcon
                            icon={faStar}
                            style={{ color: "gold" }}
                          />
                        </h5>
                        <span>{reviews.length} reviews</span>
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

          {/* Right Section */}
          <div className="col-8 lg:w-[67%] w-[100%] lg:mt-0 mt-3">
            {/* Product Details and Related Products */}
            <div>
              <div className="details-product-title mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h3><strong>{shoes.productName}</strong></h3>
                    <FontAwesomeIcon icon={faHeart} />
                    <span className="ms-1">Add to my wishlist</span>
                  </div>
                  <div>
                    <img src="/back.png" alt="" />
                  </div>
                </div>
              </div>
              <div>
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
                  {/* Product Specifications */}
                </div>
                <div className="mt-5">
                  {/* Related Products */}
                  <div className="detail-related-product">
                    <div className="detail-specification-title mb-4">
                      <h6>More From Seller</h6>
                    </div>
                    <div className="row">
                      {otherProducts.map((product) => (
                        <div className="col-md-4 border-gray-200 border-[1px] rounded-lg ml-1 mt-1 lg:w-[32.5%]" key={product._id}>
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
                                    color: "#74CC7E"
                                  }}
                                />
                                <p className="mb-0 ms-1">
                                  {product.location}
                                </p>
                              </div>
                              <div className="shoes-price d-flex align-items-center">
                                <span>₹</span>
                                <p className="mb-0">
                                  {product.productprice}
                                </p>
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

        {/* Reviews Section */}    
        <div className="mt-10">
  <div className="review-list-title mb-4 pt-30 pl-0 lg:mx-[70px]">
    <h3>Reviews</h3>
    <button className="cursor-pointer backk text-white font-bold py-2 px-4 rounded"  onClick={() => setShowAddReviewModal(true)}>
      Add Review
    </button>
  </div>
  <div className=' grid lg:grid-cols-2 gap-4 lg:mx-[200px]'>
          {reviews && reviews?.map((review, index) => (
                    <div className="hotel-review-specific">
                      <div className="personal-review">
                      <div className="d-flex justify-content-between h-[60px] mb-[10px]">
                          <div className="d-flex hotel-review-header">
                            <div>
                              <img src="" alt="" />
                            </div >
                            <div className="flex justify-center items-center gap-2">
                            <img
                              className="rounded-full w-[40px] h-[40px]"
                              src={review.profilePicture}
                              alt=""
                            ></img>
                            <div>
                              <h5 className="mb-1">{review.name}</h5>
                              <p className="mb-0">
                                {new Date(review.createdAt).toLocaleDateString(
                                  "en-GB"
                                )}
                              </p>
                              </div>
                            </div>
                          </div>
                          <div className="d-flex mt-[10px]">
                    {[...Array(review.stars)].map((star, i) => (
                      <FontAwesomeIcon icon={faStar} className="text-[#FFD700]" key={i} />
                    ))}
                  </div>
                        </div>
                        <hr/>
                        <div className="w-[90%] text-justify mt-[10px]">
                          <p>{review.detail}</p>
                        </div>
                      </div>
                    </div>
                ))}
                </div>
</div>

      </div>
      {showAddReviewModal && (
          <div className="modal" tabIndex="-1" role="dialog" style={{ display: "block" }}>
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add Review</h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={() => setShowAddReviewModal(false)}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form onSubmit={addReview}>
                    <div className="mb-3">
                      <label htmlFor="reviewDetail" className="form-label">
                        Review Detail
                      </label>
                      <textarea
                        className="form-control"
                        id="reviewDetail"
                        name="detail"
                        value={newReviewData.detail}
                        onChange={handleReviewInputChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="reviewStars" className="form-label">
                        Rating
                      </label>
                      <select
                        className="form-control"
                        id="reviewStars"
                        name="stars"
                        value={newReviewData.stars}
                        onChange={handleReviewInputChange}
                        required
                      >
                        <option value={0}>Select Stars</option>
                        <option value={1}>1 Star</option>
                        <option value={2}>2 Stars</option>
                        <option value={3}>3 Stars</option>
                        <option value={4}>4 Stars</option>
                        <option value={5}>5 Stars</option>
                      </select>
                    </div>
                    <button type="submit" className="btnn2">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
    </>
  );
};

export default Shoes;
