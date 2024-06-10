import React from "react";
import "./DisplayProfile.css";
import Countries from "../../CountryStateCity.json";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { BASE_URL } from "../../BASE_URL";

const DisplayProfile = ({img}) => {
  const indiaObject = Countries.find((country) => country.name === "India");

  const [countryData, setCountryData] = useState([]);
  const [selectedState, setSelectedState] = useState({}); // Set default value to avoid potential null issues

  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [name, setUsername] = useState("");
  const [contact, setContactNo] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [countryCode, setCountryCode] = useState("91+");
  const [citiesArray, setCitiesArray] = useState([]);
  const [image ,setimage]=useState(null)
  useEffect(() => {

    setimage(img)
    
  }, [img])
  console.log(img)
  
  useEffect(() => {
    setCountryData(Countries);
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/user/display`, {
          method: "GET",
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        });
        const responseData = await response.json();
        
        if (responseData.code === 200) {
          const userData = responseData.data[0];
          // Update state variables with the retrieved data
          setUsername(userData.name || "");
          setContactNo(userData.contact || "");
          setEmail(userData.email || "");
          setAddress(userData.address || "");
          setPincode(userData.pincode || "");
          setCountryCode(userData.countryCode || "");
          setState(userData.state || "");
          setCity(userData.city || "");
  
          // Fetch cities based on the selected state
          if (userData.state) {
            const selectedStateName = userData.state;
            const selectedCountry = Countries.find(country => country.name === "India");
            const selectedState = selectedCountry.states.find(state => state.name === selectedStateName);
            if (selectedState && selectedState.cities) {
              setCitiesArray(selectedState.cities);
            }
          }
        } else {
          // Handle error response
          console.error("Error fetching user data:", responseData.message);
        }
      } catch (error) {
        console.error("Error fetching data from the backend", error);
      }
    };
  
    fetchData();
  }, []);
  
  const handleSelectedState = (e) => {
    const selectedStateName = e.target.value;
    setCity("");
    const selectedCountry = countryData.find((country) =>
      country.states.some((state) => state.name === selectedStateName)
    );

    const stateOb =
      selectedCountry &&
      selectedCountry.states.find((state) => state.name === selectedStateName);

    setCitiesArray(stateOb.cities);

    setState(selectedStateName);
  };

  const handleCity = (e) => {
    setCity(e.target.value);
  };

  const handleCountryCode = (e) => {
    setCountryCode(e.target.value);
  };

  const handleUsername = (e) => {
    setUsername(e.target.value.trim());
  };

  const handleContactNo = (e) => {
    setContactNo(e.target.value.trim());
  };

  // const handleEmail = (e) => {
  //   setEmail(e.target.value);
  // };

  const handleAddress = (e) => {
    setAddress(e.target.value);
  };

  const handlePincode = (e) => {
    setPincode(e.target.value);
  };
  const validateEmail = (email) => {
    // Regular expression for email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  //updated profile
  const handleSave = async (e) => {
    e.preventDefault();
    if (!name) {
      toast.error("Username  is required", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      return;
    }
    if (!contact) {
      toast.error("Contact Number is required", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      return;
    }
    if (contact.length <= 9) {
      toast.error("Please enter a valid 10-digit mobile number", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      }
    );
      return;
    }
  
    // const handleimg = (e) => {
    //   const { files } = e.target;
  
    //   const selectedFile = files[0];
  
    //   setimage(selectedFile);
    //   // setimage(URL.createObjectURL(selectedFile))
    // };
    if (!state) {
      toast.error("State is required", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      return;
    }
    if (!city) {
      toast.error("City is required", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      return;
    }
    if (!address) {
      toast.error("Address is required", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      return;
    }
    if (!pincode) {
      toast.error("Pincode is required", {
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
    try {
      
      const formData = new FormData();
    formData.append("name", name);
    formData.append("contact", contact);
    formData.append("email", email);
    formData.append("address", address);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("pincode", pincode);
    if (image) {
      formData.append('image', image);
    }
    
      const response = await fetch(`${BASE_URL}/api/user/edit`, {
        method: "POST",
        headers: {
          // "Content-Type": "application/json",
          // "Access-Control-Allow-Origin": "*",
          Authorization: `${localStorage.getItem("token")}`,
        },
        body:formData,
      });

      if (response.ok) {
        toast.success("Profile Updated Successfully", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 1000,
        });
      } else {
        toast.error("Something went wrong!", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 1000,
        });
      }
    } catch (error) {
      toast.error("Something went wrong!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
    }
  };

  return (
    <div>
      <div className="Newsallstyle">
        <div className="container">
          <div className="row">
            <form>
              <div className="">
                <div className="">
                  <div className="form-group mb-sm-5 mb-3 row align-items-lg-start align-items-center">
                    <div className="col-lg-2 col-3">
                      <label
                        className="LabelDesign2"
                        htmlFor="startupName"
                        style={{ color: "#000", fontWeight: "600" }}
                      >
                        Username
                      </label>
                    </div>
                    <div className="col-lg-9 col-8">
                      <input
                        type="text"
                        className="form-control py-2 "
                        id="startupName"
                        onChange={handleUsername}
                        value={name.trim()}
                        style={{ color: "#000", fontWeight: "600" }}
                      />
                    </div>
                  </div>
                  <div className="form-group mb-sm-5 mb-3 row align-items-lg-start align-items-center">
                    <div className="col-lg-2 col-3">
                      <label
                        className="LabelDesign2"
                        htmlFor="contactNo"
                        style={{ color: "#000", fontWeight: "600" }}
                      >
                        Contact No
                      </label>
                    </div>
                    <div className="col-lg-9 col-8">
                      <div className="d-flex" style={{ gap: "20px" }}>
                        <input
                          type="tel"
                          className="form-control py-2 "
                          id="contactNo"
                          defaultValue={countryCode}
                          style={{
                            color: "#000",
                            fontWeight: "600",
                            width: "55px",
                          }}
                        />
                        <input
                          type="tel"
                          className="form-control py-2  text-center"
                          id="contactNo"
                          value={contact}
                          style={{
                            color: "#000",
                            fontWeight: "600",
                            width: "160px",
                          }}
                          maxLength={10}
                          onInput={(e) => {
                            let value = e.target.value.replace(/[^0-9 ]/g, ''); // Remove non-numeric characters
                            // Check if the first digit is zero
                            if (value.length > 0 && value[0] === '0') {
                              // If the first digit is zero, remove it
                              value = value.slice(1);
                            }
                            // Set the updated value
                            e.target.value = value;
                          }}
                          onChange={handleContactNo}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group mb-sm-5 mb-3 row align-items-lg-start align-items-center">
                    <div className="col-lg-2 col-3">
                      <label
                        className="LabelDesign2"
                        htmlFor="email"
                        style={{ color: "#000", fontWeight: "600" }}
                      >
                        Email ID
                      </label>
                    </div>
                    <div className="col-lg-9 col-8">
                      <input
                        type="tel"
                        className="form-control py-2 "
                        id="email"
                        // onChange={handleEmail}
                        value={email}
                        // onInput={(e) => {
                        //   let value = e.target.value.replace(/[^0-9 a-z @_. ]/g, ''); // Remove non-numeric characters
                        //   // Check if the first digit is zero
                        //   if (value.length > 0 && value[0] === ' ') {
                        //     // If the first digit is zero, remove it
                        //     value = value.slice(1);
                        //   }
                        //   // Set the updated value
                        //   e.target.value = value;
                        // }}
                        // style={{ color: "#000", fontWeight: "600" }}
                      />
                    </div>
                  </div>
                  <div className="form-group mb-sm-5 mb-3 row align-items-lg-start align-items-center">
                    <div className="col-lg-2 col-3">
                      <label className="LabelDesign2" htmlFor="state" style={{ color: "#000", fontWeight: "600" }}>
                        Select State
                      </label>
                    </div>
                    <div className="col-lg-9 col-8">
                      <div className="position-relative">
                        <select
                          className="form-control py-2"
                          onChange={handleSelectedState}
                          value={state}
                          id="state"
                          style={{ color: "#000", fontWeight: "600" }}
                        >
                          {indiaObject &&
                            indiaObject.states?.map((e) => {
                              return (
                                <option key={e.name} value={e.name}>
                                  {e.name}
                                </option>
                              );
                            })}
                        </select>
                        <FontAwesomeIcon icon={faChevronDown} className="position-absolute end-0 top-50 translate-middle-y pe-3" />
                      </div>
                    </div>
                  </div>
                  <div className="form-group mb-sm-5 mb-3 row align-items-lg-start align-items-center">
                    <div className="col-lg-2 col-3">
                      <label className="LabelDesign2" htmlFor="city" style={{ color: "#000", fontWeight: "600" }}>
                        Select City
                      </label>
                    </div>
                    <div className="col-lg-9 col-8">
                      <div className="position-relative">
                        <select
                          className="form-control py-2"
                          onChange={handleCity}
                          value={city}
                          id="city"
                          style={{ color: "#000", fontWeight: "600" }}
                        >
                          {citiesArray &&
                            citiesArray?.map((e) => {
                              return (
                                <option key={e.name} value={e.name}>
                                  {e.name}
                                </option>
                              );
                            })}
                        </select>
                        <FontAwesomeIcon icon={faChevronDown} className="position-absolute end-0 top-50 translate-middle-y pe-3" />
                      </div>
                    </div>
                  </div>
                  <div className="form-group mb-sm-5 mb-3 row align-items-lg-start align-items-center">
                    <div className="col-lg-2 col-3">
                      <label
                        className="LabelDesign2"
                        htmlFor="address"
                        style={{ color: "#000", fontWeight: "600" }}
                      >
                        Address
                      </label>
                    </div>
                    <div className="col-lg-9 col-8">
                      <textarea
                      onInput={(e) => {
                        let value = e.target.value.replace(/[^0-9 a-z A-Z]/g, ''); // Remove non-numeric characters
                        // Check if the first digit is zero
                        if (value.length > 0 && value[0] === ' ') {
                          // If the first digit is zero, remove it
                          value = value.slice(1);
                        }
                        // Set the updated value
                        e.target.value = value;
                      }}
                        className="form-control py-2 "
                        id="address"
                        rows="1"
                        onChange={handleAddress}
                        defaultValue={address}
                        style={{ color: "#000", fontWeight: "600" }}
                      ></textarea>
                    </div>
                  </div>
                  <div className="form-group mb-sm-5 mb-3 row align-items-lg-start align-items-center">
                    <div className="col-lg-2 col-3">
                      <label
                        className="LabelDesign2"
                        htmlFor="pincode"
                        style={{ color: "#000", fontWeight: "600" }}
                      >
                        Enter Pincode
                      </label>
                    </div>
                    <div className="col-lg-9 col-8">
                      <input
                        type="text"
                        className="form-control py-2 "
                        id="pincode"
                        onChange={handlePincode}
                        value={pincode}
                        style={{ color: "#000", fontWeight: "600" }}
                        onInput={(e) => {
                          let value = e.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
                          // Check if the first digit is zero
                          if (value.length > 0 && value[0] === '0') {
                            // If the first digit is zero, remove it
                            value = value.slice(1);
                          }else if (value.length > 0 && value[0] === ' ') {
                            // If the first digit is zero, remove it
                            value = value.slice(1);
                          }
                          // Set the updated value
                          e.target.value = value;
                        }}
                        maxLength={6}
                        
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <div className="d-flex justify-content-end mb-sm-5 mb-3">
              <div className="profile-edit-buttons">
                <button className="ms-3" onClick={handleSave}>
                  Save
                </button>
              </div>
            </div>
          </div>

          {/* <div>
            <div className="display-profile-education">
              <h4>Education Background</h4>

              <div className="mb-4 mt-4">
                <label className="mb-2" htmlFor="">
                  Last Education
                </label>
                <select
                  className="form-control py-2 "
                  id="city"
                  style={{ color: "#000", fontWeight: "600" }}
                >
                  <option value="Select">Ahmedabad</option>
                  <option value="volvo">Volvo</option>
                  <option value="saab">Saab</option>
                  <option value="mercedes">Mercedes</option>
                  <option value="audi">Audi</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="mb-2" htmlFor="">
                  Passing Year
                </label>
                <select
                  className="form-control py-2 "
                  id="city"
                  style={{ color: "#000", fontWeight: "600" }}
                >
                  <option value="Select">Ahmedabad</option>
                  <option value="volvo">Volvo</option>
                  <option value="saab">Saab</option>
                  <option value="mercedes">Mercedes</option>
                  <option value="audi">Audi</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="mb-2" htmlFor="">
                  School / Collage Name
                </label>
                <select
                  className="form-control py-2 "
                  id="city"
                  style={{ color: "#000", fontWeight: "600" }}
                >
                  <option value="Select">Ahmedabad</option>
                  <option value="volvo">Volvo</option>
                  <option value="saab">Saab</option>
                  <option value="mercedes">Mercedes</option>
                  <option value="audi">Audi</option>
                </select>
              </div>
            </div>
            <div className="d-flex justify-content-end mb-sm-5 mb-3">
              <div className="profile-edit-buttons">
                <button className="ms-3">Save</button>
              </div>
            </div>
          </div> */}

          {/* <div>
            <div className="display-profile-education">
              <div className="">
                <h4>Career Experience</h4>
              </div>
              <div className="mb-4 mt-4">
                <label className="mb-2" htmlFor="">
                  Company Name
                </label>
                <select
                  className="form-control py-2 "
                  id="city"
                  style={{ color: "#000", fontWeight: "600" }}
                >
                  <option value="Select">Ahmedabad</option>
                  <option value="volvo">Volvo</option>
                  <option value="saab">Saab</option>
                  <option value="mercedes">Mercedes</option>
                  <option value="audi">Audi</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="mb-2" htmlFor="">
                  Designation
                </label>
                <select
                  className="form-control py-2 "
                  id="city"
                  style={{ color: "#000", fontWeight: "600" }}
                >
                  <option value="Select">Ahmedabad</option>
                  <option value="volvo">Volvo</option>
                  <option value="saab">Saab</option>
                  <option value="mercedes">Mercedes</option>
                  <option value="audi">Audi</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="mb-2" htmlFor="">
                  Joining Date
                </label>

                <div
                  className="d-flex align-items-center"
                  style={{ gap: "20px" }}
                >
                  <input
                    type="date"
                    name=""
                    id=""
                    className="form-control py-2 "
                  />
                  <span>to</span>
                  <input
                    type="date"
                    name=""
                    id=""
                    className="form-control py-2 "
                  />
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-end mb-sm-5 mb-3">
              <div className="profile-edit-buttons">
                <button className="ms-3">Save</button>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default DisplayProfile;
