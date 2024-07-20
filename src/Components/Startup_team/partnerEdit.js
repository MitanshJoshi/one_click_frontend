import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import SecondNavbar from "../Navbar/Navbar";
import Countries from "../../CountryStateCity.json";
import { BASE_URL } from "../../BASE_URL";
import StartUpProfile from "../StartUpProfile/StartUpProfile";

export default function PartnerEdit() {
  const { state } = useLocation();
  const _id = state && state.id;

  const [partnerName, setPartnerName] = useState("");
  const [position, setPosition] = useState("");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");
  const [country, setCountry] = useState("");
  const [dob, setDob] = useState("");
  const [filePhoto, setFilePhoto] = useState(null);
  // const [stateName, setStateName] = useState("");
  const [statesArray, setStatesArray] = useState([]);
  const [citiesArray, setCitiesArray] = useState([]);



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
    console.log("selected state is", selectedState);
    
    setStateName(selectedState);
    setCity(""); // Reset city selection
  
    const selectedCountry = Countries.find(
      (country) => country.name == country // Replace with the correct variable or state
    );    

    const selectedCities = statesArray.find((e) => e.name === selectedState)
    console.log(selectedCities);
    setCitiesArray(selectedCities.cities)
    
    console.log("selected country is", selectedCountry);
    if (selectedCountry) {
      const selectedStateObj = selectedCountry.states.find(
        (state) => state.name === selectedState
      );
      if (selectedStateObj && selectedStateObj.cities) {
        setCitiesArray(selectedStateObj.cities);
      } else {
        // setCitiesArray([]); // Reset cities array if no cities found
      }
    } else { // Reset cities array if selectedCountry not found
    }
  };

  useEffect(() => {
    fetchPartnerDetails();
  }, []);

  const fetchPartnerDetails = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/Partner/getPartnerById/${_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch partner details");
      }

      const responseData = await response.json();
      const partner = responseData.partner;

      if (partner) {
        setPartnerName(partner.partner_name);
        setPosition(partner.position);
        setCity(partner.city);
        setStateName(partner.state);
        setCountry(partner.country);
        setDob(partner.DOB.split("T")[0]); // Format the date to YYYY-MM-DD
        setFilePhoto(partner.partner_photo);
      }
    } catch (error) {
      console.error("Error fetching partner details:", error);
      toast.error("Failed to fetch partner details", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
    }
  };

  const handleName = (e) => {
    setPartnerName(e.target.value);
  };

  const handlePosition = (e) => {
    setPosition(e.target.value);
  };

  const handleCity = (e) => {
    setCity(e.target.value);
  };

  const handleStateName = (e) => {
    setStateName(e.target.value);
  };

  const handleCountry = (e) => {
    setCountry(e.target.value);
  };

  const handleDob = (e) => {
    setDob(e.target.value);
  };

  const handleImg = (e) => {
    const selectedFile = e.target.files[0];
    setFilePhoto(selectedFile);
  };

  const navigate = useNavigate();

  const handleEditPartner = async (e) => {
    e.preventDefault();
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

    try {
      const response = await fetch(`${BASE_URL}/api/Partner/EditPartner/${_id}`, {
        method: "PUT",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      toast.success("Partner updated successfully!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });

      setTimeout(() => {
        navigate(-1, { state: { abc: "editpartner" } });
        localStorage.setItem("myData", "partner");
      }, 1000);
    } catch (error) {
      toast.error("Something went wrong!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
    }
  };

  const handleBack=()=>{
    navigate(-1, { state: { abc: "editpartner" } });
    localStorage.setItem("myData", "partner");
  }

  return (
    <>
    <SecondNavbar />
    <div className="px-4 lg:px-16">
      <ToastContainer />
      <div className="flex justify-between items-center mb-5">
        <h2 className="font-semibold text-2xl lg:mt-5 lg:ml-[240px]">Edit Partner</h2>
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
                onChange={handleName}
                value={partnerName}
                className="w-full mb-3 h-12"
              />
            </div>
            <div className="mb-4">
              <p className="mb-3">Enter Partner Photo</p>
              <input
                type="file"
                onChange={handleImg}
                className="w-full mb-3 h-12"
              />
            </div>
            <div className="flex justify-between mt-5 mb-5 gap-3">
              <button
                onClick={handleEditPartner}
                className="add-award-submit-button h-12 w-1/2"
              >
                SUBMIT
              </button>
              <button
                onClick={handleBack}
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
