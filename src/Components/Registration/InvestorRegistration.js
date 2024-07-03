import React, { useState } from "react";
import "./registration.css";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Countries from "../../CountryStateCity.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

const InvestorRegistrationPage = () => {
  const indiaObject = Countries.find((country) => country.name === "India");

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/logininvestor");
  };

  const [investorName, setInvestorName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [firmName, setFirmName] = useState("");
  const [contact, setContact] = useState("");
  const [file, setFile] = useState(null);

  const [selectedState, setSelectedState] = useState(null);

  const handleName = (e) => {
    setInvestorName(e.target.value);
  };
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  const handleEmail = (e) => {
    const value = e.target.value.trim();
    setEmail(value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleState = (e) => {
    const selectedStateName = e.target.value;
    const selectedState = indiaObject.states.find(
      (state) => state.name === selectedStateName
    );

    setSelectedState(selectedState);
    setState(selectedStateName);
    setCity(""); // Reset the city selection
  };

  const handleCity = (e) => {
    setCity(e.target.value);
  };

  const handleFirmName = (e) => {
    setFirmName(e.target.value);
  };

  const handleContact = (e) => {
    setContact(e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleRegistration = async () => {
    if (!investorName) {
      toast.error("Investor name must be required", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      return;
    }

    if (!email) {
      toast.error("Email is required", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
    } else if (!validateEmail(email)) {
      toast.error("Please enter a valid email address", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      return;
    }

    if (!password) {
      toast.error("Password must be required", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      return;
    }

    if (!confirmPassword) {
      toast.error("Confirm Password must be required", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Password and Confirm Password do not match.", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000,
      });
      return;
    }

    if (!selectedState) {
      toast.error("State must be required", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      return;
    }

    if (!city) {
      toast.error("City must be required!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      return;
    }

    if (!firmName) {
      toast.error("Firm name must be required", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      return;
    }

    if (!contact) {
      toast.error("Contact number must be required!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      return;
    }

    if (contact.length < 10) {
      toast.error("Please enter a valid 10-digit mobile number", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      return;
    }

    if (!file) {
      toast.error("Please select an image file", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      return;
    }

    const formData = new FormData();
    formData.append("InvestorName", investorName);
    formData.append("InvestorEmail", email);
    formData.append("Password", password);
    formData.append("InvestorState", state);
    formData.append("InvestorCity", city);
    formData.append("FirmName", firmName);
    formData.append("InvestorContactNum", contact);
    formData.append("InvestorCountry", "India");
    formData.append("file", file);
    // console.log('formdata:',formData);
    

    try {
      const response = await fetch(
        "https://oneclick-sfu6.onrender.com/api/Investor/registerInvestor",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      toast.success(
        "Registration successful! Now, login with your registered email and password",
        {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 1000,
        }
      );

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
        console.log('formdata',formData);
        
      console.error("Registration failed:", error.message);
      toast.error("Registration failed. Please try again later.", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
    }
  };

  const handleKeyDown = (e) => {
    if (
      [46, 8, 9, 27, 13].indexOf(e.keyCode) !== -1 ||
      (e.keyCode === 65 && e.ctrlKey === true) ||
      (e.keyCode === 67 && e.ctrlKey === true) ||
      (e.keyCode === 86 && e.ctrlKey === true) ||
      (e.keyCode >= 35 && e.keyCode <= 39)
    ) {
      return;
    }
    if (
      (e.shiftKey || e.keyCode < 48 || e.keyCode > 57) &&
      (e.keyCode < 96 || e.keyCode > 105)
    ) {
      e.preventDefault();
    }
  };

  return (
    // <div className="container form-start">
    //   <ToastContainer />
    //   <div className="registration">
    //     <div className="registration-wrapper">
    //       <div className="row w-75 h-100 gx-0 ">
    //         <div className="col-7 h-100 from">
    //           <div className="registration-form h-100">
    //             <div className="registration-header">
    //               <div className="logo">
    //                 <img
    //                   src="./NavLogo.png"
    //                   alt="registration logo"
    //                   className="registrationLogo"
    //                 />
    //                 <svg
    //                   xmlns="http://www.w3.org/2000/svg"
    //                   width="66"
    //                   height="8"
    //                   viewBox="0 0 66 8"
    //                   fill="none"
    //                 >
    //                   <path
    //                     d="M61.386 0.964814L0.884277 7.79433H61.7703C64.6844 7.79433 66.2676 4.38706 64.3885 2.15979C63.6502 1.28477 62.5237 0.836399 61.386 0.964814Z"
    //                     fill="#74CC7E"
    //                   />
    //                 </svg>
    //               </div>
    //               <div>
    //                 <div className=" SignUP-Btn" onClick={handleNavigate}>
    //                   Login
    //                 </div>
    //               </div>
    //             </div>

    //             <div className="mb-4">
    //               <div className="text-center FormHead registration-title pt-3">
    //                 <h1 className="">Create Account</h1>
    //                 <p>
    //                   Lorem ipsum dolor sit amet, consectetur adipiscing elit,
    //                   sed do eiusmod tempor
    //                 </p>
    //               </div>
    //             </div>
    //             <div>
    //               <form className="row d-flex flex-column registration-inputs">
    //                 <div className="col-12 ">
    //                   <input
    //                     type="text"
    //                     placeholder="Investor Name"
    //                     value={investorName}
    //                     onChange={handleName}
    //                   />
    //                 </div>

    //                 <div className="col-12">
    //                   <input
    //                     type="text"
    //                     placeholder="Email"
    //                     value={email}
    //                     onChange={handleEmail}
    //                   />
    //                 </div>

    //                 <div className="col-12">
    //                   <input
    //                     type="text"
    //                     placeholder="Firm Name"
    //                     value={firmName}
    //                     onChange={handleFirmName}
    //                   />
    //                 </div>

    //                 <div className="col-12">
    //                   <input
    //                     type="text"
    //                     placeholder="Contact Number"
    //                     value={contact}
    //                     onChange={handleContact}
    //                     onKeyDown={handleKeyDown}
    //                     maxLength={10}
    //                   />
    //                 </div>

    //                 <div className="col-12">
    //                   <select value={state} onChange={handleState}>
    //                     <option value="">Select State</option>
    //                     {indiaObject.states.map((state, index) => (
    //                       <option key={index} value={state.name}>
    //                         {state.name}
    //                       </option>
    //                     ))}
    //                   </select>
    //                 </div>

    //                 <div className="col-12">
    //                   <select value={city} onChange={handleCity}>
    //                     <option value="">Select City</option>
    //                     {selectedState?.cities.map((city, index) => (
    //                       <option key={index} value={city.name}>
    //                         {city.name}
    //                       </option>
    //                     ))}
    //                   </select>
    //                 </div>

    //                 <div className="col-12">
    //                   <div className="position-relative">
    //                     <input
    //                       type={showPassword ? "text" : "password"}
    //                       placeholder="Password"
    //                       value={password}
    //                       onChange={handlePassword}
    //                     />
    //                     <div
    //                       className="position-absolute"
    //                       style={{
    //                         top: 10,
    //                         right: 10,
    //                         cursor: "pointer",
    //                       }}
    //                       onClick={() => setShowPassword(!showPassword)}
    //                     >
    //                       <FontAwesomeIcon
    //                         icon={showPassword ? faEye : faEyeSlash}
    //                       />
    //                     </div>
    //                   </div>
    //                 </div>
    //                 <div className="col-12">
    //                   <div className="position-relative">
    //                     <input
    //                       type={showConfirm ? "text" : "password"}
    //                       placeholder="Confirm Password"
    //                       value={confirmPassword}
    //                       onChange={handleConfirmPassword}
    //                     />
    //                     <div
    //                       className="position-absolute"
    //                       style={{
    //                         top: 10,
    //                         right: 10,
    //                         cursor: "pointer",
    //                       }}
    //                       onClick={() => setShowConfirm(!showConfirm)}
    //                     >
    //                       <FontAwesomeIcon
    //                         icon={showConfirm ? faEye : faEyeSlash}
    //                       />
    //                     </div>
    //                   </div>
    //                 </div>

    //                 <div className="col-12">
    //                   <label>Upload Image:</label>
    //                   <input
    //                     type="file"
    //                     accept="image/*"
    //                     onChange={handleFileChange}
    //                   />
    //                 </div>

    //                 <div className="col-12">
    //                   <div
    //                     className="d-grid col-12 mx-auto mt-3 mb-2"
    //                     onClick={handleRegistration}
    //                   >
    //                     <button className="SubmitBtn" type="button">
    //                       Sign Up
    //                     </button>
    //                   </div>
    //                 </div>
    //               </form>
    //               <div className="Already">
    //                 <span>
    //                   Already have an account?&nbsp;&nbsp;
    //                   <a href="/login">Login</a>
    //                 </span>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //         <div className="col-5 h-100">
    //           <div className="position-relative">
    //             <div className="SideImage">
    //               <img src="./side.jpg" alt="sideimage" />
    //             </div>
    //             <div className="position-absolute top-50 start-50 translate-middle">
    //               <svg
    //                 xmlns="http://www.w3.org/2000/svg"
    //                 width="79"
    //                 height="8"
    //                 viewBox="0 0 79 8"
    //                 fill="none"
    //               >
    //                 <path
    //                   d="M78.208 0.964814L0.884277 7.79433H61.7703C64.6844 7.79433 66.2676 4.38706 64.3885 2.15979C63.6502 1.28477 62.5237 0.836399 61.386 0.964814Z"
    //                   fill="#74CC7E"
    //                 />
    //               </svg>
    //               <div className="m-2 text-center RegistrationText">
    //                 <h2 className="fw-bolder">Welcome To GreenS</h2>
    //                 <h5>Nice to see you again</h5>
    //                 <p>
    //                   Lorem ipsum dolor sit amet, consectetur adipiscing elit,
    //                   sed do eiusmod tempor
    //                 </p>
    //               </div>
    //               <svg
    //                 xmlns="http://www.w3.org/2000/svg"
    //                 width="79"
    //                 height="8"
    //                 viewBox="0 0 79 8"
    //                 fill="none"
    //               >
    //                 <path
    //                   d="M0.883982 0.964814L78.2077 7.79433H17.3216C14.4075 7.79433 12.8243 4.38706 14.7034 2.15979C15.4417 1.28477 16.5682 0.836399 17.7059 0.964814Z"
    //                   fill="#74CC7E"
    //                 />
    //               </svg>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div> 
    // </div>
    <div className="container form-start">
      <ToastContainer />
      <div className="registration">
        <div className="registration-wrapper">
          <div className="row w-75 h-100 gx-0 ">
            <div className="col-7 h-100 from">
              <div className="registration-form h-100">
                <div className="registration-header">
                  <div className="logo">
                    <img
                      src="./NavLogo.png"
                      alt="registration logo"
                      className="registrationLogo"
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
                  <div>
                    <div className=" SignUP-Btn" onClick={handleNavigate}>
                      Login
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-center FormHead registration-title pt-3">
                    <h1 className="">Create Account</h1>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor
                    </p>
                  </div>
                </div>
                <div>
                  <form className="row d-flex flex-column registration-inputs">
                  <div className="col-12 ">
                       <input
                         type="text"
                         placeholder="Investor Name"
                       value={investorName}
                        onChange={handleName}
                      />
                    </div>

                    <div className="col-12">
                      <input
                        type="text"
                        placeholder="Email"
                        value={email.trim()}
                        onChange={handleEmail}
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
                      />
                    </div>
                    <div className="col-12">
                      <div className="input-group">
                        <input
                          type={showPassword ? "text" : "password"}
                          className="form-control"
                          id="inputPassword"
                          placeholder="Password"
                          value={password.trim()}
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
                          type={showConfirm ? "text" : "password"}
                          className="form-control"
                          id="inputPassword"
                          placeholder="confirm password"
                          value={confirmPassword.trim()}
                          onChange={(e) =>
                            setConfirmPassword(e.target.value.trim())
                          }
                          required
                        />
                      </div>
                    </div>
                    <div className="col">
                      <div className="col-6 mb-3 w-[100%]">
                        <select onChange={handleState}>
                          <option>Select State</option>
                          {indiaObject &&
                            indiaObject.states.map((e) => {
                              return <option value={e.name}>{e.name}</option>;
                            })}
                        </select>
                      </div>
                      <div className="col-6  w-[100%]">
                        <select onChange={handleCity}>
                          <option>Select City</option>
                          {selectedState &&
                            selectedState.cities.map((e) => {
                              return <option value={e.name}>{e.name}</option>;
                            })}
                        </select>
                      </div>
                    </div>
                    <div className="col-12">
                  <input
                    type="text"
                    placeholder="Firm Name"
                    value={firmName}
                    onChange={handleFirmName}
                  />
                </div>

                    <div>
                      <input
                        type="tel"
                        placeholder="Contact Number"
                        onKeyDown={handleKeyDown}
                        onChange={handleContact}
                        maxLength={10}
                        onInput={(e) => {
                          let value = e.target.value.replace(
                            /[^0-9 a-z A-Z]/g,
                            ""
                          ); // Remove non-numeric characters
                          // Check if the first digit is zero
                          if (value.length > 0 && value[0] === "0") {
                            // If the first digit is zero, remove it
                            value = value.slice(1);
                          }
                          // Set the updated value
                          e.target.value = value;
                        }}
                      />
                    </div>
                  <div className="mb-3">
                    <label htmlFor="file" className="form-label">
                      Upload Image
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="file"
                      onChange={handleFileChange}
                    />
                  </div>
                  <div className=" form-check">
                    <input
                          className="form-check-input"
                          type="checkbox"
                          style={{width:"16px"}}
                          id="terms"
                        />
                    <label className="form-check-label" htmlFor="terms">
                      I agree to the terms and conditions
                    </label>
                  </div>
                    
                    <div className="col-12 d-flex justify-content-center align-items-center">
                      <button
                        type="button"
                        className="btnregistration mt-2"
                        onClick={handleRegistration}
                      >
                        Sign Up
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-5">
              <div className="registration-image-section">
                <img
                  src="./login-background.jpg"
                  className="registration-background-image"
                />
                <div className="image-content">
                  <div className="registration-image-content">
                    <div>
                      <img src="./login-side.png" />
                    </div>
                    <div>
                      <h4>
                        "Services offered all over India <br /> across 250+
                        cities"
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
    </div>
  );
};

export default InvestorRegistrationPage;
