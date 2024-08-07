import React, { useEffect } from "react";
// import "./startup-awards.css";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StartUpProfile from "../StartUpProfile/StartUpProfile";
import {  useLocation, useNavigate,  } from "react-router-dom";
import { BASE_URL } from "../../BASE_URL";
import SecondNavbar from "../Navbar/Navbar";

const Awardedit = () => {

  const Navigate = useNavigate();
  const [description, setdescription] = useState();
  const [achievementName, setachievementName] = useState();
  const [competitionName, setcompetitionName] = useState();
  const [file, setimage] = useState();
  const [achievementPlace, setachievementPlace] = useState();
  const [wishList, setWishList] = useState(false);
  const [achievementYear, setachievementYear] = useState(); 
  const [matchedStartup, setmatchedStartup] = useState("");
  const [investorToken, setinvestorToken] = useState(localStorage.getItem("investorToken"))
  console.log(matchedStartup); 
  // const [data, setdata] = useState(); 
  // console.log(name)

//   const {_id}=useParams()

useEffect(() => {
 if(matchedStartup){
  setdescription(matchedStartup.description)
  setcompetitionName(matchedStartup.competitionName)
  setachievementName(matchedStartup.achievementName)
  setachievementPlace(matchedStartup.achievementPlace)
  setachievementYear(matchedStartup.achievementYear )
 }
}, [matchedStartup])


const { state } = useLocation();
  const _id = state && state.id;
  console.log(_id)
  const startupId = state && state._id;
  console.log(startupId);

//   const startUpId=state&& state.startUpId
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
    formData.append("startupId" ,startupId);
    try {
      const response = await fetch(`${BASE_URL}/api/award/edit?award_id=${_id}`, {
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
      toast.success("Edit Award  successful!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      setTimeout(() => {
        localStorage.setItem("myData", "award");
        Navigate(-1);
      }, 2000);
    } catch (error) {
      if (error) {
        toast.error("Something went wrong!", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 1000,
        });
      }
    }
  };
//   const { _id } = useParams();
// //   const [data, setdata] = useState([]);
// //   const [certi, setCeti] = useState([]);
  const fetchData = async () => {
    // console.log(localStorage.getItem("tokenData"));
    const token=investorToken?localStorage.getItem("investorToken"):localStorage.getItem("token");
    console.log('token',token);
    
    try {
      const response = await fetch(
        `${BASE_URL}/api/startup/displaydetail?startupId=${startupId}`,
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
      console.log(responseData);
      const matchedStartup = responseData?.data?.[0]?.award.find((item) => item._id === _id);
      console.log(matchedStartup);
      if(matchedStartup){
        setmatchedStartup(matchedStartup);
      }
    } catch (error) {
      if (error) {
        toast.error("Something went wrong!", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 1000,
        });
      }
    }
  };
  const displayWishList = () => {
    setWishList(true); // Set addStartup to false when back button is clicked
};
  useEffect(() => {
    fetchData();
  }, []);

  return (
      <>
      <SecondNavbar/>
      <StartUpProfile onBackButtonClick={displayWishList} />
      <ToastContainer />
            <div>
              <div className="d-flex justify-content-between lg:ml-[200px] pt-[30px] text-[30px]">
                <h2 className="mb-5" style={{ fontWeight: "600" }}>
                  Edit Awards
                </h2>
              </div>
              <div className=" lg:mx-[170px]">
                <div className="row flex-col lg:flex-row">
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
                          value={description}
                          onChange={handlecompetition}
                          className="w-[190%] mx-[5%] lg:mx-[0px] lg:w-[100%]"
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
                          value={competitionName}
                          onChange={handlename}
                          className="w-[190%] mx-[5%] lg:mx-[0px] lg:w-[100%]"
                        />
                      </div>
                      <div className="mb-4">
                        <p className="mb-3">Upload Image</p>
                        <input type="file" name="" id="" onChange={handleimg} className="w-[190%] mx-[5%] lg:mx-[0px] lg:w-[100%]"/>
                      </div>
                      <div className="lg:block hidden w-[190%] mx-[5%] lg:mx-[0px] lg:w-[100%]">

                        <button
                          className="add-award-submit-button lg:mr-2 mr-1"
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
                          value={achievementPlace}
                          onChange={handleplace}
                          className="w-[190%] mx-[5%] lg:mx-[0px] lg:w-[100%]"
                        />
                      </div>
                      <div className="mb-4">
                        <p className="mb-3">Year You Won Achievement</p>
                        <input
                          type="text"
                          onInput={(e) => (e.target.value) = e.target.value.replace(/[^0-9]/g, '')}
                          maxLength={4}
                          name=""
                          id=""
                          value={achievementYear}
                          onChange={handleyear}
                          className="w-[190%] mx-[5%] lg:mx-[0px] lg:w-[100%]"
                        />
                      </div>
                      <div className="block lg:hidden w-[190%] mx-[5%] lg:mx-[0px] lg:w-[100%]">

                        <button
                          className="add-award-submit-button lg:mr-2 mr-1"
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
                  )
                }

export default Awardedit;
