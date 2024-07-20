import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

import StartUpProfile from "../StartUpProfile/StartUpProfile";
import { BASE_URL } from "../../BASE_URL";
import SecondNavbar from "../Navbar/Navbar";
import Countries from "../../CountryStateCity.json";

export default function AddPartner() {
  const { state } = useLocation();
  const _id = state && state._id;

  const [partnerName, setPartnerName] = useState("");
  const [position, setPosition] = useState("");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");
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
      (country) => country.name === country
    );    

    const selectedCities = statesArray.find((e) => e.name === selectedState);
    setCitiesArray(selectedCities.cities);

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

  const handleDob = (e) => {
    setDob(e.target.value);
  };

  const handleFilePhoto = (e) => {
    setFilePhoto(e.target.files[0]);
  };

  const handleSubmit = async () => {
    // Validation checks for required fields
    if (!partnerName || !position || !stateName || !country || !dob || !filePhoto) {
      toast.error("All fields are required!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      return;
    }

    const formData = new FormData();
    formData.append("partner_name", partnerName);
    formData.append("position", position);
    formData.append("city", city);
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
      toast.error("Enter Valid Position", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
    }
  };

  const handleback = () => {
    localStorage.setItem("myData", "partner");
    navigate(-1);
  };

  return (
    <>
      <SecondNavbar />
      <div className="px-4 lg:px-16">
        <ToastContainer />
        <div className="flex justify-between items-center mb-5">
          <h2 className="font-semibold text-2xl">Add Partner</h2>
        </div>
        <div className="flex flex-col lg:flex-row justify-center">
          <div className="w-full lg:w-1/2 flex flex-col items-center justify-center lg:mr-[-100px]">
            <div className="add-award-form w-full max-w-md">
              <div className="mb-4">
                <p className="mb-3">Enter Position</p>
                <input
                  type="text"
                  onChange={handlePosition}
                  value={position}
                  className="w-full mb-3 h-12"
                />
              </div>
              <div className="mb-4">
                <p className="mb-3">Select Country</p>
                <select
                  value={country}
                  onChange={handleCountryChange}
                  className="form-control w-full mb-3 h-12"
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
              <div className="mb-4">
                <p className="mb-3">Select State</p>
                <select
                  value={stateName}
                  onChange={handleStateChange}
                  className="form-control w-full mb-3 h-12"
                >
                  <option value="">Select State</option>
                  {statesArray.map((state) => (
                    <option key={state.id} value={state.name}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <p className="mb-3">Select City</p>
                <select
                  value={city}
                  onChange={handleCity}
                  className="form-control w-full mb-3 h-12"
                >
                  <option value="">Select City</option>
                  {citiesArray.map((city) => (
                    <option key={city.id} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <p className="mb-3">Enter Date of Birth</p>
                <input
                  type="date"
                  onChange={handleDob}
                  value={dob}
                  className="w-full mb-3 h-12"
                />
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:ml-[-100px]">
            <div className="add-award-form w-full max-w-md">
              <div className="mb-4">
                <p className="mb-3">Enter Partner Name</p>
                <input
                  type="text"
                  onChange={handlePartnerName}
                  value={partnerName}
                  className="w-full mb-3 h-12"
                />
              </div>
              <div className="mb-4">
                <p className="mb-3">Enter Partner Photo</p>
                <input
                  type="file"
                  onChange={handleFilePhoto}
                  className="w-full mb-3 h-12"
                />
              </div>
              <div className="flex justify-between mt-5 mb-5 gap-3">
                <button
                  onClick={handleSubmit}
                  className="add-award-submit-button h-12 w-1/2"
                >
                  SUBMIT
                </button>
                <button
                  onClick={handleback}
                  className="add-award-submit-button h-12 w-1/2"
                >
                  BACK
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
