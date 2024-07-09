import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import StartUpProfile from "../Components/StartUpProfile/StartUpProfile";
import { BASE_URL } from "../BASE_URL";
import SecondNavbar from "../Components/Navbar/Navbar";

export default function AddPortfolio() {
  const { state } = useLocation();
  const _id = state && state._id;
  const data=state.data || " ";

  console.log('id',_id);
  console.log('data',data);
  

  const [files, setFiles] = useState([]);
  const [trade, setTrade] = useState("");
  const [brand, setBrand] = useState("");
  const [Logo, setLogo] = useState("")
  const [investedAmount, setInvestedAmount] = useState("");
  const [investmentDate, setInvestmentDate] = useState("");
  const [country, setCountry] = useState("");
  const [statee, setStatee] = useState("");
  const [startups, setStartups] = useState([]);
  const [startupId, setStartupId] = useState("");
  const [city, setCity] = useState("");

  const navigate = useNavigate();


  const handleEditPortfolio = async (e) => {
    e.preventDefault();

    if (!files.length) {
      toast.error("Startup logo is required!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      return;
    }
    const formData = new FormData();
    formData.append("startupTradeName", trade);
    formData.append("startupBrandName", brand);
    formData.append("InvestedAmount", investedAmount);
    formData.append("InvestmentDate", investmentDate);
    formData.append("InvestorId", localStorage.getItem("userid"));
    formData.append("startupId", startupId);
    formData.append("StartUpCountry", country);
    formData.append("StartUpState", statee);
    formData.append("StartUpCity", city);

    try {
      const response = await fetch(
        `${BASE_URL}/api/investorPortfolio/updatePortfolio/${_id}`,
        {
          method: "PUT",
          headers: {
            Authorization: localStorage.getItem("investorToken"),
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to edit portfolio");
      }

      toast.success("Portfolio updated successfully!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });

      setTimeout(() => {
        navigate(-1);
      }, 1000);
    } catch (error) {
      console.error("Error editing portfolio:", error);
      toast.error("Something went wrong!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
    }
  };


  const fetchPortfolioDetails = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/investorPortfolio/getPortfolioById/${_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("investorToken"),
        },
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const Data = await response.json();
      const portfolio = Data.portfolio;

      setBrand(portfolio.startupBrandName);
      setTrade(portfolio.startupTradeName);
      setInvestmentDate(portfolio.InvestmentDate.split("T")[0]); // Extracting the date part
      setInvestedAmount(portfolio.InvestedAmount);
      setFiles(portfolio.startupLogoURL);
      setLogo(portfolio.StartUpLogo)
      setCountry(portfolio.StartUpCountry);
      setStatee(portfolio.StartUpState);
      // setStartups(portfolio.startupName);
      setCity(portfolio.StartUpCity); // Extracting the date part

    } catch (error) {
      console.error("Error fetching grant details:", error);
      toast.error("Something went wrong!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
    }
  };

  const handleTrade = (e) => {
    setTrade(e.target.value);
  };

  const handleBrand = (e) => {
    setBrand(e.target.value);
  };

  const handleInvestedAmount = (e) => {
    setInvestedAmount(e.target.value);
  };

  const handleImg = (e) => {
    const uploadedPhotos = Array.from(e.target.files);
    setFiles(uploadedPhotos);
  };

  const fetchStartupNames = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/startup/getAllStartup`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("investorToken"),
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch startup names");
      }

      const responseData = await response.json();
      setStartups(responseData.startups);
    } catch (error) {
      console.error("Error fetching startup names:", error);
      toast.error("Something went wrong!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
    }
  };

  useEffect(() => {
    fetchStartupNames();
    {data==="edit"?fetchPortfolioDetails():<></>}

  }, []);

  const handleCountry = (e) => {
    setCountry(e.target.value);
  };

  const handleState = (e) => {
    setStatee(e.target.value);
  };

  const handleCity = (e) => {
    setCity(e.target.value);
  };

  const handleDate = (e) => {
    setInvestmentDate(e.target.value);
  };

  const handleStartup = (e) => {
    setStartupId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!files.length) {
      toast.error("Startup logo is required!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      return;
    }

    const formData = new FormData();
    formData.append("startupTradeName", trade);
    formData.append("startupBrandName", brand);
    formData.append("InvestedAmount", investedAmount);
    formData.append("InvestmentDate", investmentDate);
    formData.append("InvestorId", localStorage.getItem("userid"));
    formData.append("startupId", startupId);
    files.forEach((file) => {
      formData.append("file", file);
    });
    formData.append("StartUpCountry", country);
    formData.append("StartUpState", statee);
    formData.append("StartUpCity", city);

    try {
      const response = await fetch(
        `${BASE_URL}/api/investorPortfolio/addPortfolio`,
        {
          method: "POST",
          headers: {
            Authorization: localStorage.getItem("investorToken"),
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add portfolio");
      }

      toast.success("Portfolio added successfully!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });

      setTimeout(() => {
        navigate(-1);
      }, 1000);
    } catch (error) {
      console.error("Error adding portfolio:", error);
      toast.error("Something went wrong!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
    }
  };

  return (
    <>
      <SecondNavbar />
      <StartUpProfile onBackButtonClick={() => navigate(-1)} />
      <div>
        <ToastContainer />
        <div className="d-flex text-[30px] justify-content-between ml-[200px] pt-[30px]">
          <h1 className="mb-5" style={{ fontWeight: "600" }}>
            Add Portfolio
          </h1>
        </div>
        <div className="flex justify-center items-center">
          <div className="row gap-0">
            <div className="col-6 d-flex align-item-center justify-content-center">
              <div
                className="add-award-form"
                style={{ width: "556px", height: "181px" }}
              >
                <p>Enter Startup Logo<span className="text-black">{data==="edit"?` (current logo is ${Logo})`:""}</span></p>
                <div className="mb-1">
                  <input
                    type="file"
                    multiple
                    onChange={handleImg}
                    className="mb-3"
                    style={{ width: "559px", height: "46px" }}
                  />
                </div>
                <div className="mb-1">
                  <p className="mb-1">Enter Trade Name</p>
                  <input
                    onChange={handleTrade}
                    value={trade}
                   className="mb-3"
                    style={{ width: "559px", height: "46px" }}
                  ></input>
                </div>
                <div className="mb-1">
                  <p className="mb-1">Select Startup</p>
                  <select
                    className="form-control mb-3"
                    onChange={handleStartup}
                    style={{ width: "559px", height: "46px" }}
                  >
                    <option value="">Select a Startup</option>
                    {startups.map((startup) => (
                      <option key={startup._id} value={startup._id}>
                        {startup.startupName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-1">
                  <p className="mb-1">Invested Amount</p>
                  <input
                    onInput={(e) => {
                      let value = e.target.value.replace(/[^0-9 ,.]/g, "");
                      if (value.length > 0 && value[0] === " ") {
                        value = value.slice(1);
                      }
                      e.target.value = value;
                    }}
                    type="text"
                    onChange={handleInvestedAmount}
                    value={investedAmount}
                    style={{ width: "559px", height: "46px" }}
                  />
                </div>
                <div className="d-flex justify-content-between mt-5 mb-1">
                  <button
                    onClick={data==="edit"?handleEditPortfolio:handleSubmit}
                    className="add-award-submit-button"
                    style={{ height: "50px", width: "267px" }}
                  >
                    SUBMIT
                  </button>
                  <button
                    onClick={() => navigate(-1)}
                    className="add-award-submit-button"
                    style={{ height: "50px", width: "267px" }}
                  >
                    BACK
                  </button>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="add-award-form mt-[-2px]">
              <div className="form-group mb-1">
                  <p className="mb-[2px]">Investment Date</p>
                  <input
                    type="date"
                    className="form-control h-[46px] mb-3"
                    onChange={handleDate}
                    value={investmentDate}
                    required
                  />
                </div>
                <div className="mb-1">
                  <p className="mb-1">Enter Brand Name</p>
                  <input
                    type="text"
                    onChange={handleBrand}
                    value={brand}
                    className="mb-3"
                    style={{ width: "559px", height: "46px" }}
                  />
                </div>
              
                <div className="mb-1">
                  <p className="mb-1">Select Country</p>
                  <input
                    type="text"
                    onChange={handleCountry}
                    value={country}
                    className="mb-3"
                    style={{ width: "559px", height: "46px" }}
                  />
                </div>
                <div className="mb-1">
                  <p className="mb-1">Enter State</p>
                  <input
                    type="text"
                    onChange={handleState}
                    value={statee}
                    className="mb-3"
                    style={{ width: "559px", height: "46px" }}
                  />
                </div>
                <div className="mb-1">
                  <p className="mb-1">Enter City</p>
                  <input
                    type="text"
                    onChange={handleCity}
                    value={city}
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
