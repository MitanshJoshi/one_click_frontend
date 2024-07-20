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

const Startup_investments = () => {
    const { _id } = useParams();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedInvestment, setSelectedInvestment] = useState(null);
  const [listView, setListView] = useState(true);
  const [myData, setmyData] = useState();
  const [portfolios, setportfolios] = useState([])
  const [investments, setInvestments] = useState([]);
  const [activeView, setActiveView] = useState('list'); 
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

   
    const listStyle = {
      background: 'linear-gradient(to bottom, #9ad1a0, #00818a)',
  };
  
  const gridStyle = {
      background: 'linear-gradient(to bottom, #9ad1a0, #00818a)',
  };
  
  const inactiveStyle = {
      background: 'linear-gradient(to bottom, #c8dbca, #a4c7c9)',
  };

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
    setActiveView('list');
  };
  

  const handleGridView = () => {
    setListView(false);
    setActiveView("grid")
  };

  return (
    <>
    <section className="mt-5">
      <ToastContainer />
      <div className="startup-products">
        <div>
          <div className="flex justify-between mt-10">
            <div className="startup-products-header lg:text-[22px] text-[18px]">
              <h6 >All Investments</h6>
              <img src="" alt="" />
            </div>
            <div className="flex">
              {!investorToken && (
                <div className="startup-product-add-button">
                  <button onClick={handleAddInvestment}>+ Add Investment</button>
                </div>
              )}
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
            <div className="mt-5">
              <div>
                <div className="product-list-view flex flex-wrap justify-between items-center">
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
                      <p>Date Available</p>
                    </div>
                  </div>
                  <div className="product-info">
                    <div>
                      <p>Other Details</p>
                    </div>
                  </div>
                  {!investorToken && (
                    <div className="product-info">
                      <div>
                        <p>Actions</p>
                      </div>
                    </div>
                  )}
                </div>
                {investments.map((investment) => (
                  <div
                    key={investment._id}
                    className="product-list-view product-list-view-content flex items-center flex-wrap"
                  >
                    <div className="product-info">
                      <h5 className="mb-0">{investment.investor_name}</h5>
                    </div>
                    <div className="product-info">
                      <h5>{investment.investment_amount}</h5>
                    </div>
                    <div className="product-info">
                      <h5 className="mb-0">
                        {new Date(investment.date_when_available).toLocaleDateString()}
                      </h5>
                    </div>
                    <div className="product-info">
                      <h5 className="mb-0">{investment.other_details}</h5>
                    </div>
                    {!investorToken && (
                      <div className="product-info">
                        <FontAwesomeIcon
                          icon={faEdit}
                          className="me-3 cursor-pointer"
                          onClick={() => handleEdit(investment)}
                        />
                        <FontAwesomeIcon
                          icon={faTrashAlt}
                          className="cursor-pointer"
                          onClick={() => {
                            setmyData("investment");
                            setSelectedInvestment(investment._id);
                            setShowConfirmation(true);
                          }}
                        />
                      </div>
                    )}
                  </div>
                ))}
                {portfolios.map((investment) => (
                  <div
                    key={investment._id}
                    className="product-list-view product-list-view-content flex items-center flex-wrap"
                  >
                    <div className="product-info">
                      <h5 className="mb-0">{investment.investor.InvestorName}</h5>
                    </div>
                    <div className="product-info">
                      <h5>{investment.InvestedAmount}</h5>
                    </div>
                    <div className="product-info">
                      <h5 className="mb-0">
                        {new Date(investment.InvestmentDate).toLocaleDateString()}
                      </h5>
                    </div>
                    <div className="product-info">
                      <h5 className="mb-0">{investment.investor.FirmName}</h5>
                    </div>
                    {!investorToken && (
                      <div className="product-info">
                        <FontAwesomeIcon
                          icon={faEdit}
                          className="me-3 cursor-pointer"
                          onClick={() => handleEdit(investment)}
                        />
                        <FontAwesomeIcon
                          icon={faTrashAlt}
                          className="cursor-pointer"
                          onClick={() => {
                            setmyData("portfolio");
                            setSelectedInvestment(investment._id);
                            setShowConfirmation(true);
                          }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
              {/* {investments.map((investment) => (
                <div key={investment._id} className="col mb-4">
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
                      <div className="flex justify-between mt-3">
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
              ))} */}
              {investments.map((investment) => (
                  <div key={investment._id} className="col-md-4 mb-4 lg:w-[400px]">
                    <div className="card">
                      <div className="card-body">
                        <div className="d-flex align-items-center mb-3 justify-between">
                          <div className="flex justify-center items-center">
                          <h5 className="mb-0">{investment.investor_name}</h5>
                          </div>
                          {!investorToken?<div className="d-flex">
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
                        </div>:<></>}
                        </div>
                        <p><strong>Investment Amount:</strong> {investment.investment_amount}</p>
                        <p><strong>Date Available:</strong> {new Date(investment.date_when_available).toLocaleDateString()}</p>
                        <p><strong>Other Details:</strong> {investment.other_details}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </section>
  
    {/* Modal for Edit Investment */}
    {editingInvestment && (
      <Modal show={true} onHide={() => setEditingInvestment(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Investment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleEditInvestment}>
            <div className="form-group mb-3">
              <label>Investor Name</label>
              <input
                type="text"
                className="form-control"
                name="investor_name"
                value={editingInvestment.investor_name}
                onChange={(e) =>
                  setEditingInvestment({
                    ...editingInvestment,
                    investor_name: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>Investment Amount</label>
              <input
                type="number"
                className="form-control"
                name="investment_amount"
                value={editingInvestment.investment_amount}
                onChange={(e) =>
                  setEditingInvestment({
                    ...editingInvestment,
                    investment_amount: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>Date When Available</label>
              <input
                type="date"
                className="form-control"
                name="date_when_available"
                value={new Date(editingInvestment.date_when_available)
                  .toISOString()
                  .substring(0, 10)}
                onChange={(e) =>
                  setEditingInvestment({
                    ...editingInvestment,
                    date_when_available: new Date(e.target.value).toISOString(),
                  })
                }
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>Other Details</label>
              <textarea
                className="form-control"
                name="other_details"
                value={editingInvestment.other_details}
                onChange={(e) =>
                  setEditingInvestment({
                    ...editingInvestment,
                    other_details: e.target.value,
                  })
                }
              ></textarea>
            </div>
            <div className="startup-product-add-button">
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    )}
  
    {/* Confirmation Modal for Deletion */}
    {showConfirmation && (
      <div className="confirmation-modal">
        <div className="confirmation-content">
          <h1 className="confirmation-message">
            Are you sure you want to delete this Investment?
          </h1>
          <div className="buttons-container">
            <button
              className="btng"
              onClick={myData === "portfolio" ? handleDeletePortfolio : handleDeleteInvestment}
            >
              Yes
            </button>
            <button className="btnr" onClick={handleCancelDelete}>
              No
            </button>
          </div>
        </div>
      </div>
    )}
  </>
  );
};

export default Startup_investments;
