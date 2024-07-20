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
  faTableCells,
} from "@fortawesome/free-solid-svg-icons";
import { BASE_URL } from "../../BASE_URL";

const Startup_investors = () => {
    const { _id } = useParams();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedInvestment, setSelectedInvestment] = useState(null);
  // const [listView, setListView] = useState(true);
  const [myData, setmyData] = useState();
  const [listView, setListView] = useState(true);
  const [activeView, setActiveView] = useState("list");
  const [portfolios, setportfolios] = useState([])
  const [investments, setInvestments] = useState([]);
  const [editingInvestment, setEditingInvestment] = useState(null);
  const [investorToken, setinvestorToken] = useState(localStorage.getItem("investorToken"));

  const navigate = useNavigate();

  useEffect(() => {
        fetchInvestments();
        const handleResize = () => {
          if (window.innerWidth < 1024) {
            setListView(false);
            setActiveView("grid")
          }
        };
        window.addEventListener("resize", handleResize);
        handleResize(); // Set the initial state
    
        return () => window.removeEventListener("resize", handleResize);
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

  const listStyle = {
    background: "linear-gradient(to bottom, #9ad1a0, #00818a)",
  };

  const gridStyle = {
    background: "linear-gradient(to bottom, #9ad1a0, #00818a)",
  };

  const inactiveStyle = {
    background: "linear-gradient(to bottom, #c8dbca, #a4c7c9)",
  };


  const handleListView = () => {
    setListView(true);
    setActiveView("list");
  };

  const handleGridView = () => {
    setListView(false);
    setActiveView("grid");
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
            </div>
            <div className="flex justify-between items-center lg:mt-10 lg:mb-[100px]">
            <div className="startup-products-header lg:text-[22px] text-[18px]">
              <h6 >All Investors</h6>
              <img src="" alt="" />
            </div>
            <div className="flex">
              
               <div className="ms-4 lg:block hidden">
                  <FontAwesomeIcon
                    icon={faList}
                    className="startup-add-product-icons cursor-pointer"
                    onClick={handleListView}
                    style={activeView === 'list' ? listStyle : inactiveStyle}
                  />
                  <FontAwesomeIcon
                    icon={faTableCells}
                    className="startup-add-product-icons startup-add-product-icons-2 cursor-pointer"
                    onClick={handleGridView}
                    style={activeView === 'grid' ? gridStyle : inactiveStyle}
                  />
                </div>
            </div>
          </div>

            {listView ? (
              <>
                <div className="mt-5">
                  <div>
                    <div className="product-list-view d-flex align-item-center justify-between">
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
                {portfolios.map((investment) => (
                  <div key={investment._id} className="col-md-4 mb-4">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="mb-3">{investment.investor.InvestorName}</h5>
                        <p className="mb-1">
                          <strong>Investment Amount:</strong>  {investment.InvestedAmount}
                        </p>
                        <p className="mb-1">
                          <strong>Date Available:</strong>{" "}
                          {new Date(investment.InvestmentDate).toLocaleDateString()}
                        </p>
                        <p className="mb-1">
                          <strong>Other Details:</strong> {investment.investor.FirmName}
                        </p>
                        <p className="mb-1">
                          <strong>Other Details:</strong>   {investment.startupBrandName}
                        </p>
                        <p className="mb-1">
                          <strong>Other Details:</strong>    {investment.startupTradeName}
                        </p>
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
