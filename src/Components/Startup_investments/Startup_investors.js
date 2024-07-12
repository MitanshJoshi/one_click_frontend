import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast, ToastContainer } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {
  faList,
  faTrashAlt,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { BASE_URL } from "../../BASE_URL";

const Startup_investors = () => {
    const { _id } = useParams();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedInvestment, setSelectedInvestment] = useState(null);
  const [listView, setListView] = useState(true);
  const [myData, setmyData] = useState();
  const [portfolios, setportfolios] = useState([])
  const [investments, setInvestments] = useState([]);
  const [editingInvestment, setEditingInvestment] = useState(null);
  const [investorToken, setinvestorToken] = useState(localStorage.getItem("investorToken"));

  const navigate = useNavigate();

  useEffect(() => {
        fetchInvestments();
    }, []);

  const fetchInvestments = async () => {
    const token=investorToken?localStorage.getItem("investorToken"):localStorage.getItem("token");
    try {
      const response = await fetch(`${BASE_URL}/api/Investment/getInvestment/${_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      console.log('id is:',_id);
      
      if (!response.ok) {
        throw new Error("Failed to fetch investments");
      }

      const responseData = await response.json();
      console.log("responseData",responseData);
      setportfolios(responseData.investorPortfolios);
      setInvestments(responseData.investments);
      
    } catch (error) {
      console.error("Error fetching investments:", error);
      toast.error("Something went wrong!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
    }
  };

  const handleAddInvestment = () => {
    navigate("/addinvestment", { state: { _id } });
  };

  const handleEditInvestment = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${BASE_URL}/api/Investment/editInvestment/${editingInvestment._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editingInvestment),
        }
      );
      
      if (!response.ok) {
        throw new Error("Failed to edit investment");
      }

      setEditingInvestment(null);
      fetchInvestments();
      toast.success("Investment updated successfully!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
    } catch (error) {
      console.error("Error editing investment:", error);
      toast.error("Something went wrong!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
    }
  };

  const handleDeleteInvestment = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/Investment/deleteInvestment/${selectedInvestment}`,
        {
          method: "DELETE",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete investment");
      }

      setShowConfirmation(false);
      fetchInvestments();
      toast.success("Investment deleted successfully!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
    } catch (error) {
      console.error("Error deleting investment:", error);
      toast.error("Something went wrong!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
    }
  };
  const handleDeletePortfolio = async ()=> {
    try {
      const response = await fetch(
        `${BASE_URL}/api/investorPortfolio/deletePortfolio/${selectedInvestment}`,
        {
          method: "DELETE",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete portfolio");
      }

      setShowConfirmation(false);
      fetchInvestments();
      toast.success("Portfolio deleted successfully!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
    } catch (error) {
      console.error("Error deleting portfolio:", error);
      toast.error("Something went wrong!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
    }
  };

  const handleConditionalDelete=(id,data)=>{
    if(data==="portfolio")
    {
      handleDeletePortfolio(id);
    }
    else{
      handleDeleteInvestment(id);
    }
  }

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  const handleEdit = (investment) => {
    // const navigate = useNavigate();
    navigate(`/editinvestment/${investment._id}`);
  };

  const handleListView = () => {
    setListView(true);
  };

  const handleGridView = () => {
    setListView(false);
  };

  return (
    <>
      <section className="mt-5">
        <ToastContainer />
        <div className="startup-products">
          <div>
            <div
              className="d-flex justify-content-between "
              style={{ marginTop: "40px" }}
            >
              <div className="startup-products-header">
                <h6>All Investors</h6>
                <img src="" alt="" />
              </div>
            </div>

            {listView ? (
              <>
                <div className="mt-5">
                  <div>
                    <div className="product-list-view d-flex align-item-center justify-content-between">
                      <div className="product-info">
                        <div>
                          <p>Investor Name</p>
                        </div>
                      </div>
                      <div className="product-info">
                        <div>
                          <p>Investment Amount</p>
                        </div>
                      </div>
                      <div className="product-info">
                        <div>
                          <p>Investment Date</p>
                        </div>
                      </div>
                      <div className="product-info">
                        <div>
                          <p>Firm Name</p>
                        </div>
                      </div>
                      <div className="product-info">
                        <div>
                          <p>Brand Name</p>
                        </div>
                      </div>
                      <div className="product-info">
                        <div>
                          <p>Trade Name</p>
                        </div>
                      </div>
                    </div>
                    {portfolios.map((investment) => (
                      <div
                        key={investment._id}
                        className="product-list-view product-list-view-content d-flex align-item-center"
                      >
                        <div className="product-info">
                          <h5 className="mb-0" >
                            {investment.investor.InvestorName}
                          </h5>
                        </div>
                        <div className="product-info">
                          <h5 className="">
                            {investment.InvestedAmount}
                          </h5>
                        </div>
                        <div className="product-info">
                          <h5 className="mb-0" >
                            {new Date(investment.InvestmentDate).toLocaleDateString()}
                          </h5>
                        </div>
                        <div className="product-info">
                          <h5 className="mb-0" >
                            {investment.investor.FirmName}
                          </h5>
                        </div>
                        <div className="product-info">
                          <h5 className="mb-0" >
                            {investment.startupBrandName}
                          </h5>
                        </div>
                        <div className="product-info">
                          <h5 className="mb-0" >
                            {investment.startupTradeName}
                          </h5>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="row mt-5">
                {investments.map((investment) => (
                  <div key={investment._id} className="col-md-4 mb-4">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="mb-1">{investment.investor_name}</h5>
                        <p className="mb-1">
                          <strong>Investment Amount:</strong> {investment.investment_amount}
                        </p>
                        <p className="mb-1">
                          <strong>Date Available:</strong>{" "}
                          {new Date(investment.date_when_available).toLocaleDateString()}
                        </p>
                        <p className="mb-1">
                          <strong>Other Details:</strong> {investment.other_details}
                        </p>
                        <div className="d-flex justify-content-between mt-3">
                          <FontAwesomeIcon
                            icon={faEdit}
                            className="me-3 cursor-pointer"
                            onClick={() => handleEdit(investment)}
                          />
                          <FontAwesomeIcon
                            icon={faTrashAlt}
                            className="cursor-pointer"
                            onClick={() => {
                              setSelectedInvestment(investment._id);
                              setShowConfirmation(true);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Startup_investors;
