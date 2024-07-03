import React, { useState, useEffect } from "react";
import "./DisplayProfile.css";
import Countries from "../../CountryStateCity.json";
import { toast } from "react-toastify";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { BASE_URL } from "../../BASE_URL";

const DisplayProfile = ({ img }) => {
  const indiaObject = Countries.find((country) => country.name === "India");
  // Initial states
  const [countryData, setCountryData] = useState([]);
  const [selectedState, setSelectedState] = useState({});
  
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [name, setUsername] = useState("");
  const [contact, setContactNo] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [countryCode, setCountryCode] = useState("91+");
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
    fetchData();
  }, []);

  useEffect(() => {
    const fetchDocumentTypes = async () => {
      const token = localStorage.getItem("token"); // Get token from localStorage
      try {
        const response = await axios.get(
          "https://oneclick-sfu6.onrender.com/api/Document/getDocument",
          {
            headers: {
              authorization: token,
            },
          }
        );
        if (response.data.document && response.data.document.length > 0) {
          const document = response.data.document[0];
          setDocumentType(document.document_type);
          setDocumentUrl(document.document_photo);
        }
      } catch (error) {
        console.error("Error fetching document types:", error);
      }
    };

    fetchDocumentTypes();

    // Set the stored document type on initial load
    const storedDocumentType = localStorage.getItem("documentType");
    if (storedDocumentType) {
      setDocumentType(storedDocumentType);
    }
  }, []);

  const handleDocumentTypeChange = (e) => {
    const newDocumentType = e.target.value;
    setDocumentType(newDocumentType);
    localStorage.setItem("documentType", newDocumentType); // Store the selected document type
  };

  // Fetch user profile data from the server
  const fetchData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/user/display`, {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      const responseData = await response.json();
      
      if (responseData.code === 200) {
        const userData = responseData.data[0];
        setUsername(userData.name || "");
        setContactNo(userData.contact || "");
        setEmail(userData.email || "");
        setAddress(userData.address || "");
        setPincode(userData.pincode || "");
        setCountryCode(userData.countryCode || "");
        setState(userData.state || "");
        setImage(userData.profilePicture || "");
        setCity(userData.city || "");

        // Fetch cities based on the selected state
        if (userData.state) {
          const selectedStateName = userData.state;
          const selectedCountry = Countries.find(
            (country) => country.name === "India"
          );
          const selectedState = selectedCountry.states.find(
            (state) => state.name === selectedStateName
          );
          if (selectedState && selectedState.cities) {
            setCitiesArray(selectedState.cities);
            console.log("cities sre",citiesArray)
          }
        }
      } else {
        console.error("Error fetching user data:", responseData.message);
      }
    } catch (error) {
      console.error("Error fetching data from the backend", error);
    }
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type !== "application/pdf") {
      toast.error("Only PDF files are allowed", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      setDocumentFile(null); // Reset the file input
    } else {
      setDocumentFile(file);
    }
  };

  // Handle document upload
  const handleDocumentUpload = async () => {
    if (!documentFile || documentFile.type !== "application/pdf") {
      toast.error("Please select a valid PDF file", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", documentFile);
      formData.append("document_type", documentType);

      const response = await fetch(`${BASE_URL}/api/Document/AddDocument`, {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        body: formData,
      });

      const responseData = await response.json();

      if (response.ok) {
        toast.success(responseData.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 1000,
        });
        // Optionally update state or perform any additional actions
      } else {
        toast.error("Failed to upload document", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 1000,
        });
      }
    } catch (error) {
      console.error("Error uploading document:", error);
      toast.error("Something went wrong!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
    }
  };

  const handleDocumentEdit = async () => {
    if (!documentFile || documentFile.type !== "application/pdf") {
      toast.error("Please select a valid PDF file", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", documentFile);
      formData.append("document_type", documentType);

      const response = await fetch(`${BASE_URL}/api/Document/EditDocument`, {
        method: "PUT",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        body: formData,
      });

      const responseData = await response.json();
      console.log("resp:", responseData);
      setDocumentUrl(responseData.document_photo);
      console.log("documenturl", documentUrl);

      if (response.ok) {
        toast.success("Document updated successfully", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 1000,
        });
        // Optionally update state or perform any additional actions
      } else {
        toast.error("Failed to update document", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 1000,
        });
      }
    } catch (error) {
      console.error("Error updating document:", error);
      toast.error("Something went wrong!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
    }
  };

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

  // Handle country code selection
  const handleCountryCode = (e) => {
    setCountryCode(e.target.value);
  };

  // Handle username input
  const handleUsername = (e) => {
    setUsername(e.target.value.trim());
  };
  // Handle contact number input
  const handleContactNo = (e) => {
    setContactNo(e.target.value.trim());
  };

  // Handle address input
  const handleAddress = (e) => {
    setAddress(e.target.value);
  };

  // Handle pincode input
  const handlePincode = (e) => {
    setPincode(e.target.value);
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
      toast.error("Please enter a valid 6-digit Pincode", {
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
        formData.append("image", image);
      }

      const response = await fetch(`${BASE_URL}/api/user/edit`, {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token"),
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

  // Handle education form submission
  const handleEducationSubmit = async (e) => {
    e.preventDefault();

    // Validation to ensure all fields are filled
    if (!collegeName || !passingYear || !highestEducation) {
      toast.error("All fields are required", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      return;
    }

    const educationData = {
      college_university_name: collegeName,
      passing_year: passingYear,
      highest_Education: highestEducation,
    };

    try {
      const response = await fetch(`${BASE_URL}/api/Education/EditEducation`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify(educationData),
      });

      const responseData = await response.json();

      if (responseData.success) {
        toast.success("Education added successfully", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 1000,
        });

        // Clear input fields after successful submission

        // Update education list with new data (if applicable)
        // setEducationList([...educationList, responseData.data]);
      } else {
        toast.success("Education added successfully", {
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
  const handleViewDocument = () => {
    // Open documentUrl in a new tab
    window.open(documentUrl, "_blank");
  };

  return (
    <div className="mx-[100px] ">
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
                        htmlFor="address"
                        style={{ color: "#000", fontWeight: "600" }}
                      >
                        Address
                      </label>
                    </div>
                    <div className="col-lg-9 col-8">
                      <textarea
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
                          let value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
                          // Check if the first digit is zero
                          if (value.length > 0 && value[0] === "0") {
                            // If the first digit is zero, remove it
                            value = value.slice(1);
                          } else if (value.length > 0 && value[0] === " ") {
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
          <div className="form-group mb-sm-5 mb-3 row align-items-lg-start align-items-center">
            <div className="col-lg-2 col-3">
              <label
                className="LabelDesign2"
                htmlFor="documentType"
                style={{ color: "#000", fontWeight: "600" }}
              >
                Document Type
              </label>
            </div>
            <div className="col-lg-9 col-8">
              <select
                className="form-control py-2"
                id="documentType"
                onChange={(e) => setDocumentType(e.target.value)}
                value={documentType}
                style={{ color: "#000", fontWeight: "600" }}
              >
                <option value="">Select Document Type</option>
                <option value="aadhaar_card">Aadhaar Card</option>
                <option value="driving_license">Driving License</option>
                <option value="election_card">Election Card</option>
              </select>
            </div>
          </div>
          <div className="form-group mb-sm-5 mb-3 row align-items-lg-start align-items-center">
            <div className="col-lg-2 col-3">
              <label
                className="LabelDesign2"
                htmlFor="documentFile"
                style={{ color: "#000", fontWeight: "600" }}
              >
                Upload Document
              </label>
            </div>
            <div className="col-lg-9 col-8">
              <input
                type="file"
                className="form-control py-2"
                id="documentFile"
                accept=".pdf"
                onChange={handleFileChange}
                style={{ color: "#000", fontWeight: "600" }}
              />
            </div>
          </div>
          <div className="d-flex justify-content-end mb-sm-5 mb-3">
            {documentUrl && (
              <div>
                <div className="profile-edit-buttons">
                  <button
                    className="btn ms-3 btn-primary"
                    onClick={handleViewDocument}
                  >
                    View Document
                  </button>
                </div>
              </div>
            )}
            <div className="profile-edit-buttons">
              <button className="ms-3" onClick={handleDocumentEdit}>
                Upload Document
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DisplayProfile;
