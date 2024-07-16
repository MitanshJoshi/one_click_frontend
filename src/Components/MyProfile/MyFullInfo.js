import React, { useState, useEffect } from "react";
import "./myfullinfo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import DisplayProfile from "../DisplayProfile/DisplayProfile";
import SecondNavbar from "../Navbar/Navbar";
import AddStartUp from "../AddStartUp/Addprduct";
import Startup_review from "../startup-review/Startup-review";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import Userinquiry from "../User-inquiry/Userinquiry";
import EducationBack from "../../EducationBackground/educationBack";
import { BASE_URL } from "../../BASE_URL";
import DisplayInvestor from "../DisplayProfile/DisplayInvestor";
import InvestorPortfolio from "../../InvestorPortfolio/InvestorPortfolio";
import StartupCards from "../../StartupsDisplay/StartupDisp";
import InvestorCards from "../../InvestorDisplay/InvestorDisplay";
import InvestorInquiry from "../../InvestorInquiry/InquiryDisplay";
import InquiryDoneOnInvestor from "../../InvestorInquiry/InquiryDoneOnInvestor";

const MyFullInfo = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [addStartup, setAddStartup] = useState(false);
  const [startups, setStartups] = useState([]);
  // console.log(startups)
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedStartupId, setSelectedStartupId] = useState(null);
  const [investorToken, setinvestorToken] = useState(
    localStorage.getItem("investorToken")
  );
  const [img, setimg] = useState("");

  useEffect(() => {
    const myData = localStorage.getItem("myData");
    console.log("myData from localStorage:", myData);
    if (myData == "inquiry") {
      setActiveTab(7);
      localStorage.removeItem("myData");
    }
    if (myData == "Startup") {
      setActiveTab(2);
      localStorage.removeItem("myData");
    }
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/startup/displaybasic`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });

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
    localStorage.getItem("token")?fetchData():<></>;
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
      if (response.ok) {
        toast.success("Startup Deleted Successfully", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 1000,
        });

        // Clear input fields after successful submission
      }

      if (!response.ok) {
        throw new Error("Request failed");
      } else {
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
          Authorization: localStorage.getItem("token"),
        },
      });
      const Data = await response.json();

      setname(Data.data[0].name || "");
      console.log("data is:", Data);

      setimg(Data.data[0].profilePicture || "");
      // console.log(Data.data)
    } catch (error) {
      // console.error("Error fetching data from the backend", error);
    }
  };
  const display1 = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/Investor/getInvestorById`, {
        method: "GET",
        headers: {
          // "Content-Type": "application/json",
          Authorization: localStorage.getItem("investorToken"),
        },
      });
      const Data = await response.json();
      console.log("data", Data);

      setname(Data.investor.InvestorName || "");
      console.log("data is:", Data);

      setimg(Data.investor.InvestorPhoto || "");
      // console.log(Data.data)
    } catch (error) {
      // console.error("Error fetching data from the backend", error);
    }
  };

  useEffect(() => {
    {
      !investorToken ? display() : display1();
    }
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
          Authorization: localStorage.getItem("token"),
        },
        body: formData,
      });

      if (!response.ok) {
      }
      display();
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
          <div className="custom-tabs flex justify-center ">
            <div
              className={`custom-tab ${activeTab === 0 ? "active" : ""}`}
              onClick={() => handleTabClick(0)}
            >
              <h5 className="mb-0 tab-bold-css text-center">
                Basic Information
              </h5>
              {activeTab === 0 && (
                <div className="active-icon">
                  <img src="./tab-photo.png" alt="" className="" />
                </div>
              )}
            </div>
            {investorToken ? (
              <></>
            ) : (
              <div
                className={`custom-tab ${activeTab === 1 ? "active" : ""}`}
                onClick={() => handleTabClick(1)}
              >
                <h5 className="mb-0 tab-bold-css text-center">
                  Education Background
                </h5>
                {activeTab === 1 && (
                  <div className="active-icon">
                    <img src="./tab-photo.png" alt="" className="" />
                  </div>
                )}
              </div>
            )}

            {investorToken ? (
              <div
                className={`custom-tab ${activeTab === 5 ? "active" : ""}`}
                onClick={() => handleTabClick(5)}
              >
                <h5 className="mb-0 tab-bold-css text-center">
                  Investor Portfolio
                </h5>
                {activeTab === 5 && (
                  <div className="active-icon">
                    <img src="./tab-photo.png" alt="" className="" />
                  </div>
                )}
              </div>
            ) : (
              <></>
            )}

            <div
              className={`custom-tab ${activeTab === 2 ? "active" : ""}`}
              onClick={() => handleTabClick(2)}
            >
              <h5 className="mb-0 tab-bold-css text-center">Start-ups</h5>
              {activeTab === 2 && (
                <div className="active-icon">
                  <img src="./tab-photo.png" alt="" className="" />
                </div>
              )}
            </div>

            {!investorToken ? (
              <div
                className={`custom-tab ${activeTab === 3 ? "active" : ""}`}
                onClick={() => handleTabClick(3)}
              >
                <h5 className="mb-0 tab-bold-css text-center">My inquiry</h5>
                {activeTab === 3 && (
                  <div className="active-icon">
                    <img src="./tab-photo.png" alt="" className="" />
                  </div>
                )}
              </div>
            ) : (
              <></>
            )}
            {!investorToken ? (
              <div
                className={`custom-tab ${activeTab === 4 ? "active" : ""}`}
                onClick={() => handleTabClick(4)}
              >
                <h5 className="mb-0 tab-bold-css text-center">My Reviews</h5>
                {activeTab === 4 && (
                  <div className="active-icon">
                    <img src="./tab-photo.png" alt="" className="" />
                  </div>
                )}
              </div>
            ) : (
              <></>
            )}
            {!investorToken ? (
              <div
                className={`custom-tab ${activeTab === 6 ? "active" : ""}`}
                onClick={() => handleTabClick(6)}
              >
                <h5 className="mb-0 tab-bold-css text-center">All Investors</h5>
                {activeTab === 6 && (
                  <div className="active-icon">
                    <img src="./tab-photo.png" alt="" className="" />
                  </div>
                )}
              </div>
            ) : (
              <></>
            )}
            {investorToken ? (
              <div
                className={`custom-tab ${activeTab === 7 ? "active" : ""}`}
                onClick={() => handleTabClick(7)}
              >
                <h5 className="mb-0 tab-bold-css text-center">My Inquiry</h5>
                {activeTab === 7 && (
                  <div className="active-icon">
                    <img src="./tab-photo.png" alt="" className="" />
                  </div>
                )}
              </div>
            ) : (
              <></>
            )}
            {investorToken ? (
              <div
                className={`custom-tab ${activeTab === 8 ? "active" : ""}`}
                onClick={() => handleTabClick(8)}
              >
                <h5 className="mb-0 tab-bold-css text-center">Inquiries on me</h5>
                {activeTab === 8 && (
                  <div className="active-icon">
                    <img src="./tab-photo.png" alt="" className="" />
                  </div>
                )}
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="custom-tab-panel ">
            {activeTab === 0 && (
              <div>
                {!investorToken ? (
                  <DisplayProfile img={img} />
                ) : (
                  <DisplayInvestor />
                )}
              </div>
            )}
            {activeTab === 1 && (
              <div>
                <EducationBack />
              </div>
            )}
            {activeTab === 2 && (
              <>
                {addStartup ? (
                  <>
                    <AddStartUp />
                  </>
                ) : (
                  <>
                    {startups && startups.length > 0 && !investorToken ? (
                      <div className="container mx-auto mt-5 lg:w-[90%] w-[120%]">
                      <div className="grid gap-4 sm:grid-cols-2">
                        {startups.map((e) => (
                          <div className="col-12 mb-4 " key={e._id}>
                            <div className="shadow-startup shadow p-4">
                              <div className="flex justify-between mb-4">
                                <div className="flex items-center">
                                  <img
                                    src={e.startupLogoURL}
                                    alt=""
                                    className="w-12 h-12 rounded-full"
                                  />
                                  <div className="ml-4">
                                    <p className="font-bold">{e.startupName}</p>
                                    <p className="text-sm text-gray-500">{e.categoryName}, {e.subcategoryName}</p>
                                  </div>
                                </div>
                                <div className="flex items-center">
                                  <span className="text-yellow-500">
                                    <FontAwesomeIcon icon={faStar} />
                                    <FontAwesomeIcon icon={faStar} />
                                    <FontAwesomeIcon icon={faStar} />
                                  </span>
                                  <span className="text-gray-300 ml-1">
                                    <FontAwesomeIcon icon={faStar} />
                                    <FontAwesomeIcon icon={faStar} />
                                  </span>
                                </div>
                              </div>
                              <hr className="my-2" />
                              <div className="flex items-center mb-2">
                                <FontAwesomeIcon icon={faLocationDot} className="text-green-500" />
                                <span className="ml-2">{e.city}, {e.state}, {e.country}</span>
                              </div>
                              <div className="flex items-center mb-2">
                                <FontAwesomeIcon icon={faLocationDot} className="text-green-500" />
                                <span className="ml-2 min-h-20 flex items-center">{e.address}</span>
                              </div>
                              <div className="flex justify-between items-center mt-4">
                                <button onClick={() => handleNavigate(e._id)} className="backk text-white px-4 py-2 rounded">
                                  VIEW
                                </button>
                                {!investorToken && (
                                  <div className="flex">
                                    <button className="edit-icon" onClick={() => handleEdit(e._id)}>
                                      <img src="./edit.png" alt="Edit" />
                                    </button>
                                    <button className="delete-icon ml-3" onClick={() => handleDelete(e._id)}>
                                      <img src="./delete.svg" alt="Delete" />
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    ) : investorToken ? (
                      <StartupCards />
                    ) : (
                      <div
                        className="m-auto"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          paddingTop: "50px",
                        }}
                      >
                        <h3>ADD NEW STARTUP</h3>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
            {activeTab === 3 && (
              <div>
                <Userinquiry />
              </div>
            )}
            {activeTab === 4 && (
              <div>
                <Startup_review />
              </div>
            )}
            {activeTab === 5 && (
              <div>
                <InvestorPortfolio />
              </div>
            )}
            {activeTab === 6 && (
              <div>
                <InvestorCards />
              </div>
            )}
            {activeTab === 7 && (
              <div>
                <InvestorInquiry />
              </div>
            )}
            {activeTab === 8 && (
              <div>
                <InquiryDoneOnInvestor />
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
                <button className="btng" onClick={handleConfirmDelete}>
                  Yes
                </button>
                <button className="btnr" onClick={handleCancelDelete}>
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MyFullInfo;
