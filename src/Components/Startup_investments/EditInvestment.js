import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import StartUpProfile from "../StartUpProfile/StartUpProfile";
import SecondNavbar from "../Navbar/Navbar";
import { BASE_URL } from "../../BASE_URL";

const EditInvestment = () => {
  const { state } = useLocation();
  const { _id } = useParams();

  const [investorName, setInvestorName] = useState("");
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [dateAvailable, setDateAvailable] = useState("");
  const [otherDetails, setOtherDetails] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchInvestmentDetails();
  }, []);

  const fetchInvestmentDetails = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/Investment/getInvestmentById/${_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch investment details");
      }

      const responseData = await response.json();
      const { investment_amount, investor_name, date_when_available, other_details } =
        responseData.investment;

      setInvestorName(investor_name);
      setInvestmentAmount(investment_amount);
      setDateAvailable(new Date(date_when_available).toISOString().substring(0, 10));
      setOtherDetails(other_details);
    } catch (error) {
      console.error("Error fetching investment details:", error);
      toast.error("Something went wrong!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
    }
  };

  const handleInvestorName = (e) => {
    setInvestorName(e.target.value.trim());
  };

  const handleInvestmentAmount = (e) => {
    setInvestmentAmount(e.target.value.trim());
  };

  const handleDateAvailable = (e) => {
    setDateAvailable(e.target.value);
  };

  const handleOtherDetails = (e) => {
    setOtherDetails(e.target.value.trim());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!investorName) {
      toast.error("Investor name is required!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      return;
    }
    if (!investmentAmount) {
      toast.error("Investment amount is required!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      return;
    }
    if (!dateAvailable) {
      toast.error("Date available is required!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      return;
    }

    try {
      const response = await fetch(
        `${BASE_URL}/api/Investment/editInvestment/${_id}`,
        {
          method: "PUT",
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            investor_name: investorName,
            investment_amount: investmentAmount,
            date_when_available: dateAvailable,
            other_details: otherDetails,
          }),
        }
      );

      if (!response.ok) {
        const errorDetails = await response.json();
        console.error("Investment edit failed:", errorDetails);
        throw new Error("Investment edit failed");
      }

      toast.success("Investment updated successfully!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });

      setTimeout(() => {
        navigate(-1); // Go back to previous page
        localStorage.setItem("myData", "investment");
      }, 1000);
    } catch (error) {
      console.error("Investment edit failed:", error.message);
      toast.error("Investment edit failed. Please try again later.", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
    }
  };

  return (
    <>
      <SecondNavbar />
      <StartUpProfile />
      <div className="container p-11">
        <ToastContainer />
        <div className="d-flex justify-content-between mb-4 ml-[120px] pt-[30px] text-[30px]">
          <h2 style={{ fontWeight: "600" }}>Edit Investment</h2>
        </div>
        <div className="row flex justify-center items-center">
          <div className="col-lg-5 mb-4 mt-[-23px]">
            <div className="form-group">
              <label htmlFor="investorName">Investor Name</label>
              <input
                type="text"
                className="mb-3 form-control"
                id="investorName"
                style={{ width: "559px", height: "46px" }}
                value={investorName}
                onChange={handleInvestorName}
              />
            </div>
            <div className="form-group">
              <label htmlFor="investmentAmount">Investment Amount</label>
              <input
                type="text"
                className="mb-3 form-control"
                id="investmentAmount"
                value={investmentAmount}
                style={{ width: "559px", height: "46px" }}
                onChange={handleInvestmentAmount}
              />
            </div>
          </div>
          <div className="col-lg-5 mb-4">
            <div className="form-group">
              <label htmlFor="dateAvailable">Date Available</label>
              <input
                type="date"
                className="form-control mb-3"
                style={{ width: "559px", height: "46px" }}
                required
                id="dateAvailable"
                value={dateAvailable}
                onChange={handleDateAvailable}
              />
            </div>
            <div className="form-group">
              <label htmlFor="otherDetails">Other Details</label>
              <textarea
                className="form-control"
                id="otherDetails"
                rows="3"
                value={otherDetails}
                onChange={handleOtherDetails}
              ></textarea>
            </div>
          </div>
        </div>
        <div className="row mr-[105px]">
          <div className="d-flex justify-end mt-5 mb-5">
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
    </>
  );
};

export default EditInvestment;
