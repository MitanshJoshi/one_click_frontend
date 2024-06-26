import React, { useEffect } from "react";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import SecondNavbar from "../Navbar/Navbar";
import StartUpProfile from "../StartUpProfile/StartUpProfile";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../BASE_URL";

const Certificateedit = () => {
  const { state } = useLocation();
  const [wishList, setWishList] = useState(false);
  const _id = state && state.id;
  // console.log(_id)
  const startupId = state && state._id;
  console.log(startupId);
  // console.log(_id)
  const [matchedStartup,setmatchedStartup]=useState("")
  // console.log(matchedStartup);
  
  useEffect(() => {
    if(matchedStartup){
      setcertificateName(matchedStartup.certificateName)
      setcertificateYear(matchedStartup.certificateYear)
      setcertificatePlace(matchedStartup.certificatePlace)
      setdecscprt(matchedStartup.description)
      setcname(matchedStartup.competitionName)
      
    }
   }, [matchedStartup])


   const displayWishList = () => {
    setWishList(true); // Set addStartup to false when back button is clicked
};


  const fetchData = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/startup/displaydetail?startupId=${startupId}`,
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
      console.log(responseData)
      const matchedStartup = responseData?.data?.[0]?.certificate.find((item) => item._id === _id);
      setmatchedStartup(matchedStartup);
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
  };
  const handlecertificateName = (e) => {
    setcertificateName(e.target.value);
  };
  const handlecertificateYear = (e) => {
    setcertificateYear(e.target.value);
  };
  const handlecertificatePlace = (e) => {
    setcertificatePlace(e.target.value);
  };

  const navigate = useNavigate(); // Correct usage of useNavigate

  const handleBackButtonClick = () => {
    localStorage.setItem("myData", "award");
    navigate(-1); // Navigate back to the previous page
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
    formData.append("startupId", startupId);
    try {
      const response = await fetch(
        `${BASE_URL}/api/certificate/edit?certificate_id=${_id}`,
        {
          method: "POST",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
          body: formData,
        }
      );
      if (!response.ok) {
        throw new Error("Request failed");
      }
      toast.success("Certificate Edit  successful!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      setTimeout(() => {
        localStorage.setItem("myData", "award");
        navigate(-1);// Correct usage of navigate function
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

  return (
    <>
    <SecondNavbar/>
    <StartUpProfile onBackButtonClick={displayWishList} />
      <div>
        <ToastContainer />
        <div className="d-flex justify-content-between pt-[30px] ml-[200px] text-[30px]">
          <h2 className="mb-5" style={{ fontWeight: "600" }}>
            Edit Certificate
          </h2>
        </div>
        <div className="mx-[170px]">
          <div className="row">
            <div className="col-6">
              <div className="add-award-form">
                <div className="mb-4">
                  <p className="mb-3">Description</p>
                  <textarea
                    name=""
                    onInput={(e) => {
                      let value = e.target.value.replace(/[^ a-z A-Z]/g, ""); // Remove non-numeric characters
                      // Check if the first digit is zero
                      if (value.length > 0 && value[0] === " ") {
                        // If the first digit is zero, remove it
                        value = value.slice(1);
                      }
                      // Set the updated value
                      e.target.value = value;
                    }}
                    id=""
                    cols="30"
                    rows="5"
                    value={decscprt}
                    onChange={handlecirtificatediscription}
                  ></textarea>
                </div>
                <div className="mb-4">
                  <p className="mb-3">Competition Name</p>
                  <input
                    type="text"
                    onInput={(e) => {
                      let value = e.target.value.replace(/[^ a-z A-Z]/g, ""); // Remove non-numeric characters
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
                  />
                </div>
                <div className="mb-4">
                  <p className="mb-3">Upload Image</p>
                  <input
                    type="file"
                    name=""
                    id=""
                    onChange={handlcirtificateimg}
                  />
                </div>
                <div className="d-flex justify-content-between mt-5 mb-5">
                  <button className="add-award-submit-button" onClick={handleBackButtonClick}>BACK</button>
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
              <div className="add-award-form ms-3">
                <div className="mb-4">
                  <p className="mb-3">Certificate Title</p>
                  <input
                    type="text"
                    name=""
                    id=""
                    value={certificateName}
                    onInput={(e) => {
                      let value = e.target.value.replace(/[^ a-z A-Z]/g, ""); // Remove non-numeric characters
                      // Check if the first digit is zero
                      if (value.length > 0 && value[0] === " ") {
                        // If the first digit is zero, remove it
                        value = value.slice(1);
                      }
                      // Set the updated value
                      e.target.value = value;
                    }}
                    onChange={handlecertificateName}
                  />
                </div>
                <div className="mb-4">
                  <p className="mb-3">Place You Won Certificate</p>
                  <input
                    type="text"
                    name=""
                    id=""
                    value={certificatePlace}
                    onInput={(e) => {
                      let value = e.target.value.replace(/[^ a-z A-Z]/g, ""); // Remove non-numeric characters
                      // Check if the first digit is zero
                      if (value.length > 0 && value[0] === " ") {
                        // If the first digit is zero, remove it
                        value = value.slice(1);
                      }
                      // Set the updated value
                      e.target.value = value;
                    }}
                    onChange={handlecertificatePlace}
                  />
                </div>
                <div className="mb-4">
                  <p className="mb-3">Year You Won Certificate</p>
                  <input
                    type="text"
                    name=""
                    id=""
                    value={certificateYear}
                    onInput={(e) => (e.target.value) = e.target.value.replace(/[^0-9]/g, '')}
                    maxLength={4}
                    onChange={handlecertificateYear}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Certificateedit;
