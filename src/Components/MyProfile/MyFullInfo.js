import React, { useState, useEffect } from "react";
import "./myfullinfo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import DisplayProfile from "../DisplayProfile/DisplayProfile";
import SecondNavbar from "../Navbar/Navbar";
import AddStartUp from "../AddStartUp/Addprduct";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import Userinquiry from "../User-inquiry/Userinquiry";
import { BASE_URL } from "../../BASE_URL";

const MyFullInfo = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [addStartup, setAddStartup] = useState(false);
  const [startups, setStartups] = useState([]);
  // console.log(startups)
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedStartupId, setSelectedStartupId] = useState(null);
  const [img, setimg] = useState("");
  console.log(img)
  
  const fetchData = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/startup/displaybasic`,
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
      setStartups(responseData.data);
      // setStartups(responseData.data);
      // console.log(responseData.data);
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

  const handleAdd = () => {
    setAddStartup(true);
  };

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const handleNavigate = (id) => {
    navigate(`/start-up-full-detail/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/edit`, { state: { abc: id } });
  };

  const handleDelete = (id) => {
    setSelectedStartupId(id);
    setShowConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/startup/delete?startup_id=${selectedStartupId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      if (!response.ok) {
        throw new Error("Request failed");
      }

      fetchData();
      setShowConfirmation(false);
    } catch (error) {
      toast.error("Something went wrong!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  // displayimg and name api
  const [name, setname] = useState();
  // const[img,setimg]=useState()
  // console.log(img)

  const display = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/user/display`, {
        method: "GET",
        headers: {
          // "Content-Type": "application/json",
          // "Access-Control-Allow-Origin": "*",
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      const Data = await response.json();

      setname(Data.data[0].name || "");
      setimg(Data.data[0].profileImageURL || "");
      // console.log(Data.data)
    } catch (error) {
      // console.error("Error fetching data from the backend", error);
    }
  };

  useEffect(() => {
    // setCountryData(Countries);


    display();
  }, []);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  useEffect(() => {
    if (selectedFile) {
      handleProfile();
    }
  }, [selectedFile]);

  const handleProfile = async () => {
    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const response = await fetch(`${BASE_URL}/api/user/edit`, {
        method: "POST",
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (!response.ok) {
      
      }
      display()
      // console.log(response);

      // Handle success
    } catch (error) {
      // console.error("Profile image upload failed:", error.message);
      // Handle error
    }
  };
  

  return (
    <>
      <SecondNavbar />
      <div className="container">
        <ToastContainer />
        <div className="profile-box">
          <section>
            <div>
              <img
                className="background-image img-fluid"
                style={{ width: "100%" }}
                src="./BgDisplay.jpg"
                alt="Background"
              />
            </div>
            <div className="d-flex justify-content-between align-items-center profile-image">
              <div className="d-flex align-items-end ms-sm-5 ms-2">
                <div className="my-profile-relative">
                  <img
                    src={img}
                    alt="User Display"
                    value={img}
                    style={{
                      height: "150px",
                      width: "150px",
                      borderRadius: "50%",
                    }}
                  />
                  <label
                    htmlFor="file-upload"
                    className="edit-icon mb-5 my-profile-image-change"
                  >
                    <img src="/edit.png" alt="" />
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                </div>
                <div className="profileDiv " style={{ marginLeft: "20px" }}>
                  <h4 className="h4 mb-1">Profile</h4>
                  <p className="lead mb-4 ">{name}</p>
                </div>
              </div>
              <div className="add-start-up-button mt-sm-5 mt-0">
                <button onClick={handleAdd}>+ Add New Start-up</button>
              </div>
            </div>
          </section>
        </div>

        <div className="custom-tabs-container mt-5">
          <div className="custom-tabs">
            <div
              className={`custom-tab ${activeTab === 0 ? "active" : ""}`}
              onClick={() => handleTabClick(0)}
            >
              <h5 className="mb-0 tab-bold-css">Basic Information</h5>
              {activeTab === 0 && (
                <div className="active-icon">
                  <img src="./tab-photo.png" alt="" className="" />
                </div>
              )}
            </div>

            <div
              className={`custom-tab ${activeTab === 1 ? "active" : ""}`}
              onClick={() => handleTabClick(1)}
            >
              <h5 className="mb-0 tab-bold-css">Start-ups</h5>
              {activeTab === 1 && (
                <div className="active-icon">
                  <img src="./tab-photo.png" alt="" className="" />
                </div>
              )}
            </div>
            <div
              className={`custom-tab ${activeTab === 2 ? "active" : ""}`}
              onClick={() => handleTabClick(2)}
            >
              <h5 className="mb-0 tab-bold-css">My inquiry</h5>
              {activeTab === 2 && (
                <div className="active-icon">
                  <img src="./tab-photo.png" alt="" className="" />
                </div>
              )}
            </div>
          </div>
          <div className="custom-tab-panel ">
            {activeTab === 0 && (
              <div>
                <DisplayProfile img={img} />
              </div>
            )}
            {activeTab === 1 && (
              <>
                {addStartup ? (
                  <>
                    <AddStartUp />
                  </>
                ) : (
                  <>
                    {startups && startups.length > 0 ? (
                      <div>
                        <div className="row mt-5">
                          {startups &&
                            startups.map((e) => (
                              <div className="col-12 col-md-6 mb-4" key={e._id}>
                                <div className="shadow-startup shadow">
                                  <div className="d-flex justify-content-between mb-4">
                                    <div className="d-flex align-items-center">
                                      <img
                                        src={e.startupLogoURL}
                                        alt=""
                                        style={{
                                          width: "50px",
                                          height: "50px",
                                          borderRadius: "50%",
                                        }}
                                      />{" "}
                                      {/* Corrected */}
                                      <div style={{ marginLeft: "10px" }}>
                                        <p className="mb-0 fw-bold">
                                          {e.startupName}
                                        </p>
                                        <p
                                          className="mb-0"
                                          style={{
                                            color: "#000000",
                                            opacity: "0.5",
                                          }}
                                        >
                                          {e.categoryName},{e.subcategoryName}
                                        </p>
                                      </div>
                                    </div>
                                    <div>
                                      <span>3 </span>
                                      <FontAwesomeIcon
                                        icon={faStar}
                                        style={{ color: "gold" }}
                                      />
                                      <FontAwesomeIcon
                                        icon={faStar}
                                        style={{ color: "gold" }}
                                      />
                                      <FontAwesomeIcon
                                        icon={faStar}
                                        style={{ color: "gold" }}
                                      />
                                      <FontAwesomeIcon icon={faStar} />
                                      <FontAwesomeIcon icon={faStar} />
                                    </div>
                                  </div>
                                  <div className="d-flex mt-3">
                                    <div>
                                      <FontAwesomeIcon icon={faLocationDot} />
                                      <span style={{ marginLeft: "10px" }}>
                                        {e.city},
                                      </span>
                                      <span style={{ marginLeft: "10px" }}>
                                        {e.state},
                                      </span>
                                      <span style={{ marginLeft: "10px" }}>
                                        {e.country}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="d-flex justify-content-between mt-3">
                                    <div onClick={() => handleNavigate(e._id)}>
                                      <FontAwesomeIcon icon={faLocationDot} />
                                      <span style={{ marginLeft: "10px" }}>
                                        {e.address}
                                      </span>
                                    </div>
                                    <div>
                                      <p
                                        className="text-end"
                                        style={{ fontWeight: "600" }}
                                      >
                                        {e.inqubationcenterName} <br />{" "}
                                        {e.inqubationCenterCity}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="d-flex justify-content-end mt-2">
                                    <button className="edit-icon me-3">
                                      <img
                                        src="./edit.png"
                                        alt=""
                                        onClick={() => handleEdit(e._id)}
                                      />
                                    </button>
                                    <button className="delete-icon">
                                      <img
                                        src="./delete.svg"
                                        alt=""
                                        onClick={() => handleDelete(e._id)}
                                      />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    ) : (
                      <div className="m-auto" style={{display:"flex", justifyContent:"center", paddingTop:"50px"}}>
                      <h3>ADD NEW STARTUP</h3>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
            {activeTab === 2 && (
              <div>
                <Userinquiry />
              </div>
            )}
          </div>
        </div>

        {showConfirmation && (
          <div className="confirmation-modal">
            <div className="confirmation-content">
              <h3 className="confirmation-message">
                Are you sure you want to delete this startup?
              </h3>
              <div className="buttons-container">
                <button className="btng"  onClick={handleConfirmDelete}>Yes</button>
                <button className="btnr" onClick={handleCancelDelete}>No</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MyFullInfo;
