import React, { useRef, useState } from "react";
import "./Forgot.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { BASE_URL } from "../BASE_URL";

const InvestorForgot = () => {
  const [showNewContent, setShowNewContent] = useState(false);
  const [showInitialContent, setShowInitialContent] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [shownewPassword, setShownewPassword] = useState(false);
  const [emailid, setEmail] = useState("");
  const [InvestorEmail, setInvEmail] = useState("");
  const [newPassword, setPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const navigate = useNavigate();

  const handleContinueClick = async () => {
    if (!emailid) {
      toast.error("Email is required", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      return;
    }
    if (!validateEmail(emailid)) {
      toast.error("Please enter a valid email address", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/Otp/sendOtp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emailid }),
      });

      if (!response.ok) {
        throw new Error("Sending OTP failed");
      }

      toast.success("OTP has been sent to your email", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });

      setShowInitialContent(false);
      setShowNewContent(true);
    } catch (error) {
      toast.error("Failed to send OTP", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
    }
  };

  const handleVerifyClick = async () => {
    if (otp.every((value) => value === "")) {
        toast.error("OTP is required", {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 1000,
        });
        return;
    }

    const enteredOtp = Number(otp.join(""));
    const requestBody = JSON.stringify({ emailid, otp: enteredOtp });

    try {
        const response = await fetch(`${BASE_URL}/api/Otp/verifyOtp`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: requestBody,
        });

        const responseBody = await response.json();

        if (!response.ok) {
            throw new Error(responseBody.message || "Invalid OTP");
        }

        if (responseBody.message === "otp verified successfully") {
            toast.success("OTP verified successfully", {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 1000,
            });

            setShowNewContent(false);
            setShowPassword(true);
        } else {
            throw new Error("Invalid OTP");
        }
    } catch (error) {
        toast.error(error.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 1000,
        });
    }
};



  const handleResendOtp = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/Otp/resendOtp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emailid }),
      });

      if (!response.ok) {
        throw new Error("Resending OTP failed");
      }

      toast.success("OTP has been resent to your email", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
    } catch (error) {
      toast.error("Failed to resend OTP", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
    }
  };

  const handlesuccess = async () => {
    if (!newPassword) {
      toast.error("Password is required", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      return;
    }
    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      return;
    }
    if (!newpassword) {
      toast.error("Confirm New Password is required", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      return;
    }
    if (newPassword !== newpassword) {
      toast.error("Password and Confirm Password do not match", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/Investor/forgotPassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ InvestorEmail, newPassword }),
      });

      if (!response.ok) {
        throw new Error("Forgot Password failed");
      }

      toast.success("Password updated successfully", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });

      setTimeout(() => {
        navigate("/logininvestor");
      }, 2000);
    } catch (error) {
      toast.error("Failed to update password", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
    }
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      otpInputs.current[index + 1].focus();
    }
  };

  const otpInputs = useRef([]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShownewPassword(!shownewPassword);
  };

  return (
    <div className="container form-start">
    <ToastContainer/>
  {showInitialContent && (
    <div className="login">
      <div className="login-wrapper">
        <div className="row w-75 h-100 gx-0 ">
          <div className="col-6 h-[350px] login">
            <div className="login-form h-100">
              <div className="login-header">
                <div className="logo">
                  <img
                    src="./NavLogo.png"
                    alt="login logo"
                    className="LoginLogo"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="66"
                    height="8"
                    viewBox="0 0 66 8"
                    fill="none"
                  >
                    <path
                      d="M61.386 0.964814L0.884277 7.79433H61.7703C64.6844 7.79433 66.2676 4.38706 64.3885 2.15979C63.6502 1.28477 62.5237 0.836399 61.386 0.964814Z"
                      fill="#74CC7E"
                    />
                  </svg>
                </div>
              </div>
              <div className="mb-3">
                <div className="text-center FormHead pt-5">
                  <h1 className="">Forgot Password</h1>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor
                  </p>
                </div>
              </div>
              <div>
                <form className="row g-3">
                  <div className="col-12 ">
                    <input
                      type="tel"
                      className="form-control"
                      id="inputEmail"
                      placeholder="Email"
                      onChange={(e) => {
                        setEmail(e.target.value.trim());
                        setInvEmail(e.target.value.trim());
                      }}                          
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
                  <div className="col-12 d-flex justify-content-center align-items-center">
                    <button
                      type="button"
                      className="btnLogin mt-2"
                      style={{ borderRadius: "80px" }}
                      onClick={handleContinueClick}
                    >
                      Continue
                    </button>
                  </div>
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
                  </div>
                   <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0px' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="91" height="15" viewBox="0 0 91 25" fill="none">
                    <circle opacity="0.5" cx="9.87597" cy="12.0496" r="9.87597" fill="#59E659" />
                    <circle cx="45.5002" cy="12.4023" r="12.345" fill="#59E659" />
                    <circle opacity="0.5" cx="81.124" cy="12.0496" r="9.87597" fill="#59E659" />
                </svg>
            </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )}

{showNewContent && (
        <div className="login">
          <div className="login-wrapper">
            <div className="row w-75 h-100 gx-0 ">
              <div className="col-6 h-[435px] login">
                <div className="login-form h-100">
                  <div className="login-header">
                    <div className="logo">
                      <img
                        src="./NavLogo.png"
                        alt="login logo"
                        className="LoginLogo"
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="66"
                        height="8"
                        viewBox="0 0 66 8"
                        fill="none"
                      >
                        <path
                          d="M61.386 0.964814L0.884277 7.79433H61.7703C64.6844 7.79433 66.2676 4.38706 64.3885 2.15979C63.6502 1.28477 62.5237 0.836399 61.386 0.964814Z"
                          fill="#74CC7E"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="text-center FormHead pt-5">
                      <h1 className="">Forgot Password</h1>
                      <p>Enter your code that you received on your email.</p>
                    </div>
                  </div>
                  <div>
                    <form className="row g-3">
                      {otp.map((value, index) => (
                        <div className="col-2" key={index}>
                          <input
                            type="text"
                            className="form-control"
                            maxLength="1" // Set maximum length to 1 character
                            value={value}
                            onChange={(e) =>
                              handleOtpChange(index, e.target.value)
                            }
                            ref={(input) => (otpInputs.current[index] = input)} // Assign ref to input field
                            style={{ textAlign: "center" }} // Center-align text
                            required
                            
                          />
                        </div>
                      ))}
                      <div className="col-12 d-flex justify-content-center align-items-center mt-[45px]">
                        <button
                          type="button"
                          className="btnLogin mt-2 mr-[10px]"
                          onClick={handleVerifyClick}
                        >
                          Verify
                        </button>
                        <button onClick={handleResendOtp} className="text-[#74CC7E] underline">Resend otp</button>
                      </div>
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* {show && (
        <div className="login">
          <div className="login-wrapper">
            <div className="row w-75 h-100 gx-0">
              <div className="col-6 h-100 login">
                <div className="login-form h-100">
                  <div className="login-header">
                    <div className="logo">
                      <img
                        src="./NavLogo.png"
                        alt="login logo"
                        className="LoginLogo"
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="66"
                        height="8"
                        viewBox="0 0 66 8"
                        fill="none"
                      >
                        <path
                          d="M61.386 0.964814L0.884277 7.79433H61.7703C64.6844 7.79433 66.2676 4.38706 64.3885 2.15979C63.6502 1.28477 62.5237 0.836399 61.386 0.964814Z"
                          fill="#74CC7E"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="text-center FormHead pt-5">
                      <h1 className="">Create New Password</h1>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor
                      </p>
                    </div>
                  </div>
                  <div>
                    <form className="row g-3">
                      <div className="col-12">
                        <input
                          type={showPassword ? "text" : "password"}
                          className="form-control"
                          id="inputPassword"
                          placeholder="New Password"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <i
                          onClick={togglePasswordVisibility}
                          className="eye-field"
                        >
                          {showPassword ? (
                            <FontAwesomeIcon icon={faEye} />
                          ) : (
                            <FontAwesomeIcon icon={faEyeSlash} />
                          )}
                        </i>
                      </div>
                      <div className="col-12">
                        <input
                          type={shownewPassword ? "text" : "password"}
                          className="form-control"
                          id="inputPassword"
                          placeholder="Confirm New Password"
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <i
                          onClick={toggleNewPasswordVisibility}
                          className="eye-field"
                        >
                          {shownewPassword ? (
                            <FontAwesomeIcon icon={faEye} />
                          ) : (
                            <FontAwesomeIcon icon={faEyeSlash} />
                          )}
                        </i>
                      </div>
                      <div className="col-12 d-flex justify-content-center align-items-center">
                        <button
                          type="button"
                          className="btn btn-primary btn-block mb-1"
                          onClick={handlesuccess}
                        >
                          Save Changes
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div> */}
    {showPassword && (
        <div className="login">
          <div className="login-wrapper">
            <div className="row w-75 h-100 gx-0 ">
              <div className="col-6 h-[435px] login">
                <div className="login-form h-100">
                  <div className="login-header">
                    <div className="logo">
                      <img
                        src="./NavLogo.png"
                        alt="login logo"
                        className="LoginLogo"
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="66"
                        height="8"
                        viewBox="0 0 66 8"
                        fill="none"
                      >
                        <path
                          d="M61.386 0.964814L0.884277 7.79433H61.7703C64.6844 7.79433 66.2676 4.38706 64.3885 2.15979C63.6502 1.28477 62.5237 0.836399 61.386 0.964814Z"
                          fill="#74CC7E"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="text-center FormHead pt-5">
                      <h1 className="">Forgot Password</h1>
                      <p>
                        set the new password for your account so you can login
                        and access
                      </p>
                    </div>
                  </div>
                  <div>
                    <form className="row g-3">
                      
                      <div className="col-12">
                        <div className="input-group">
                          <input
                               type={showPassword ? "text" : "password"}
                            className="form-control"
                            id="New Password"
                            placeholder=" New Password"
                               value={newPassword.trim()}
                               onChange={(e) => setPassword(e.target.value.trim())}
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
                              value={newpassword.trim()}
                              onChange={(e) => setNewPassword(e.target.value.trim())}
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
                          style={{borderRadius:"80px"}}
                           onClick={handlesuccess}
                        >
                          Update Password
                        </button>
                      </div>
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
                          "Services offered all over India <br /> across 250+
                          cities"
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
  );
};

export default InvestorForgot;
