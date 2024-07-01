import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { BASE_URL } from "../../BASE_URL";
import "./startup-review.css";

const Startup_review = () => {
  const { _id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [editReviewId, setEditReviewId] = useState(null);
  const [editReviewDetail, setEditReviewDetail] = useState("");
  const [deleteReviewId, setDeleteReviewId] = useState(null);

  const fetchReviews = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/review/display`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const data = await response.json();
      setReviews(data.data);
    } catch (error) {
      toast.error("Failed to fetch reviews!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
    }
  };

  const handleEdit = async (reviewId) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/review/edit?review_id=${reviewId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify({ detail: editReviewDetail }),
        }
      );

      if (!response.ok) {
        throw new Error("Edit request failed");
      }

      toast.success("Review updated successfully!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      setEditReviewId(null);
      fetchReviews();
    } catch (error) {
      toast.error("Failed to edit review!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
    }
  };

  const handleDelete = async (reviewId) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/review/delete?review_id=${reviewId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      if (!response.ok) {
        throw new Error("Delete request failed");
      }

      toast.success("Review deleted successfully!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      setDeleteReviewId(null);
      fetchReviews();
    } catch (error) {
      toast.error("Failed to delete review!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
    }
  };

  useEffect(() => {
    fetchReviews();
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
          {/* {reviews.map((review) => (
            <div className="mb-4" key={review._id}> 
              <div className="startup-user-review-detail mx-[200px]">
                <div className="flex justify-between mb-4">
                  <div className="startup-user-review-detail-name flex items-center">
                    <div>
                      <img src="/review.png" alt="" />
                    </div>
                    <div className="ml-3">
                      <h6 className="mb-0">Product Name: {review.productId?.productName}</h6>
                      <p className="mb-0">{review.userId.name}</p>
                    </div>
                  </div>
                  <div className="text-end startup-user-review-detail-time">
                    <span>{review.stars}</span>
                    <FontAwesomeIcon icon={faStar} className="ml-2 text-gold" />
                    <p>{new Date(review.createdAt).toLocaleString()}</p>
                  </div>
                </div>
                <div className="startup-user-review-description flex justify-between items-center">
                  <p className="mb-0">{review.detail}</p>
                  <div className="flex justify-end items-end mr-[-10px]">
                    <button
                      className="btnn"
                      onClick={() => {
                        setEditReviewId(review._id);
                        setEditReviewDetail(review.detail);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btnn1"
                      onClick={() => setDeleteReviewId(review._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
              {editReviewId === review._id && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                  <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                    <h4 className="text-lg font-semibold mb-4">Edit Review</h4>
                    <textarea
                      className="w-full h-32 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                      value={editReviewDetail}
                      onChange={(e) => setEditReviewDetail(e.target.value)}
                    />
                    <div className="flex justify-end">
                      <button
                        className="btnn"
                        onClick={() => handleEdit(review._id)}
                      >
                        Submit
                      </button>
                      <button
                        className="btnn1"
                        onClick={() => setEditReviewId(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {deleteReviewId === review._id && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                  <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                    <h4 className="text-xl font-bold text-gray-800 mb-4">
                      Confirm Delete
                    </h4>
                    <p className="text-gray-600 mb-4">
                      Are you sure you want to delete this review?
                    </p>
                    <div className="flex justify-end space-x-2">
                      <button
                        className="btnn1"
                        onClick={() => handleDelete(review._id)}
                      >
                        Delete
                      </button>
                      <button
                        className="btnn"
                        onClick={() => setDeleteReviewId(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))} */}
          <div className=" grid grid-cols-2 gap-4 mx-[100px]">
            {reviews &&
              reviews?.map((review, index) => (
                <div className="hotel-review-specific ">
                  <div className="personal-review">
                    <div className="d-flex justify-content-between h-[60px] mb-[10px]">
                      <div className="d-flex hotel-review-header">
                        <div>
                          <div className="flex justify-center items-center gap-2">
                            <img
                              className="rounded-full w-[40px] h-[40px]"
                              src={review.userId.profilePicture}
                              alt=""
                            ></img>
                            <div>
                            <h6 className="mb-0"><span className="font-medium ">Product Name:</span> {review.productId?.productName}</h6>
                              <h5 className="mb-1">{review.userId.name}</h5>
                              <p className="mb-0">
                                {new Date(review.createdAt).toLocaleDateString(
                                  "en-GB"
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex">
                        {[...Array(review.stars)].map((star, i) => (
                          <FontAwesomeIcon
                            icon={faStar}
                            className="text-[#FFD700]"
                            key={i}
                          />
                        ))}
                      </div>
                    </div>
                    <hr />
                    <div className="flex">
                      <div className="mt-[10px] w-[90%] text-justify">
                        <p>{review.detail}</p>
                      </div>
                      <div className="flex justify-end items-end w-[10%]">
                        <button
                          className="mr-[10px] mb-[2px]"
                          onClick={() => {
                            setEditReviewId(review._id);
                            setEditReviewDetail(review.detail);
                          }}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="mb-[2px]"
                          onClick={() => setDeleteReviewId(review._id)}
                        >
                          <FaTrashAlt />
                        </button>
                      </div>
                    </div>
                  </div>
                  {editReviewId === review._id && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                        <h4 className="text-lg font-semibold mb-4">
                          Edit Review
                        </h4>
                        <textarea
                          className="w-full h-32 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                          value={editReviewDetail}
                          onChange={(e) => setEditReviewDetail(e.target.value)}
                        />
                        <div className="flex justify-end">
                          <button
                            className="btnn"
                            onClick={() => handleEdit(review._id)}
                          >
                            Submit
                          </button>
                          <button
                            className="btnn1"
                            onClick={() => setEditReviewId(null)}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  {deleteReviewId === review._id && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                        <h4 className="text-xl font-bold text-gray-800 mb-4">
                          Confirm Delete
                        </h4>
                        <p className="text-gray-600 mb-4">
                          Are you sure you want to delete this review?
                        </p>
                        <div className="flex justify-end space-x-2">
                        <button
                            className="btnn"
                            onClick={() => setDeleteReviewId(null)}
                          >
                            No
                          </button>
                          <button
                            className="btnn1"
                            onClick={() => handleDelete(review._id)}
                          >
                            Yes
                          </button>
                          
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Startup_review;
