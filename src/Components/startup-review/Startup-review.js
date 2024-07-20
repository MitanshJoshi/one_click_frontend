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
  const [editReviewStars, setEditReviewStars] = useState(0);
  const [deleteReviewId, setDeleteReviewId] = useState(null);
  const [sortType, setSortType] = useState("all");

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
    console.log("handleEdit invoked for reviewId:", reviewId);
    console.log("Edit review detail:", editReviewDetail);
    console.log("Edit review stars:", editReviewStars);

    try {
      const response = await fetch(
        `${BASE_URL}/api/review/edit?review_id=${reviewId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify({
            detail: editReviewDetail,
            stars: editReviewStars,
          }),
        }
      );

      console.log("Response status:", response.status);
      console.log("Response:", response);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error data:", errorData);
        throw new Error("Edit request failed");
      }

      toast.success("Review updated successfully!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      setEditReviewId(null);
      fetchReviews();
    } catch (error) {
      console.error("Error:", error);
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

  const averageRating = reviews.length
    ? (
        reviews.reduce((acc, review) => acc + review.stars, 0) / reviews.length
      ).toFixed(1)
    : 0;

  const sortReviews = (type) => {
    let sortedReviews = [...reviews];
    if (type === "highToLow") {
      sortedReviews.sort((a, b) => b.stars - a.stars);
    } else if (type === "lowToHigh") {
      sortedReviews.sort((a, b) => a.stars - b.stars);
    } // Add more sorting types if needed
    setReviews(sortedReviews);
    setSortType(type);
  };

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
              <button>{averageRating}</button>
            </div>
          </div>
          <div className="startup-recent-review flex items-center mt-3">
            <h6 className="mb-0">Recent Rating</h6>
            <div className="flex flex-wrap gap-3 ml-5">
              {reviews.slice(0, 4).map((review, index) => (
                <button key={index}>{review.stars}</button>
              ))}
            </div>
          </div>
          <div className="startup-user-review mb-4 flex items-center flex-wrap">
            <h6 className="mb-0">User Review</h6>
            <div className="flex flex-wrap gap-3 ml-4">
              <button
                className={`startup-user-review-button ${
                  sortType === "all" ? "active" : ""
                }`}
                onClick={() => sortReviews("all")}
              >
                All Review
              </button>
              <button
                className={sortType === "highToLow" ? "active" : ""}
                onClick={() => sortReviews("highToLow")}
              >
                High to Low
              </button>
              <button
                className={sortType === "lowToHigh" ? "active" : ""}
                onClick={() => sortReviews("lowToHigh")}
              >
                Low to High
              </button>
            </div>
          </div>
          <div className="grid lg:grid-cols-2 gap-4 lg:mx-[100px]">
            {reviews &&
              reviews.map((review) => (
                <div className="hotel-review-specific" key={review._id}>
                  <div className="personal-review">
                    <div className="d-flex justify-content-between h-[60px] mb-[10px]">
                      <div className="d-flex hotel-review-header">
                        <div>
                          <div className="flex justify-center items-center gap-2">
                            <img
                              className="rounded-full w-[40px] h-[40px]"
                              src={review.userId.profilePicture}
                              alt=""
                            />
                            <div>
                              <h6 className="mb-0">
                                <span className="font-medium">
                                  Product Name:
                                </span>{" "}
                                {review.productId?.productName}
                              </h6>
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
                            console.log(
                              "Edit button clicked for reviewId:",
                              review._id
                            );
                            setEditReviewId(review._id);
                            setEditReviewDetail(review.detail);
                            setEditReviewStars(review.stars);
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
                        <div className="mb-4">
                          <label className="block mb-2">Stars</label>
                          <div className="flex space-x-1">
                            {[...Array(5)].map((_, index) => (
                              <FontAwesomeIcon
                                icon={faStar}
                                className={`cursor-pointer ${
                                  index < editReviewStars
                                    ? "text-[#FFD700]"
                                    : "text-gray-300"
                                }`}
                                key={index}
                                onClick={() => setEditReviewStars(index + 1)}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="flex justify-end space-x-2">
                          <button
                            className="btnn2"
                            onClick={() => handleEdit(review._id)}
                          >
                            Submit
                          </button>
                          <button
                            className="btnn"
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
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Startup_review;
