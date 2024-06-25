import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

import StartUpProfile from "../StartUpProfile/StartUpProfile";
import { BASE_URL } from "../../BASE_URL";
import SecondNavbar from "../Navbar/Navbar";
import Countries from "../../CountryStateCity.json"; // Assuming you have this JSON file

export default function AddPartner() {
  const { state } = useLocation();
  const _id = state && state._id;

  const [partnerName, setPartnerName] = useState("");
  const [position, setPosition] = useState("");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");
  // const [citiesArray, setCitiesArray] = useState([]);
  const [statesArray, setStatesArray] = useState([]);
  const [citiesArray, setCitiesArray] = useState([]);

  const [country, setCountry] = useState("");
  const [dob, setDob] = useState("");
  const [filePhoto, setFilePhoto] = useState(null);
  const [wishList, setWishList] = useState(false);

  const navigate = useNavigate();

  const handlePartnerName = (e) => {
    setPartnerName(e.target.value.trim());
  };

  const handlePosition = (e) => {
    setPosition(e.target.value.trim());
  };
  const handleCountryChange = (e) => {
    const countryCode = e.target.value;
    const selectedCountry = Countries.find(
      (country) => country.name === countryCode
    );
    setCountry(countryCode);
    setStateName(""); // Reset state selection
    setCity(""); // Reset city selection

    if (selectedCountry && selectedCountry.states) {
      setStatesArray(selectedCountry.states);
      setCitiesArray([]); // Reset cities array
    } else {
      setStatesArray([]); // Reset states array if no states found
      setCitiesArray([]); // Reset cities array
    }
  };

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setStateName(selectedState);
    setCity(""); // Reset city selection

    const selectedCountry = Countries.find(
      (country) => country.name === "India"
    );
    if (selectedCountry) {
      const selectedStateObj = selectedCountry.states.find(
        (state) => state.name === selectedState
      );
      if (selectedStateObj && selectedStateObj.cities) {
        setCitiesArray(selectedStateObj.cities);
      } else {
        setCitiesArray([]); // Reset cities array if no cities found
      }
    } else {
      setCitiesArray([]); // Reset cities array if selectedCountry not found
    }
  };

  const handleCity = (e) => {
    setCity(e.target.value.trim());
  };

  const handleStateName = (e) => {
    setStateName(e.target.value.trim());
  };

  const handleCountry = (e) => {
    setCountry(e.target.value.trim());
  };

  const handleDob = (e) => {
    setDob(e.target.value);
  };

  const handleFilePhoto = (e) => {
    setFilePhoto(e.target.files[0]);
  };

  const handleSubmit = async () => {
    // Validation checks for required fields
    if (
      !partnerName ||
      !position ||
      // !city ||
      !stateName ||
      !country ||
      !dob ||
      !filePhoto
    ) {
      toast.error("All fields are required!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      return;
    }

    const formData = new FormData();
    formData.append("partner_name", partnerName);
    formData.append("position", position);
    formData.append("city", "ahmedabad");
    formData.append("state", stateName);
    formData.append("country", country);
    formData.append("DOB", dob);
    formData.append("file", filePhoto);
    formData.append("startupId", _id);

    try {
      const response = await fetch(`${BASE_URL}/api/Partner/AddPartner`, {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        body: formData,
      });

      if (!response.ok) {
        const errorDetails = await response.json();
        console.error("Partner Add failed:", errorDetails);
        throw new Error("Partner Add failed");
      }

      console.log(response);
      toast.success("Partner added successfully!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });

      setTimeout(() => {
        navigate(-1, { state: { abc: "addpartner" } });
        localStorage.setItem("myData", "partner");
      }, 1000);
    } catch (error) {
      console.error("Partner Add failed:", error.message);
      toast.error("Partner Add failed. Please try again later.", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
    }
  };

  return (
    <>
      <SecondNavbar />
      <StartUpProfile />
      <div>
        <ToastContainer />
        <div className="d-flex text-[30px] justify-content-between ml-[200px] pt-[30px]">
          <h2 className="mb-5" style={{ fontWeight: "600" }}>
            Add Partner
          </h2>
        </div>
        <div className="flex justify-center items-center">
          <div className="row gap-0">
            <div className="col-6">
              <div className="add-award-form mt-1">
                <div className="mb-1">
                  <p className="mb-3">Enter Position</p>
                  <input
                    type="text"
                    onChange={handlePosition}
                    value={position}
                    className="mb-3"
                    style={{ width: "559px", height: "46px" }}
                  />
                </div>
                <div className="mb-1">
                  <p className="mb-3">Select City</p>
                  <select
                    value={city}
                    onChange={handleCity}
                    className="mb-3 form-control py-2 w-[100%] border-[#00000040]"
                    style={{ width: "559px", height: "46px" }}
                  >
                    <option value="">Select City</option>
                    {citiesArray.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-1">
                  <p className="mb-3">Select State</p>
                  <select
                    value={stateName}
                    onChange={handleStateName}
                    // className="mb-3"
                    className="mb-3 form-control py-2 w-[100%] border-[#00000040]"
                    style={{ width: "559px", height: "46px" }}
                  >
                    <option value="">Select State</option>
                    {Countries.map((country) =>
                      country.states.map((state) => (
                        <option key={state.name} value={state.name}>
                          {state.name}
                        </option>
                      ))
                    )}
                  </select>
                </div>
                <div className="mb-1">
                  <p className="mb-3">Select Country</p>
                  <select
                    value={country}
                    onChange={handleCountry}
                    className="mb-3 form-control py-2 w-[100%]"
                    style={{ width: "559px", height: "46px" }}
                  >
                    <option value="" className="opacity-30">
                      Select Country
                    </option>
                    {Countries.map((country) => (
                      <option key={country.name} value={country.name}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-1">
                  <p className="mb-3">Enter Date of Birth</p>
                  <input
                    type="date"
                    onChange={handleDob}
                    value={dob}
                    className="mb-3"
                    style={{ width: "559px", height: "46px" }}
                  />
                </div>
              </div>
            </div>
            <div className="col-6 d-flex align-item-center justify-content-center">
              <div
                className="add-award-form"
                style={{ width: "556px", height: "auto" }}
              >
                <div className="mb-4">
                  <p className="mb-3">Enter Partner Name</p>
                  <input
                    type="text"
                    onChange={handlePartnerName}
                    value={partnerName}
                    className="mb-3"
                    style={{ width: "559px", height: "46px" }}
                  />
                </div>
                <div className="mb-4">
                  <p className="">Enter Partner Photo</p>
                  <input
                    type="file"
                    onChange={handleFilePhoto}
                    className="mb-3"
                    style={{ width: "559px", height: "46px" }}
                  />
                </div>
                <div className="d-flex justify-content-between mt-5 mb-5">
                  <button
                    onClick={handleSubmit}
                    className="add-award-submit-button"
                    style={{ height: "50px", width: "267px" }}
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
  );
}
