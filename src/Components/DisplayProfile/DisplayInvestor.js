import React, { useState, useEffect } from "react";
import "./DisplayProfile.css";
import Countries from "../../CountryStateCity.json";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { BASE_URL } from "../../BASE_URL";
import SecondNavbar from "../Navbar/Navbar";

const DisplayInvestor = ({ img }) => {
  const indiaObject = Countries.find((country) => country.name === "India");
  // Initial states
  const [countryData, setCountryData] = useState([]);
  const [country, setCountry] = useState("India")
  const [selectedState, setSelectedState] = useState({});
  const [state, setState] = useState("");
  const [firmname, setFirmname] = useState("");
  const [city, setCity] = useState("");
  const [name, setUsername] = useState("");
  const [contact, setContactNo] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [countryCode, setCountryCode] = useState("91+");
  const [selectedFile, setSelectedFile] = useState(null);
  const [citiesArray, setCitiesArray] = useState([]);
  const [image, setImage] = useState(null);
  const [highestEducation, setHighestEducation] = useState("");
  const [passingYear, setPassingYear] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [educationList, setEducationList] = useState([]);
  const [documentType, setDocumentType] = useState(""); // State to manage document type
  // const [documentOptions, setDocumentOptions] = useState([]);
  const [documentFile, setDocumentFile] = useState(null); // State to manage selected document file
  const [documentUrl, setDocumentUrl] = useState("");

  // Fetch user data on component mount
  useEffect(() => {
    setCountryData(Countries);
  }, []);

  // Fetch user profile data from the server
  useEffect(() => {
    // Fetch user profile data from the server
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/Investor/getInvestorById`, {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("investorToken"),
          },
        });
        const responseData = await response.json();
  
        if (response.ok) {            
          setUsername(responseData.investor.InvestorName || "");
          setContactNo(responseData.investor.InvestorContactNum || "");
          setEmail(responseData.investor.InvestorEmail || "");
          setFirmname(responseData.investor.FirmName || "");
          setState(responseData.investor.InvestorState || "");
          setImage(responseData.investorPhotoUrl || "");
          setCity(responseData.investor.InvestorCity || "");
          setCountry(responseData.investor.InvestorCountry || "");
  
          // Fetch cities based on the selected state
          if (responseData.investor.InvestorState) {
            const selectedStateName = responseData.investor.InvestorState;
            const selectedCountry = Countries.find(
              (country) => country.name === "India"
            );
            const selectedState = selectedCountry.states.find(
              (state) => state.name === selectedStateName
            );
            if (selectedState && selectedState.cities) {
              setCitiesArray(selectedState.cities);
            }
          }
        } else {
          console.error("Error fetching user data:", responseData.message);
        }
      } catch (error) {
        console.error("Error fetching data from the backend", error);
      }
    };
  
    fetchData();
  }, []);
  
  // Handle state selection
  const handleSelectedState = (e) => {
    const selectedStateName = e.target.value;
    setCity("");
    const selectedCountry = countryData.find((country) =>
      country.states.some((state) => state.name === selectedStateName)
    );

    const stateOb =
      selectedCountry &&
      selectedCountry.states.find((state) => state.name === selectedStateName);

    setCitiesArray(stateOb ? stateOb.cities : []);
    setState(selectedStateName);
  };

  // Handle city selection
  const handleCity = (e) => {
    setCity(e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  // Handle username input
  const handleUsername = (e) => {
    setUsername(e.target.value.trim());
  };
  const handleFirmName = (e) => {
    setFirmname(e.target.value.trim());
  };
  // Handle contact number input
  const handleContactNo = (e) => {
    setContactNo(e.target.value.trim());
  };

  // Validate email function
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Save profile updates
  const handleSave = async (e) => {
    e.preventDefault();
    if (!name) {
      toast.error("Username is required", {
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

    if (contact.length < 10) {
      toast.error("Please enter a valid 10-digit mobile number", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      return;
    }
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
    try {
      const formData = new FormData();
      formData.append("InvestorName", name);
      formData.append("InvestorContactNum", contact);
      formData.append("InvestorEmail", email);
      formData.append("InvestorCity", city);
      formData.append("InvestorState", state);
      formData.append("FirmName", firmname);
      formData.append("InvestorCountry", country);
      if (image) {
        formData.append("file", image);
      }

      const response = await fetch(`${BASE_URL}/api/Investor/editInvestor`, {
        method: "PUT",
        headers: {
          Authorization: localStorage.getItem("investorToken"),
        },
        body: formData,
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
    <>
    <div className="lg:mx-[100px] ">
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
                    <div className="col-lg-4 col-5">
                      <div className="d-flex align-items-center">
                        <input
                          type="tel"
                          className="form-control py-2"
                          id="countryCode"
                          defaultValue={countryCode}
                          style={{
                            color: "#000",
                            fontWeight: "600",
                            width: "55px",
                          }}
                          readOnly
                        />
                        <input
                          type="tel"
                          className="form-control py-2 ms-2"
                          id="contactNo"
                          value={contact}
                          style={{
                            color: "#000",
                            fontWeight: "600",
                            flex: "1",
                          }}
                          maxLength={10}
                          onInput={(e) => {
                            let value = e.target.value.replace(/[^0-9 ]/g, ""); // Remove non-numeric characters
                            // Check if the first digit is zero
                            if (value.length > 0 && value[0] === "0") {
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
                    <div className="col-lg-3 col-4">
                      <label
                        className="LabelDesign2 ml-[-10px]"
                        htmlFor="email"
                        style={{ color: "#000", fontWeight: "600" }}
                      >
                        Email ID
                      </label>
                    </div>
                    <div className="col-lg-3 col-4 ml-[-220px]">
                      <input
                        type="email"
                        className="form-control py-2 w-[136%]"
                        id="email"
                        value={email}
                        style={{
                          color: "#000",
                          fontWeight: "600",
                        }}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-group mb-sm-5 mb-3 row align-items-lg-start align-items-center">
                    <div className="col-lg-2 col-3">
                      <label
                        className="LabelDesign2"
                        htmlFor="startupName"
                        style={{ color: "#000", fontWeight: "600" }}
                      >
                        FirmName
                      </label>
                    </div>
                    <div className="col-lg-9 col-8">
                      <input
                        type="text"
                        className="form-control py-2 "
                        id="FirmName"
                        onChange={handleFirmName}
                        value={firmname}
                        style={{ color: "#000", fontWeight: "600" }}
                      />
                    </div>
                  </div>
                  <div className="form-group mb-sm-5 mb-3 row align-items-lg-start align-items-center">
                    <div className="col-lg-2 col-3">
                      <label
                        className="LabelDesign2"
                        htmlFor="startupName"
                        style={{ color: "#000", fontWeight: "600" }}
                      >
                        country
                      </label>
                    </div>
                    <div className="col-lg-9 col-8">
                      <input
                        type="text"
                        className="form-control py-2 "
                        id="Country"
                        value={country}
                        style={{ color: "#000", fontWeight: "600" }}
                      />
                    </div>
                  </div>
                  <div className="form-group mb-sm-5 mb-3 row align-items-lg-start align-items-center">
                    <div className="col-lg-2 col-3">
                      <label
                        className="LabelDesign2"
                        htmlFor="state"
                        style={{ color: "#000", fontWeight: "600"}}
                      >
                        Select State
                      </label>
                    </div>
                    <div className="col-lg-4 col-5">
                      <div className="position-relative">
                        <select
                          className="form-control py-2 w-[100%]"
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
                        <FontAwesomeIcon
                          icon={faChevronDown}
                          className="position-absolute end-0 top-50 translate-middle-y pe-3"
                        />
                      </div>
                    </div>
                    <div className="col-lg-2 col-3 ms-lg-0">
                      <label
                        className="LabelDesign2  ml-[-10px]"
                        htmlFor="city"
                        style={{ color: "#000", fontWeight: "600" }}
                      >
                        Select City
                      </label>
                    </div>
                    <div className="ml-[-105px] col-4">
                      <div className="position-relative">
                        <select
                          className="form-control py-2 "
                          onChange={handleCity}
                          value={city}
                          id="city"
                          style={{
                            color: "#000",
                            fontWeight: "600",
                            width: "100%",
                          }}
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
                        <FontAwesomeIcon
                          icon={faChevronDown}
                          className="position-absolute end-0 top-50 translate-middle-y pe-3"
                        />
                      </div>
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
        </div>
      </div>
    </div>
    </>
  );
};

export default DisplayInvestor;
