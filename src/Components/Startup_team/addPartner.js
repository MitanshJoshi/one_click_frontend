import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import StartUpProfile from "../StartUpProfile/StartUpProfile";
import { BASE_URL } from "../../BASE_URL";
import SecondNavbar from "../Navbar/Navbar";

export default function AddPartner() {
  const { state } = useLocation();
  const _id = state && state._id;

  const [partnerName, setPartnerName] = useState("");
  const [position, setPosition] = useState("");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");
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
    if (!partnerName) {
      toast.error("Partner name is required!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      return;
    }
    if (!position) {
      toast.error("Position is required!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      return;
    }
    if (!city) {
      toast.error("City is required!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      return;
    }
    if (!stateName) {
      toast.error("State is required!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      return;
    }
    if (!country) {
      toast.error("Country is required!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      return;
    }
    if (!dob) {
      toast.error("Date of Birth is required!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      return;
    }
    if (!filePhoto) {
      toast.error("Photo is required!", {
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

      console.log(response);
      toast.success("Partner added successfully!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });

      setTimeout(() => {
        navigate(-1, { state: { abc: "addpartner" } });
        localStorage.setItem('myData', "partner");
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
            <div className="col-6 d-flex align-item-center justify-content-center">
              <div className="add-award-form" style={{ width: "556px", height: "181px" }}>
                <p className="">Enter partner photo</p>
                <div className="mb-4">
                  <input
                    type="file"
                    onChange={handleFilePhoto}
                    className="mb-3"
                    style={{ width: "559px", height: "46px" }}
                  />
                </div>
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
                  <p className="mb-3">Enter City</p>
                  <input
                    type="text"
                    onChange={handleCity}
                    value={city}
                    className="mb-3"
                    style={{ width: "559px", height: "46px" }}
                  />
                </div>
                <div className="mb-1">
                  <p className="mb-3">Enter State</p>
                  <input
                    type="text"
                    onChange={handleStateName}
                    value={stateName}
                    className="mb-3"
                    style={{ width: "559px", height: "46px" }}
                  />
                </div>
                <div className="mb-1">
                  <p className="mb-3">Enter Country</p>
                  <input
                    type="text"
                    onChange={handleCountry}
                    value={country}
                    className="mb-3"
                    style={{ width: "559px", height: "46px" }}
                  />
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
          </div>
        </div>
      </div>
    </>
  );
}
