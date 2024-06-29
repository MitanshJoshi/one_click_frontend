import React, { useEffect, useState } from 'react';
import SecondNavbar from '../Navbar/Navbar';
import './startup-review.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faComment, faShareNodes } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from '../../BASE_URL';

const reviews = [
  {
    name: "Sona Seth",
    reviews: "100 Reviews, 38 followers",
    rating: 4.9,
    time: "5 min ago",
    comment: "“ Lorem ipsum Lorem ipsum  Lorem ipsum Lorem ipsum  Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum...",
  },
  {
    name: "Sona Seth",
    reviews: "100 Reviews, 38 followers",
    rating: 4.9,
    time: "5 min ago",
    comment: "“ Lorem ipsum Lorem ipsum  Lorem ipsum Lorem ipsum  Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum  Lorem ipsum Lorem ipsum  Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum... Lorem ipsum Lorem ipsum  Lorem ipsum Lorem ipsum  Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum... Lorem ipsum Lorem ipsum  Lorem ipsum Lorem ipsum  Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum...", 
  },
  // Add more reviews here...
];

const Startup_review = () => {
  const { _id } = useParams();
  const [data, setdata] = useState();

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/startup/displaydetail?startupId=${_id}`,
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
      setdata(responseData.data);
    } catch (error) {
      toast.error("Something went wrong!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
          {reviews.map((review, index) => (
            <div className="mb-4" key={index}>
              <div className="startup-user-review-detail">
                <div className="flex justify-between mb-4">
                  <div className="startup-user-review-detail-name flex items-center">
                    <div>
                      <img src="/review.png" alt="" />
                    </div>
                    <div className="ml-3">
                      <h6 className="mb-0">{review.name}</h6>
                      <p className="mb-0">{review.reviews}</p>
                    </div>
                  </div>
                  <div className="text-end startup-user-review-detail-time">
                    <span>{review.rating}</span><FontAwesomeIcon icon={faStar} className="ml-2 text-gold" />
                    <p>{review.time}</p>
                  </div>
                </div>
                <div className="startup-user-review-description flex justify-between items-center">
                  <p className="mb-0">{review.comment}</p>
                  <div className="flex">
                    <FontAwesomeIcon icon={faComment} className="round-icon-border" />
                    <FontAwesomeIcon icon={faShareNodes} className="round-icon-border ml-3" />
                  </div>
                </div>
              </div>
            </div>
          ))}
          
        </div>
      </section>
    </>
  );
};

export default Startup_review;
