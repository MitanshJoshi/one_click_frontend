import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import SecondNavbar from "../Navbar/Navbar";
import { BASE_URL } from "../../BASE_URL";

const ChangePasswordPage = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [shownewPassword, setShownewPassword] = useState(false);

  const navigate = useNavigate();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Handling submit...");

    if (!oldPassword) {
      toast.error("Old Password Must Is Required", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      return;
    }
    if (!newPassword) {
      toast.error("New Password Must Is Required", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      return;
    }
    if (!confirmNewPassword) {
      toast.error("Confirm New Password Must Is Required", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      return;
    }
    if (newPassword !== confirmNewPassword) {
      toast.error("Password and Confirm Password do not match.", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000,
      });
      return;
    }
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${BASE_URL}/api/user/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "Access-Control-Allow-Origin": "*",
          Authorization: token,
        },
        body: JSON.stringify({
          oldpassword: oldPassword,
          newpassword: newPassword,
        }),
      });

      if (!response.ok) {
        throw new Error("changepassword is failed");
      }
      toast.success("ChangePassword Successful!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      setTimeout(() => {
      navigate("/login")
      }, 1000);
      const responseData = await response.json();
      localStorage.setItem("token", responseData.data.token);
      console.log(responseData);
    } catch (error) {
      if (error) {
        toast.error("Old Password went wrong!", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 1000,
        });
      }
    }
  };
  const handlenavigate=()=>{
    navigate("/investorchange")
  }
  return (
    <>
      <SecondNavbar />
      <div  className="profile col-12 md-col-6 sm-col-6" style={{width:"1175px"}}>
            <div>
              <img
                className="background-image img-fluid "
                style={{ width: "100%" }}
                src="/Frame.png"
                alt="Background"
              />
            </div>
            <div className="d-flex justify-content-between align-items-center profile-image">
              <div className="d-flex align-items-end ms-sm-5 ms-2">
                <div className="my-profile-relative ps-5">
                  <img
                    src="BioDisplayUser.png"
                    alt="User Display"
                    style={{
                      height: "150px",
                      width: "150px",
                      borderRadius: "50%",
                    }}
                  />
                </div>
                <div
                  className="profileDiv mt-5"
                  style={{ marginLeft: "20px" }}
                >
                  <h4 className="h4 ">Profile</h4>
                  <p className="lead ">webearl</p>
                </div>
              </div>
            </div>
            
          </div>
      <Container className="d-flex justify-content-center align-items-center vh-100">

        <ToastContainer />
        
        <div className="container form-start" style={{width:"986px"}}>
          <div className="login">
            <div className="login-wrapper">
              <div className="row w-75 h-100 gx-0 ">
                <div className="col-6 h-100 login">
                  <div className="login-form h-100">
                    <div className="mb-3">
                      <div className="text-center FormHead pt-5">
                        <h1 className="">Change Password</h1>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor
                        </p>
                      </div>
                    </div>
                    <div>
                      <form className="row g-3">
                        <div className="col-12 ">
                          <input
                            type="tel"
                            className="form-control"
                            id="oldpassword"
                            placeholder="Old Password"
                            onChange={(e)=>setOldPassword(e.target.value)}
                            onInput={(e) => {
                              let value = e.target.value.replace(
                                /[^0-9 a-z @_. ]/g,
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
                            required
                          />
                        </div>
                        <div className="col-12">
                          <div className="input-group">
                            <input
                              type={showPassword ? "text" : "password"}
                              className="form-control"
                              id="inputPassword"
                              placeholder=" New Password"
                              onChange={(e) => setNewPassword(e.target.value.trim())}
                              required
                            />
                            <button
                              className="btn btn-outline-secondary"
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              <FontAwesomeIcon
                                icon={showPassword ? faEye : faEyeSlash}
                              />
                            </button>
                          </div>
                        </div>

                        <div className="col-12">
                          <div className="input-group">
                            <input
                              type={shownewPassword ? "text" : "password"}
                              className="form-control"
                              id="inputPassword"
                              placeholder="Confirm New Password"
                              // value={password.trim()}
                              onChange={(e) => setConfirmNewPassword(e.target.value.trim())}
                              required
                            />
                            <button
                              className="btn btn-outline-secondary"
                              type="button"
                              onClick={() => setShownewPassword(!shownewPassword)}
                            >
                              <FontAwesomeIcon
                                icon={shownewPassword ? faEye : faEyeSlash}
                              />
                            </button>
                          </div>
                        </div>

                        <div className="col-12 d-flex justify-content-center align-items-center">
                          <button
                            type="button"
                            className="btnLogin mt-2"
                            style={{ borderRadius: "80px" }}
                            onClick={handleSubmit}
                          >
                            Change Password
                          </button>
                        </div>
                        {/* <div>
                          <button className="text-[13px] text-[#47d758] underline" onClick={handlenavigate}>
                            Change Password For Investor
                          </button>
                        </div> */}
                      </form>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="login-image-section h-100">
                    <img
                      src="./login-background.jpg"
                      className="login-background-image"
                    />
                    <div className="image-content">
                      <div className="login-image-content">
                        <div>
                          <img src="./login-side.png" />
                        </div>
                        <div>
                          <h4>
                            “A wide range of capabilities for a more interesting
                            user experience, including verticals and 23
                            transaction-oriented search options.”
                          </h4>
                          <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0px' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="91" height="10" viewBox="0 0 91 25" fill="none">
                        <circle opacity="0.5" cx="9.87597" cy="12.0496" r="9.87597" fill="#00818A" />
                        <circle cx="45.5002" cy="12.4023" r="12.345" fill="#00818A" />
                        <circle opacity="0.5" cx="81.124" cy="12.0496" r="9.87597" fill="#00818A" />
                    </svg>
                </div>
                        </div>
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ChangePasswordPage;
