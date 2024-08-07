import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import StartUpProfile from "../StartUpProfile/StartUpProfile";
import SecondNavbar from "../Navbar/Navbar";
import { BASE_URL } from "../../BASE_URL";
import "react-toastify/dist/ReactToastify.css";

export default function AddInvestment() {
    const { state } = useLocation();
    const _id = state && state._id;
    console.log('id is:',_id);

    const [investorName, setInvestorName] = useState("");
    const [investmentAmount, setInvestmentAmount] = useState("");
    const [dateAvailable, setDateAvailable] = useState("");
    const [otherDetails, setOtherDetails] = useState("");

    const navigate = useNavigate();

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

    const handleSubmit = async () => {
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
            const response = await fetch(`${BASE_URL}/api/Investment/addInvestment`, {
                method: "POST",
                headers: {
                    Authorization: localStorage.getItem("token"),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    startupId: _id,
                    investor_name: investorName,
                    investment_amount: investmentAmount,
                    date_when_available: dateAvailable,
                    other_details: otherDetails,
                }),
            });

            if (!response.ok) {
                const errorDetails = await response.json();
                console.error("Investment Add failed:", errorDetails);
                throw new Error("Investment Add failed");
            }

            console.log(response);
            toast.success("Investment added successfully!", {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 1000,
            });

            setTimeout(() => {
                navigate(-1, { state: { abc: "addgrant" } });
                localStorage.setItem('myData', "investment");
            }, 1000);
        } catch (error) {
            console.error("Investment Add failed:", error.message);
            toast.error("Investment Add failed. Please try again later.", {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 1000,
            });
        }
    };

    const handleback = () => {
        localStorage.setItem("myData", "investment");
        navigate(-1);
    };

    return (
        <>
            <SecondNavbar />
            <StartUpProfile />
            <div className="container p-11">
                <ToastContainer />
                <div className="d-flex justify-content-between mb-4 lg:ml-[120px] pt-[30px] text-[30px]">
                    <h2 style={{ fontWeight: "600" }}>Add Investment</h2>
                </div>
                <div className="row flex justify-center items-center">
                    <div className="w-full md:w-1/2 lg:w-1/3 p-3">
                        <div className="form-group">
                            <label htmlFor="investorName">Investor Name</label>
                            <input
                                type="text"
                                className="mb-3 form-control"
                                id="investorName"
                                style={{ width: "100%", height: "46px" }}
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
                                style={{ width: "100%", height: "46px" }}
                                onChange={handleInvestmentAmount}
                            />
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 lg:w-1/3 p-3">
                        <div className="form-group">
                            <label htmlFor="dateAvailable">Date Available</label>
                            <input
                                type="date"
                                className="form-control mb-3"
                                style={{ width: "100%", height: "46px" }}
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
                <div className="flex justify-end mt-5 mb-5 gap-3">
                    <button
                        onClick={handleSubmit}
                        className="add-award-submit-button"
                        style={{ height: "50px", width: "267px" }}
                    >
                        SUBMIT
                    </button>
                    <button
                        onClick={handleback}
                        className="add-award-submit-button"
                        style={{ height: "50px", width: "267px" }}
                    >
                        BACK
                    </button>
                </div>
            </div>
        </>
    );
}
