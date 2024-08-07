import React, { useEffect } from "react";
import "./startup-awards.css";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../BASE_URL";

const Startup_awards = () => {
  const Navigate = useNavigate();
  const [showAwardList, setShowAwardList] = useState(false);
  const [awardAdd, setAwardAdd] = useState(false);
  const [description, setdescription] = useState();
  const [achievementName, setachievementName] = useState();
  const [competitionName, setcompetitionName] = useState();
  const [file, setimage] = useState();
  const [achievementPlace, setachievementPlace] = useState();
  const [achievementYear, setachievementYear] = useState();
  const [visibleAwardCount, setVisibleAwardCount] = useState(6);
  const [isExpanded, setIsExpanded] = useState(false);
  const [visibleCertificateCount, setVisibleCertificateCount] = useState(6); // Initial number of certificates to display
  const [isExpandedd, setIsExpandedd] = useState(false);

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [awarddelete, setawarddelete] = useState(false);
  const [investorToken, setinvestorToken] = useState(localStorage.getItem("investorToken"));
  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };
  const toggleCertificates = () => {
    setIsExpandedd((prev) => !prev);
    if (isExpandedd) {
      setVisibleCertificateCount(6); // Show 6 certificates when collapsing
    } else {
      setVisibleCertificateCount(certi.length); // Show all certificates when expanding
    }
  };

  const toggleAwards = () => {
    setIsExpanded((prev) => !prev);
    if (isExpanded) {
      setVisibleAwardCount(6); // Show 6 awards when collapsing
    } else {
      setVisibleAwardCount(data.length); // Show all awards when expanding
    }
  };
  const handleawarddelete = (id) => {
    setawarddelete(id);
    setShowConfirmation(true);
  };
  const loadMoreAwards = () => {
    setVisibleAwardCount((prevCount) => prevCount + 6); // Increase by 6 awards when "See More" is clicked
  };
  const [showConfirmatio, setshowConfirmatio] = useState(false);
  const [cirtificatedelete, setcirtificatedelete] = useState(false);

  const handleCancelDelet = () => {
    setshowConfirmatio(false);
  };
  const cirtificatedelet = (id) => {
    setcirtificatedelete(id);
    setshowConfirmatio(true);
  };

  const { _id } = useParams();

  const handleawardedit = (id) => {
    Navigate("/awardedit", { state: { id, _id } });
  };
  // const { _id } = useParams();
  // const { startUpId } = useParams();
  const handleSeeListClick = () => {
    setShowAwardList(true);
    setAwardAdd(false); // Hide the other section
  };

  const handleBack = () => {
    localStorage.setItem("myData", "award");
    Navigate(0);
  };

  const handleAddAward = () => {
    setAwardAdd(true);
    setShowAwardList(false); // Hide the other section
  };
  const handlecertificate = () => {
    setAwardAdd(true);
    setShowAwardList(false); // Hide the other section
  };
  const handlecompetition = (e) => {
    setdescription(e.target.value);
  };
  const handlename = (e) => {
    setcompetitionName(e.target.value);
  };
  const handleimg = (e) => {
    const { files } = e.target;

    const selectedFile = files[0];

    setimage(selectedFile);
    // setimage(URL.createObjectURL(selectedFile))
  };
  const handleachievement = (e) => {
    setachievementName(e.target.value);
  };
  const handleplace = (e) => {
    setachievementPlace(e.target.value);
  };
  const handleyear = (e) => {
    setachievementYear(e.target.value);
  };
  const handlesubmit = async () => {
    if (!description) {
      toast.error("Description is must be required!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      return;
    }
    if (!competitionName) {
      toast.error("Competition Name is must be required!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      return;
    }
    if (!file) {
      toast.error("Upload Image is must be required!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      return;
    }
    if (!achievementName) {
      toast.error("Achievement Title is must be required!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      return;
    }
    if (!achievementPlace) {
      toast.error("Place You Won Achievement is must be required!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      return;
    }
    if (!achievementYear) {
      toast.error("Year You Won Achievement is must be required!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      return;
    }
    const formData = new FormData();
    formData.append("achievementPlace", achievementPlace);
    formData.append("achievementYear", achievementYear);
    formData.append("competitionName", competitionName);
    formData.append("achievementName", achievementName);
    formData.append("description", description);
    formData.append("image", file);
    formData.append("startupId", _id);
    try {
      const response = await fetch(`${BASE_URL}/api/award/insert`, {
        method: "POST",
        headers: {
          //   "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Request failed");
      }
      toast.success("Award insert successful!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      setTimeout(() => {
        localStorage.setItem("myData", "award");
        Navigate(0);
      }, 1000);
    } catch (error) {
      if (error) {
        toast.error("Something went wrong!", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 1000,
        });
      }
    }
  };

  console.log(_id);
  const [data, setdata] = useState([]);
  const [certi, setCeti] = useState([]);
  const fetchData = async () => {
    // console.log(localStorage.getItem("tokenData"));
    const token=investorToken?localStorage.getItem("investorToken"):localStorage.getItem("token");
    console.log('token',token);
    

    try {
      const response = await fetch(
        `${BASE_URL}/api/startup/displaydetail?startupId=${_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Request failed");
      }
      const responseData = await response.json();
      setdata(responseData.data[0].award);
      setCeti(responseData.data[0].certificate);
      //   cons;
    } catch (error) {
      if (error) {
        toast.error("Something went wrong!", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 1000,
        });
      }
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const [addCerti, setAddCerti] = useState("");

  const handleCertificate = (e) => {
    setAddCerti(e);
  };
  const [decscprt, setdecscprt] = useState();
  const [cname, setcname] = useState();
  const [cimg, setimg] = useState();
  const [certificateName, setcertificateName] = useState();
  const [certificateYear, setcertificateYear] = useState();
  const [certificatePlace, setcertificatePlace] = useState();

  const handlecirtificatediscription = (e) => {
    setdecscprt(e.target.value);
  };
  const handlecompetitionName = (e) => {
    setcname(e.target.value);
  };
  const handlcirtificateimg = (e) => {
    const { files } = e.target;

    const selectedFile = files[0];

    setimg(selectedFile);
    // setimage(URL.createObjectURL(selectedFile))
  };
  const handlecertificateName = (e) => {
    setcertificateName(e.target.value);
  };
  const handlecertificateYear = (e) => {
    setcertificateYear(e.target.value.trim());
  };
  const handlecertificatePlace = (e) => {
    setcertificatePlace(e.target.value);
  };

  const handlecirtificatesubmit = async () => {
    if (!decscprt) {
      toast.error("Description is must be required", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000,
      });
      return;
    }
    if (!cname) {
      toast.error("Competition Name is must be required", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000,
      });
      return;
    }
    if (!cimg) {
      toast.error("Upload Image is must be required", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000,
      });
      return;
    }
    if (!certificateName) {
      toast.error("Cirtificate Title is must be required", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000,
      });
      return;
    }
    if (!certificatePlace) {
      toast.error("Place You Won Cirtificate is must be required", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000,
      });
      return;
    }
    if (!certificateYear) {
      toast.error("Year You Won Cirtificate is must be required", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000,
      });
      return;
    }

    const formData = new FormData();
    formData.append("certificateName", certificateName);
    formData.append("competitionName", cname);
    formData.append("certificateYear", certificateYear);
    formData.append("certificatePlace", certificatePlace);
    formData.append("description", decscprt);
    formData.append("image", cimg);
    formData.append("startupId", _id);
    try {
      const response = await fetch(`${BASE_URL}/api/certificate/insert`, {
        method: "POST",
        headers: {
          //   "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Request failed");
      }
      toast.success(" Certificate insert successful!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      setTimeout(() => {
        localStorage.setItem("myData", "award");
        Navigate(0);
      }, 1000);
    } catch (error) {
      if (error) {
        toast.error("Something went wrong!", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 1000,
        });
      }
    }
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/award/delete?award_id=${awarddelete}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      setShowConfirmation(false);
      toast.success(" Award Delete successful!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      fetchData();
    } catch (error) {
      toast.error("Something went wrong!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
    }
  };

  const [certiList, setCertiList] = useState(false);

  const handleCertiList = () => {
    setCertiList(true);
  };

  const cirtificateedit = (id) => {
    Navigate("/cirtificateedit", { state: { id, _id } });
  };
  const handleConfirmDelet = async () => {
    // console.log(cirtificatedelet);
    try {
      const response = await fetch(
        `${BASE_URL}/api/certificate/delete?certificate_id=${cirtificatedelete}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      setshowConfirmatio(false);
      toast.success(" Certificate Delete successful!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      if (!response.ok) {
        throw new Error("Request failed");
      }

      fetchData();
      // setShowConfirmation(false);
    } catch (error) {
      toast.error("Something went wrong!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
    }
  };

  return (
    <>
      <section className="mb-5 " style={{ marginTop: "50px" }}>
        <ToastContainer />

        {showAwardList ? (
          <div>
            <div className="d-flex justify-content-between">
              <h2 className="mb-5">Achievement List</h2>
              <button className="back-buttone-style" onClick={handleBack}>
                BACK
              </button>
            </div>
            <div>
              <div className="achievement-list ">
                <div className="">
                  <div>
                    <p>Achievement Name</p>
                  </div>
                </div>
                <div className="">
                  <div>
                    <p>Place You Won Achievement</p>
                  </div>
                </div>
                <div className="">
                  <div>
                    <p>Competition Name</p>
                  </div>
                </div>
                <div className="">
                  <div>
                    <p>Year You Won Achievement</p>
                  </div>
                </div>
                <div className="">
                  <div>
                    <p>Upload Image</p>
                  </div>
                </div>
              </div>
              {/* award display */}
              {data &&
                data.map((e) => {
                  return (
                    <>
                      <div className="achievement-list achievement-list-content">
                        <div className="">
                          <div>
                            <h5>{e.achievementName}</h5>
                          </div>
                        </div>
                        <div className="">
                          <div>
                            <h5>{e.achievementPlace}</h5>
                          </div>
                        </div>
                        <div className="">
                          <div>
                            <h5>{e.competitionName}</h5>
                          </div>
                        </div>
                        <div className="">
                          <div>
                            <h5>{e.achievementYear}</h5>
                          </div>
                        </div>
                        <div className="">
                          <div className="d-flex align-items-center achivement-list-anchors">
                            <a className="mb-0 me-5">VIEW IMAGE</a>
                            <a href="" onClick={() => handleawardedit(e._id)}>
                              EDIT
                            </a>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
            </div>
          </div>
        ) : awardAdd ? (
          // Add award
          <>
            <div>
              <div className="d-flex justify-content-between">
                <h2 className="mb-5 font-[600]">
                  Add Awards
                </h2>
              </div>
              <div>
                <div className="flex flex-col lg:flex-row">
                  <div className="col-6">
                    <div className="add-award-form">
                      <div className="mb-4">
                        <p className="mb-3">Description</p>
                        <textarea
                          onInput={(e) => {
                            let value = e.target.value.replace(
                              /[^0-9 a-z A-Z @._]/g,
                              ""
                            ); // Remove non-numeric characters
                            // Check if the first digit is zero
                            if (value.length > 0 && value[0] === " ") {
                              // If the first digit is zero, remove it
                              value = value.slice(1);
                            }
                            // Set the updated value
                            e.target.value = value;
                          }}
                          name=""
                          id=""
                          cols="30"
                          rows="5"
                          value={description}
                          onChange={handlecompetition}
                          className="w-[190%] mx-[5%] lg:w-[100%] lg:mx-[0px]"
                        ></textarea>
                      </div>
                      <div className="mb-4">
                        <p className="mb-3">Competition Name</p>
                        <input
                          type="text"
                          onInput={(e) => {
                            let value = e.target.value.replace(
                              /[^0-9 a-z A-Z @._]/g,
                              ""
                            ); // Remove non-numeric characters
                            // Check if the first digit is zero
                            if (value.length > 0 && value[0] === " ") {
                              // If the first digit is zero, remove it
                              value = value.slice(1);
                            }
                            // Set the updated value
                            e.target.value = value;
                          }}
                          name=""
                          id=""
                          value={competitionName}
                          onChange={handlename}
                          className="w-[190%] mx-[5%] lg:mx-[0px] lg:w-[100%]"
                        />
                      </div>
                      <div className="mb-4">
                        <p className="mb-3">Upload Image</p>
                        <input type="file" name="" id="" onChange={handleimg} className="w-[190%] mx-[5%] lg:mx-[0px] lg:w-[100%]" />
                        
                      </div>
                      <div className="lg:block hidden w-[190%] mx-[5%] lg:mx-[0px] lg:w-[100%] ">
                        <button
                          className="add-award-submit-button lg:mr-2 mr-1"
                          onClick={handleBack}
                        >
                          BACK
                        </button>
                        <button
                          className="add-award-submit-button"
                          onClick={handlesubmit}
                        >
                          SUBMIT
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="add-award-form lg:ms-3">
                      <div className="mb-4">
                        <p className="mb-3">Achievement Title</p>
                        <input
                          type="text"
                          onInput={(e) => {
                            let value = e.target.value.replace(
                              /[^0-9 a-z A-Z @._]/g,
                              ""
                            ); // Remove non-numeric characters
                            // Check if the first digit is zero
                            if (value.length > 0 && value[0] === " ") {
                              // If the first digit is zero, remove it
                              value = value.slice(1);
                            }
                            // Set the updated value
                            e.target.value = value;
                          }}
                          name=""
                          id=""
                          value={achievementName}
                          onChange={handleachievement}
                          className="w-[190%] mx-[5%] lg:mx-[0px] lg:w-[100%]"
                        />
                      </div>
                      <div className="mb-4">
                        <p className="mb-3">Place You Won Achievement</p>
                        <input
                          type="text"
                          onInput={(e) => {
                            let value = e.target.value.replace(
                              /[^ a-z A-Z]/g,
                              ""
                            ); // Remove non-numeric characters
                            // Check if the first digit is zero
                            if (value.length > 0 && value[0] === " ") {
                              // If the first digit is zero, remove it
                              value = value.slice(1);
                            }
                            // Set the updated value
                            e.target.value = value;
                          }}
                          name=""
                          id=""
                          value={achievementPlace}
                          onChange={handleplace}
                          className="w-[190%] mx-[5%] lg:mx-[0px] lg:w-[100%]"
                        />
                      </div>
                      <div className="mb-4">
                        <p className="mb-3">Year You Won Achievement</p>
                        <input
                          type="text"
                          onInput={(e) =>
                            (e.target.value = e.target.value.replace(
                              /[^0-9]/g,
                              ""
                            ))
                          }
                          maxLength={4}
                          name=""
                          id=""
                          value={achievementYear}
                          onChange={handleyear}
                          className="w-[190%] mx-[5%] lg:mx-[0px] lg:w-[100%]"
                        />
                      </div>
                      <div className="block lg:hidden w-[190%] mx-[5%] lg:mx-[0px] lg:w-[100%] ">
                        <button
                          className="add-award-submit-button lg:mr-2 mr-1"
                          onClick={handleBack}
                        >
                          BACK
                        </button>
                        <button
                          className="add-award-submit-button"
                          onClick={handlesubmit}
                        >
                          SUBMIT
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : addCerti ? (
          // add  certification
          <>
            <div className="">
              <div className="d-flex justify-content-between">
                <h2 className="mb-5" style={{ fontWeight: "600" }}>
                  Add certificate
                </h2>
              </div>
              <div>
                <div className="row flex-col lg:flex-row">
                  <div className="col-6">
                    <div className="add-award-form">
                      <div className="mb-4">
                        <p className="mb-3">Description</p>
                        <textarea
                          onInput={(e) => {
                            let value = e.target.value.replace(
                              /[^0-9 a-z A-Z @._]/g,
                              ""
                            ); // Remove non-numeric characters
                            // Check if the first digit is zero
                            if (value.length > 0 && value[0] === " ") {
                              // If the first digit is zero, remove it
                              value = value.slice(1);
                            }
                            // Set the updated value
                            e.target.value = value;
                          }}
                          name=""
                          id=""
                          cols="30"
                          rows="5"
                          value={decscprt}
                          onChange={handlecirtificatediscription}
                          className="w-[190%] mx-[5%] lg:mx-[0px] lg:w-[100%]"
                        ></textarea>
                      </div>
                      <div className="mb-4">
                        <p className="mb-3">Competition Name</p>
                        <input
                          type="text"
                          onInput={(e) => {
                            let value = e.target.value.replace(
                              /[^0-9 a-z A-Z @._]/g,
                              ""
                            ); // Remove non-numeric characters
                            // Check if the first digit is zero
                            if (value.length > 0 && value[0] === " ") {
                              // If the first digit is zero, remove it
                              value = value.slice(1);
                            }
                            // Set the updated value
                            e.target.value = value;
                          }}
                          name=""
                          id=""
                          value={cname}
                          onChange={handlecompetitionName}
                          className="w-[190%] mx-[5%] lg:mx-[0px] lg:w-[100%]"
                        />
                      </div>
                      <div className="mb-4">
                        <p className="mb-3">Upload Image</p>
                        <input
                          type="file"
                          name=""
                          id=""
                          onChange={handlcirtificateimg}
                          className="w-[190%] mx-[5%] lg:mx-[0px] lg:w-[100%]"
                        />
                      </div>
                      <div className="lg:block hidden w-[190%] mx-[5%] lg:mx-[0px] lg:w-[100%]">
                        <button
                          className="add-award-submit-button lg:mr-2 mr-1"
                          onClick={handleBack}
                        >
                          BACK
                        </button>
                        <button
                          className="add-award-submit-button"
                          onClick={handlecirtificatesubmit}
                        >
                          SUBMIT
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="add-award-form lg:ms-3">
                      <div className="mb-4">
                        <p className="mb-3">Certificate Title</p>
                        <input
                          type="text"
                          onInput={(e) => {
                            let value = e.target.value.replace(
                              /[^0-9 a-z A-Z @._]/g,
                              ""
                            ); // Remove non-numeric characters
                            // Check if the first digit is zero
                            if (value.length > 0 && value[0] === " ") {
                              // If the first digit is zero, remove it
                              value = value.slice(1);
                            }
                            // Set the updated value
                            e.target.value = value;
                          }}
                          name=""
                          id=""
                          value={certificateName}
                          onChange={handlecertificateName}
                          className="w-[190%] mx-[5%] lg:mx-[0px] lg:w-[100%]"
                        />
                      </div>
                      <div className="mb-4">
                        <p className="mb-3">Place You Won Certificate</p>
                        <input
                          type="text"
                          onInput={(e) => {
                            let value = e.target.value.replace(
                              /[^0-9 a-z A-Z @._]/g,
                              ""
                            ); // Remove non-numeric characters
                            // Check if the first digit is zero
                            if (value.length > 0 && value[0] === " ") {
                              // If the first digit is zero, remove it
                              value = value.slice(1);
                            }
                            // Set the updated value
                            e.target.value = value;
                          }}
                          name=""
                          id=""
                          value={certificatePlace}
                          onChange={handlecertificatePlace}
                          className="w-[190%] mx-[5%] lg:mx-[0px] lg:w-[100%]"
                        />
                      </div>
                      <div className="mb-4">
                        <p className="mb-3">Year You Won Certificate</p>
                        <input
                          type="text"
                          onInput={(e) =>
                            (e.target.value = e.target.value.replace(
                              /[^0-9 ]/g,
                              ""
                            ))
                          }
                          maxLength={4}
                          name=""
                          id=""
                          value={certificateYear}
                          onChange={handlecertificateYear}
                          className="w-[190%] mx-[5%] lg:mx-[0px] lg:w-[100%]"
                        />
                      </div>
                      <div className="block lg:hidden w-[190%] mx-[5%] lg:mx-[0px] lg:w-[100%]">
                        <button
                          className="add-award-submit-button lg:mr-2 mr-1"
                          onClick={handleBack}
                        >
                          BACK
                        </button>
                        <button
                          className="add-award-submit-button"
                          onClick={handlecirtificatesubmit}
                        >
                          SUBMIT
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : certiList ? (
          <div>
            <div className="d-flex justify-content-between">
              <h2 className="mb-5" style={{ fontWeight: "600" }}>
                Certificate List
              </h2>
              <button className="back-buttone-style" onClick={handleBack}>
                BACK
              </button>
            </div>
            <div>
              <div className="achievement-list ">
                <div className="">
                  <div>
                    <p>Certificate Name</p>
                  </div>
                </div>
                <div className="">
                  <div>
                    <p>Place You Won Certificate</p>
                  </div>
                </div>
                <div className="">
                  <div>
                    <p>Competition Name</p>
                  </div>
                </div>
                <div className="">
                  <div>
                    <p>Year You Won Certificate</p>
                  </div>
                </div>
                <div className="">
                  <div>
                    <p>Upload Image</p>
                  </div>
                </div>
              </div>
              {/* award display */}
              {certi &&
                certi.map((e) => {
                  return (
                    <>
                      <div className="achievement-list achievement-list-content">
                        <div className="">
                          <div>
                            <h5>{e.certificateName}</h5>
                          </div>
                        </div>
                        <div className="">
                          <div>
                            <h5>{e.certificatePlace}</h5>
                          </div>
                        </div>
                        <div className="">
                          <div>
                            <h5>{e.competitionName}</h5>
                          </div>
                        </div>
                        <div className="">
                          <div>
                            <h5>{e.certificateYear}</h5>
                          </div>
                        </div>
                        <div className="">
                          <div className="d-flex align-items-center achivement-list-anchors">
                            <a className="mb-0 me-5">VIEW IMAGE</a>
                            <a href="" onClick={() => cirtificateedit(e._id)}>
                              EDIT
                            </a>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
            </div>
          </div>
        ) : (
          <div className="startup-awards-container">
            <div>
              <div className="startup-awards-header lg:mr-[42px] text-end">
                <div>
                  <h6 className="mb-0">Awards</h6>
                </div>
                <div className="">
                 {!investorToken? <button className="backk text-white px-4 py-2 rounded-lg" onClick={handleAddAward}>+ Add Awards</button>:<></>}
                  <button className="lg:ms-4 lg:mt-0 mt-1 backk text-white px-4 py-2 rounded-lg" onClick={handleSeeListClick}>
                    Achievement List
                  </button>
                </div>
              </div>
              <div className="mt-4">
                <div className="d-flex justify-content-center">
                  <div className="startup-award-list w-100">
                    {data &&
                      data.slice(0, visibleAwardCount).map((e) => (
                        <div key={e._id} className="mb-3">
                          <div className="overflow-content-hide">
                            <div className="awards-relative">
                              <img src="/awards.png" alt="" className="w-100" />

                              {!investorToken?<div className="award-absolute">
                                <div className="edit-delete-hover-icon">
                                  <div className="edit-icon-1 me-3">
                                    <img
                                      src="/edit.png"
                                      alt=""
                                      onClick={() => handleawardedit(e._id)}
                                      style={{ cursor: "pointer" }}
                                    />
                                  </div>
                                  <div className="delete-icon-1">
                                    <img
                                      src="/delete.png"
                                      alt=""
                                      onClick={() => handleawarddelete(e._id)}
                                    />
                                  </div>
                                </div>
                              </div>:<></>}
                            </div>
                            <h6 className="mt-2 ms-1">{e.achievementName}</h6>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                {/* Toggle button for See More / See Less */}
                {data.length > 6 && (
                  <div className="startup-awards-buttons text-center mt-3">
                    <button className="btn btn-primary" onClick={toggleAwards}>
                      {isExpanded ? "See Less" : "See More"}
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-5 pt-4">
              <div className="startup-awards-header lg:mr-[42px] text-end">
                <div>
                  <h6 className="mb-0">Certificate</h6>
                </div>
                <div className="">
                  {!investorToken?<button className="backk text-white px-4 py-2 rounded-lg" onClick={() => handleCertificate("certi")}>
                    + Add Certificate
                  </button>:<></>}
                  <button className="lg:ms-4 lg:mt-0 mt-1 backk text-white px-4 py-2 rounded-lg" onClick={handleCertiList}>
                    Certificate List
                  </button>
                </div>
              </div>

              {/* whyso */}
              <div className="mt-4">
                <div className="d-flex justify-content-center">
                  <div className="startup-award-list w-100">
                    {certi &&
                      certi.slice(0, visibleCertificateCount).map((e) => (
                        <div key={e._id} className="mb-3">
                          <div className="overflow-content-hide">
                            <div className="awards-relative">
                              <img src="/awards.png" alt="" className="w-100" />

                             {!investorToken? <div className="award-absolute">
                                <div className="edit-delete-hover-icon">
                                  <div className="edit-icon-1 me-3">
                                    <img
                                      src="/edit.png"
                                      alt=""
                                      onClick={() => cirtificateedit(e._id)}
                                      style={{ cursor: "pointer" }}
                                    />
                                  </div>
                                  <div className="delete-icon-1">
                                    <img
                                      src="/delete.svg"
                                      alt=""
                                      onClick={() => cirtificatedelet(e._id)}
                                    />
                                  </div>
                                </div>
                              </div>:<></>}
                            </div>
                            <h6 className="mt-2 ms-1">{e.certificateName}</h6>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                {/* Toggle button for See More / See Less */}
                {certi.length > 6 && (
                  <div className="startup-awards-buttons text-center mt-3">
                    <button
                      className="btn btn-primary"
                      onClick={toggleCertificates}
                    >
                      {isExpandedd ? "See Less" : "See More"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </section>
      {/* AWARDELETE  */}
      {showConfirmation && (
        <div className="confirmation-modal">
          <div className="confirmation-content">
            <h1 className="confirmation-message">
              Are you sure you want to delete this Award?
            </h1>
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
      {/* CIRTIFICATE DELETE  */}
      {showConfirmatio && (
        <div className="confirmation-modal">
          <div className="confirmation-content">
            <h3 className="confirmation-message">
              Are you sure you want to delete this Certificate?
            </h3>
            <div className="buttons-container">
              <button className="btng" onClick={handleConfirmDelet}>
                Yes
              </button>
              <button className="btnr" onClick={handleCancelDelet}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Startup_awards;
