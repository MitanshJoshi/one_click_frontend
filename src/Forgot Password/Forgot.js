import React, { useRef, useState } from "react";
import "./Forgot.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { BASE_URL } from "../BASE_URL";

const Forgot = () => {
  const [showNewContent, setShowNewContent] = useState(false); // State variable to track whether new content should be shown
  const [showInitialContent, setShowInitialContent] = useState(true); // State variable to track whether initial content should be shown // State variable to track whether new content should be shown
  const [show, setshow] = useState(false);
  const [success, setsuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [shownewPassword, setShownewPassword] = useState(false);
  const[email,setemail]=useState("");
  const[new_password,setPassword]=useState("")
  const[newpassword,setnewPassword]=useState("")

//   navigate 
const navigate =useNavigate()
const handleLogin=()=>{
    navigate("/login")
}
const validateEmail = (email) => {
    // Regular expression for email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  const handleContinueClick = async() => {
    if (!email) {
        toast.error('Email is required', {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 1000,
        });
        return
      } if (!validateEmail(email)) {
        toast.error('Please enter a valid email address', {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 1000,
        });
        return;  
      } 
      if(email){
        toast.success("OTP has been sent to your email", {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 1000,
        });
        setShowInitialContent(false); // Hide initial content
        setShowNewContent(true); // Show new content
      }
     
  };
  const handleVerifyClick = () => {
    // Check if any OTP field is empty
    if (otp.every(value => value === "")) {
        toast.error("OTP is required", {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 1000,
        });
        return;
    }

    // Convert OTP array to string for comparison
    const enteredOtp = otp.join("");
    
    // Validate entered OTP
    const expectedOtp = "123456"; // Change this to the expected OTP
    if (enteredOtp === expectedOtp) {
        toast.success("OTP verified successfully", {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 1000,
        });
        setshow(true);
        setShowNewContent(false); // Hide new content
    } else {
        toast.error("Invalid OTP", {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 1000,
        });
    }
};

  const handlesuccess=async()=>{
    if(!new_password){
        toast.error("Password must be required", {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 1000,
        });
        return
    }
    if(new_password.length < 8){
        toast.error("Password must be at least 8 characters long", {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 1000,
        });
        return
    }
    if (!newpassword) {
        toast.error("Confirm New Password Must Is Required", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 1000,
        });
        return;
      }
      if (new_password !== newpassword) {
        toast.error("Password and Confirm Password do not match.", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 3000,
        });
        return;
      }
    if(new_password){
        toast.success( "Password verified successfully", {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 1000,
        }); 
        setsuccess(true)
        setshow(false)
    }
    try {
      const response = await fetch(`${BASE_URL}/api/user/forget-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email,new_password}),
      });

      if (!response.ok) {
        throw new Error("Forgot Password failed");
      }
      // toast.success("Forgot Password Successful!", {
      //   position: toast.POSITION.BOTTOM_RIGHT,
      //   autoClose: 1000,
      // });
    //   setTimeout(() => {
    //     navigate("/");
    // }, 2000);
      const responseData = await response.json();
      // localStorage.setItem("token", responseData.data.token);
      // console.log(responseData);
    } catch (error) {
      if (error) {
        toast.error("Forgot Password Successful!", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 1000,
        });
      }
    }
  
  }
  //   otp code
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // State variable to store OTP digits
  const otpInputs = useRef([]); // Ref for OTP input fields

  // Function to handle changes in OTP input fields
  const handleOtpChange = (index, value) => {
    // Update the OTP state array with the new value at the specified index
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to the next input field if there is a value
    if (value && index < otp.length - 1) {
      otpInputs.current[index + 1].focus();
    }

   
  };
  return (
    
    <div className="container form-start">
        <ToastContainer/>
      {showInitialContent && (
        <div className="login">
          <div className="login-wrapper">
            <div className="row w-75 h-100 gx-0 ">
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
                          onChange={(e) => setemail(e.target.value.trim())}
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* next page  */}
      {showNewContent && (
        <div className="login">
          <div className="login-wrapper">
            <div className="row w-75 h-100 gx-0 ">
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
                      <div className="col-12 d-flex justify-content-center align-items-center">
                        <button
                          type="button"
                          className="btnLogin mt-2"
                          onClick={handleVerifyClick}
                        >
                          Verify
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {show && (
        <div className="login">
          <div className="login-wrapper">
            <div className="row w-75 h-100 gx-0 ">
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
                               value={new_password.trim()}
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
                              onChange={(e) => setnewPassword(e.target.value.trim())}
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
      {success && (
        <div className="login">
        <div className="login-wrapper">
          <div className="row w-75 h-100 gx-0 ">
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
                   <img src="/success.png" alt="" className="relative" />
                   <img src="/Vector.png" alt="" className="absolute" />
                  </div>
                </div>
                <div>
                  <form className="row g-3">
                  <div className="col-12 d-flex justify-content-center align-items-center">
                      <h4>Successfully</h4>
                    </div>
                    <div className="col-12 d-flex justify-content-center align-items-center">
                      <button
                        type="button"
                        className="btnLogin mt-1"
                        style={{borderRadius:"80px"}}
                        onClick={handleLogin}
                      >
                        Continue
                      </button>
                    </div>
                    <div className="col-12 d-flex justify-content-center align-items-center">
                        <p style={{fontSize:"15px"}}>Your password has been forgot successfully.</p>
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

export default Forgot;
