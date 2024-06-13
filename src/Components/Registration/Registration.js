import React, { useState } from "react";
import "./registration.css";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Countries from "../../CountryStateCity.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { BASE_URL } from "../../BASE_URL";

const RegistrationPage = () => {
  const indiaObject = Countries.find((country) => country.name === "India");

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/login");
  };

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [contact, setContact] = useState("");
  const [dob,setDob]=useState("")
  const [file,setFile]=useState(null)
  // const [file, setimage] = useState("");

  // console.log(file);

  const [selectedState, setSelectedState] = useState(null);

  const handleName = (e) => {
    setUserName(e.target.value);
  };
  const validateEmail = (email) => {
    // Regular expression for email validation
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

  const handleAddress = (e) => {
    setAddress(e.target.value);
  };

  const handlePincode = (e) => {
    setPincode(e.target.value);
  };

  const handleContact = (e) => {
    setContact(e.target.value);
  };

  const handleFileChange=(e)=>{
    const file=e.target.files[0];
    setFile(file);
  }
  const handleDob = (e) => {
    setDob(e.target.value);
  };
  // const handleimg = (e) => {

  //   const { files } = e.target;

  //   const selectedFile = files[0];

  //   setimage(selectedFile)
  //   // setimage(URL.createObjectURL(selectedFile))

  // };
  const [showPassword, setShowPassword] = useState(false);
  const [showconform, setshowconform] = useState(false);

  const handleRegistration = async () => {
    if (!userName) {
      toast.error("Username must be required", {
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
  
    if (!address) {
      toast.error("Address must be required", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      return;
    }
  
    if (!pincode) {
      toast.error("Pincode must be required", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      return;
    }
  
    if (pincode.length < 6) {
      toast.error("Please enter a valid 6-digit Pincode!", {
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
  
    if (!dob) {
      toast.error("Date of Birth is required", {
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
    formData.append("name", userName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("state", state);
    formData.append("city", city);
    formData.append("address", address);
    formData.append("pincode", pincode);
    formData.append("contact", contact);
    formData.append("status", "active");
    formData.append("DOB", new Date(dob).toISOString());
    formData.append("image", file);
  
    try {
      const response = await fetch(`${BASE_URL}/api/user/register`, {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("Registration failed");
      }
  
      toast.success(
        "Registration successful!  Now, login with your registered email and password",
        {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 1000,
        }
      );
  
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.error("Registration failed:", error.message);
      toast.error("Registration failed. Please try again later.", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
    }
  };
  

  const handleKeyDown = (e) => {
    // Allow: backspace, delete, tab, escape, enter
    if (
      [46, 8, 9, 27, 13].indexOf(e.keyCode) !== -1 ||
      // Allow: Ctrl+A/Ctrl+C/Ctrl+V
      (e.keyCode === 65 && e.ctrlKey === true) ||
      (e.keyCode === 67 && e.ctrlKey === true) ||
      (e.keyCode === 86 && e.ctrlKey === true) ||
      // Allow: home, end, left, right
      (e.keyCode >= 35 && e.keyCode <= 39)
    ) {
      // Let it happen, don't do anything
      return;
    }
    // Ensure that it is a number and stop the keypress
    if (
      (e.shiftKey || e.keyCode < 48 || e.keyCode > 57) &&
      (e.keyCode < 96 || e.keyCode > 105)
    ) {
      e.preventDefault();
    }
  };

  return (
    // <div className="container form-start ">
    //   <ToastContainer />
    //   <div className="registration">
    //     <div className="registration-wrapper">
    //       <div className=" registration-border">
    //         <div>
    //           <div>
    //             <div className="d-flex justify-content-between">
    //               <div>
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
    //                 <button className="SignUP-Btn">
    //                   <span className="m-4" onClick={handleNavigate}>
    //                     registration
    //                   </span>
    //                 </button>
    //               </div>
    //             </div>
    //           </div>
    //           <div>
    //             <div className="mb-4">
    //               <div className="text-center registration-title pt-5">
    //                 <h1 className="">Create Account</h1>
    //                 <p>
    //                   Lorem ipsum dolor sit amet, consectetur adipiscing elit,
    //                   sed do eiusmod tempor
    //                 </p>
    //               </div>
    //             </div>
    //           </div>
    //           <div>
    //             <div className="d-flex flex-column registration-inputs">
    //               <div>
    //                 <input
    //                   type="text"
    //                   placeholder="Username"
    //                   onChange={handleName}
    //                 />
    //               </div>
    //               <div>
    //                 <input
    //                   type="email"
    //                   placeholder="Email"
    //                   onChange={handleEmail}
    //                 />
    //               </div>
    //               <div>
    //                 <input
    //                   type="password"
    //                   placeholder="Password"
    //                   onChange={handlePassword}
    //                 />
    //               </div>
    //               <div>
    //                 <input
    //                   type="password"
    //                   placeholder="Confirm Password"
    //                   onChange={handleConfirmPassword}
    //                 />
    //               </div>
    //               <div className="row">
    //                 <div className="col-6">
    //                   <select onChange={handleState}>
    //                     <option>select your state</option>
    //                     {indiaObject &&
    //                       indiaObject.states.map((e) => {
    //                         return <option value={e.name}>{e.name}</option>;
    //                       })}
    //                   </select>
    //                 </div>
    //                 <div className="col-6">
    //                   <select onChange={handleCity}>
    //                     <option>select your city</option>
    //                     {selectedState &&
    //                       selectedState.cities.map((e) => {
    //                         return <option value={e.name}>{e.name}</option>;
    //                       })}
    //                   </select>
    //                 </div>
    //               </div>
    //               <div>
    //                 <textarea onChange={handleAddress}></textarea>
    //               </div>
    //               <div>
    //                 <input
    //                   type="tel"
    //                   placeholder="Pincode"
    //                   onKeyDown={handleKeyDown}
    //                   onChange={handlePincode}
    //                   maxLength={6}
    //                 />
    //               </div>
    //               <div>
    //                 <input
    //                   type="tel"
    //                   placeholder="Contact Number"
    //                   onKeyDown={handleKeyDown}
    //                   onChange={handleContact}
    //                   maxLength={10}
    //                 />
    //               </div>
    //             </div>
    //           </div>
    //           <div className="d-flex justify-content-center mt-2">
    //             <button
    //               type="button"
    //               className="btnregistration mt-2"
    //               onClick={handleRegistration}
    //             >
    //               Sign Up
    //             </button>
    //           </div>
    //         </div>
    //       </div>

    //       <div className="registration-image">
    //         <img src="./registration.jpg" />

    //         <div className="image-content">
    //           <div className="registration-image-content">
    //             <div>
    //               <img src="./registration-side.png" className="img-fluid" />
    //             </div>
    //             <div>
    //               <h4 className="px-2 mt-5">
    //                 "“A wide range of capabilities for a more interesting ,
    //                 <br />
    //                 user experience, including verticals and 23
    //                 <br />
    //                 transaction-oriented search options.”
    //               </h4>
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
                        placeholder="Username"
                        value={userName.trim()}
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
                          type={showconform ? "text" : "password"}
                          className="form-control"
                          id="inputPassword"
                          placeholder="confirm password"
                          value={confirmPassword.trim()}
                          onChange={(e) =>
                            setConfirmPassword(e.target.value.trim())
                          }
                          required
                        />
                        <button
                          className="btn btn-outline-secondary"
                          type="button"
                          onClick={() => setshowconform(!showconform)}
                        >
                          <FontAwesomeIcon
                            icon={showconform ? faEye : faEyeSlash}
                          />
                        </button>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <select onChange={handleState}>
                          <option>Select State</option>
                          {indiaObject &&
                            indiaObject.states.map((e) => {
                              return <option value={e.name}>{e.name}</option>;
                            })}
                        </select>
                      </div>
                      <div className="col-6">
                        <select onChange={handleCity}>
                          <option>Select City</option>
                          {selectedState &&
                            selectedState.cities.map((e) => {
                              return <option value={e.name}>{e.name}</option>;
                            })}
                        </select>
                      </div>
                    </div>
                    <div>
                      <textarea
                        onChange={handleAddress}
                        placeholder="Address"
                        value={address}
                        onInput={(e) => {
                          let value = e.target.value.replace(
                            /[^0-9 a-z A-Z]/g,
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
                      ></textarea>
                    </div>
                    <div>
                      <input
                        type="tel"
                        placeholder="Pincode"
                        onKeyDown={handleKeyDown}
                        onChange={handlePincode}
                        maxLength={6}
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
                    <label htmlFor="dob" className="form-label">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="dob"
                      placeholder="Enter your date of birth"
                      value={dob}
                      onChange={handleDob}
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
                      type="checkbox"
                      className="form-check-input"
                      id="terms"
                    />
                    <label className="form-check-label" htmlFor="terms">
                      I agree to the terms and conditions
                    </label>
                  </div>
                    {/* <div className="col-12 ">
                      <input
                        type="file"
                        placeholder="image"
                        // value={file}
                        onChange={handleimg}
                      />
                      
                    </div> */}

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

export default RegistrationPage;
