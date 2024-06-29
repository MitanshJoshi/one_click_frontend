import React, { useEffect, useState } from 'react';
import SecondNavbar from '../Navbar/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faComment, faShareNodes } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Reviews.css"
import { BASE_URL } from '../../BASE_URL';
import Rating from "@mui/material/Rating";

const ProductReviews = () => {
  const { _id } = useParams();
  console.log('id is:',_id);
  
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    try {
      const response = await fetch(`https://oneclick-sfu6.onrender.com/api/review/displayReviewByproductId/${_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch reviews");
      }

      const responseData = await response.json();
      if (responseData && responseData.reviews) {
        setReviews(responseData.reviews);
      } else {
        throw new Error("No reviews found");
      }
    } catch (error) {
      toast.error("Failed to fetch reviews", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [_id]);

  return (
    <>
      <ToastContainer />
      <section className="mt-5">
        <div className="startup-review">
          <div className="startup-average-review flex justify-between items-center">
            <div>
              <h6>User Review & Rating</h6>
              <p>100% Authenticated & Trusted ratings from OneClick users</p>
            </div>
            <div>
              <button>4.6</button>
            </div>
          </div>
          <div className="startup-recent-review flex items-center mt-3">
            <h6 className="mb-0">Recent Rating</h6>
            <div className="flex flex-wrap gap-3 ml-5">
              <button>4.5</button>
              <button>4.0</button>
              <button>4.5</button>
              <button>5.0</button>
            </div>
          </div>
          <div className="startup-user-review mb-4 flex items-center flex-wrap">
            <h6 className="mb-0">User Review</h6>
            <div className="flex flex-wrap gap-3 ml-4">
              <button className="startup-user-review-button">All Review</button>
              <button>Popular</button>
              <button>High to Low</button>
              <button>Low to High</button>
            </div>
          </div>
          <div className=' grid grid-cols-2 gap-4'>
          {reviews && reviews?.map((review, index) => (
                    <div className="hotel-review-specific">
                      <div className="personal-review">
                        <div className="d-flex justify-content-between">
                          <div className="d-flex hotel-review-header">
                            <div>
                              <img src="" alt="" />
                            </div>
                            <div>
                              <h5 className="mb-1">{review.name}</h5>
                              <p className="mb-0">{review.createdAt?.slice(0, 10)}</p>
                            </div>
                          </div>
                          <div className="d-flex align-items-center">
                    {[...Array(review.stars)].map((star, i) => (
                      <FontAwesomeIcon icon={faStar} className="text-[#FFD700]" key={i} />
                    ))}
                  </div>
                        </div>
                        <hr />
                        <div>
                          <p>{review.detail}</p>
                        </div>
                      </div>
                    </div>
                ))}
                </div>
        </div>
      </section>
    </>
  );
};

export default ProductReviews;
