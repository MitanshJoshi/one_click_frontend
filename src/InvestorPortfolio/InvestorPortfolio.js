import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { faList, faTrashAlt, faEdit ,faTableCells} from "@fortawesome/free-solid-svg-icons";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { BASE_URL } from "../BASE_URL";

const InvestorPortfolio = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [myData, setmyData] = useState();
  const [listView, setListView] = useState(true);
  const [activeView, setActiveView] = useState("list");
  const [logoFile, setLogoFile] = useState(null); // State for logo file
  // const [listView, setListView] = useState(true);
  const [startups, setStartups] = useState([]);
  const [portfolios, setPortfolios] = useState([]);
  const [editingPortfolio, setEditingPortfolio] = useState(null);
  const [newPortfolio, setNewPortfolio] = useState({
    startupTradeName: "",
    startupBrandName: "",
    InvestedAmount: "",
    InvestmentDate: new Date().toISOString().split("T")[0], // Today's date
    file: null, // For file upload
    StartUpCountry: "",
    StartUpState: "",
    StartUpCity: "",
  });
  const [showAddModal, setShowAddModal] = useState(false); // State for Add Portfolio modal

  const navigate = useNavigate();

  useEffect(() => {
    fetchPortfolios();
    fetchStartupNames();
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

  const fetchPortfolios = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/investorPortfolio/getPortfolio`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("investorToken"),
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch portfolios");
      }

      const responseData = await response.json();
      setPortfolios(responseData.portfolio);
    } catch (error) {
      console.error("Error fetching portfolios:", error);
      toast.error("Something went wrong!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
    }
  };

  const handleAddPortfolio = () => {
    navigate("/addportfilio",{state:{data:"add"}});
  };

  const handleEditPortfolio = async (e) => {
    navigate("/addportfilio",{state:{_id:e._id, data:"edit"}})
  };

  const handleDeletePortfolio = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/investorPortfolio/deletePortfolio/${selectedPortfolio}`,
        {
          method: "DELETE",
          headers: {
            Authorization: localStorage.getItem("investorToken"),
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete portfolio");
      }

      setShowConfirmation(false);
      fetchPortfolios();
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

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  const handleEdit = (portfolio) => {
    setEditingPortfolio(portfolio);
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
      <section className="mt-sm-5 mt-4">
        <div className="startup-products">
          <div>
            <div
              className="d-flex justify-content-between "
              style={{ marginTop: "40px" }}
            >
              <div className="startup-products-header lg:text-[22px] text-[18px] lg:ml-[140px]">
                <h6>All Portfolios</h6>
              </div>
              <div className="d-flex">
                <div className="startup-product-add-button">
                  <button onClick={handleAddPortfolio}>+ Add Portfolio</button>
                </div>
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
                  <div className="tab-container-maintain">
                    <div className="product-list-view d-flex align-item-center justify-content-between">
                      <div className="product-info">
                        <div>
                          <p>Trade Name</p>
                        </div>
                      </div>
                      <div className="product-info">
                        <div>
                          <p>Brand Name</p>
                        </div>
                      </div>
                      <div className="product-info">
                        <div>
                          <p>Startup Name</p>
                        </div>
                      </div>
                      <div className="product-info">
                        <div>
                          <p>Invested Amount</p>
                        </div>
                      </div>
                      <div className="product-info">
                        <div>
                          <p>Investment Date</p>
                        </div>
                      </div>
                      <div className="product-info">
                        <div>
                          <p>Actions</p>
                        </div>
                      </div>
                    </div>
                    {portfolios.map((portfolio) => (
                      <div
                        key={portfolio._id}
                        className=" product-info product-list-view product-list-view-content d-flex align-item-center"
                      >
                        <div className="product-info">
                          <h5 className=" mb-0 ">
                            {portfolio.startupTradeName}
                          </h5>
                        </div>
                        <div className="product-info">
                          <h5 className="">{portfolio.startupBrandName}</h5>
                        </div>
                        <div className="product-info">
                          <h5 className="">{portfolio.startupName?portfolio.startupName:portfolio.startupBrandName}</h5>
                        </div>
                        <div className="product-info">
                          <h5 className="mb-0 ">{portfolio.InvestedAmount}</h5>
                        </div>
                        <div className="product-info">
                          <h5 className="mb-0">
                            {new Date(portfolio.InvestmentDate).toLocaleDateString()}
                          </h5>
                        </div>
                        <div className="product-info w-[95px]">
                          <FontAwesomeIcon
                            icon={faEdit}
                            className="me-3 cursor-pointer"
                            onClick={() => handleEditPortfolio(portfolio)}
                          />
                          <FontAwesomeIcon
                            icon={faTrashAlt}
                            className="cursor-pointer"
                            onClick={() => {
                              setSelectedPortfolio(portfolio._id);
                              setShowConfirmation(true);
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="row mt-5">
                {portfolios.map((portfolio) => (
                  <div key={portfolio._id} className="col-md-4 mb-4">
                    <div className="card">
                      <div className="card-body">
                        <div className="flex items-center justify-between">
                        <h5 className="mb-1">{portfolio.startupTradeName}</h5>
                        <div className="d-flex  items-center">
                          <FontAwesomeIcon
                            icon={faEdit}
                            className="me-3 cursor-pointer"
                            onClick={() => handleEdit(portfolio)}
                          />
                          <FontAwesomeIcon
                            icon={faTrashAlt}
                            className="cursor-pointer"
                            onClick={() => {
                              setSelectedPortfolio(portfolio._id);
                              setShowConfirmation(true);
                            }}
                          />
                        </div>
                        </div>
                        <p className="mb-1">
                          <strong>Brand Name:</strong> {portfolio.startupBrandName}
                        </p>
                        <p className="mb-1">
                          <strong>Invested Amount:</strong> {portfolio.InvestedAmount}
                        </p>
                        <p className="mb-1">
                          <strong>Investment Date:</strong>{" "}
                          {new Date(portfolio.InvestmentDate).toLocaleDateString()}
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

      {/* Modal for Edit Portfolio */}
      {editingPortfolio && (
  <Modal show={true} onHide={() => setEditingPortfolio(null)}>
    <Modal.Header closeButton>
      <Modal.Title>Edit Portfolio</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <form onSubmit={handleEditPortfolio}>
        <div className="form-group mb-3">
          <label>Trade Name</label>
          <input
            type="text"
            className="form-control"
            value={editingPortfolio.startupTradeName}
            onChange={(e) =>
              setEditingPortfolio({
                ...editingPortfolio,
                startupTradeName: e.target.value,
              })
            }
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Brand Name</label>
          <input
            type="text"
            className="form-control"
            value={editingPortfolio.startupBrandName}
            onChange={(e) =>
              setEditingPortfolio({
                ...editingPortfolio,
                startupBrandName: e.target.value,
              })
            }
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Invested Amount</label>
          <input
            type="number"
            className="form-control"
            value={editingPortfolio.InvestedAmount}
            onChange={(e) =>
              setEditingPortfolio({
                ...editingPortfolio,
                InvestedAmount: e.target.value,
              })
            }
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Investment Date</label>
          <input
            type="date"
            className="form-control"
            // value={Date.substring(0, 10)} // Ensure correct format for date input
            onChange={(e) =>
              setEditingPortfolio({
                ...editingPortfolio,
                InvestmentDate: e.target.value,
              })
            }
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Startup Logo</label>
          <input
            type="file" // Change type to "file" for file uploads
            className="form-control"
            onChange={(e) => setLogoFile(e.target.files[0])} // Handle file selection
            required
          />
           <p className="text-[13px]">Current Logo: {editingPortfolio.StartUpLogo}</p>
        </div>
        <div className="form-group mb-3">
          <label>Startup Country</label>
          <input
            type="text"
            className="form-control"
            value={editingPortfolio.StartUpCountry}
            onChange={(e) =>
              setEditingPortfolio({
                ...editingPortfolio,
                StartUpCountry: e.target.value,
              })
            }
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Startup State</label>
          <input
            type="text"
            className="form-control"
            value={editingPortfolio.StartUpState}
            onChange={(e) =>
              setEditingPortfolio({
                ...editingPortfolio,
                StartUpState: e.target.value,
              })
            }
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Startup City</label>
          <input
            type="text"
            className="form-control"
            value={editingPortfolio.StartUpCity}
            onChange={(e) =>
              setEditingPortfolio({
                ...editingPortfolio,
                StartUpCity: e.target.value,
              })
            }
            required
          />
        </div>
        <Button variant="primary" type="submit">
          Save Changes
        </Button>
      </form>
    </Modal.Body>
  </Modal>
)}


      {/* Modal for Add Portfolio */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Add Portfolio</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form >
          <div className="form-group mb-3">
            <label>Trade Name</label>
            <input
              type="text"
              className="form-control"
              value={newPortfolio.startupTradeName}
              onChange={(e) =>
                setNewPortfolio({
                  ...newPortfolio,
                  startupTradeName: e.target.value,
                })
              }
              required
            />
          </div>
          <div className="form-group mb-3">
            <label>Brand Name</label>
            <input
              type="text"
              className="form-control"
              value={newPortfolio.startupBrandName}
              onChange={(e) =>
                setNewPortfolio({
                  ...newPortfolio,
                  startupBrandName: e.target.value,
                })
              }
              required
            />
          </div>
          <div className="form-group mb-3">
            <label>Invested Amount</label>
            <input
              type="number"
              className="form-control"
              value={newPortfolio.InvestedAmount}
              onChange={(e) =>
                setNewPortfolio({
                  ...newPortfolio,
                  InvestedAmount: e.target.value,
                })
              }
              required
            />
          </div>
          <div className="form-group mb-3">
            <label>Investment Date</label>
            <input
              type="date"
              className="form-control"
              value={newPortfolio.InvestmentDate}
              onChange={(e) =>
                setNewPortfolio({
                  ...newPortfolio,
                  InvestmentDate: e.target.value,
                })
              }
              required
            />
          </div>
          <div className="form-group">
              <label>StartUp Logo</label>
              <input
                type="file"
                className="form-control"
                onChange={(e) => setNewPortfolio({ ...newPortfolio, file: e.target.files[0] })}
                required
              />
            </div>
          <div className="form-group mb-3">
            <label>Startup Country</label>
            <input
              type="text"
              className="form-control"
              value={newPortfolio.StartUpCountry}
              onChange={(e) =>
                setNewPortfolio({
                  ...newPortfolio,
                  StartUpCountry: e.target.value,
                })
              }
              required
            />
          </div>
          <div className="form-group mb-3">
            <label>Startup State</label>
            <input
              type="text"
              className="form-control"
              value={newPortfolio.StartUpState}
              onChange={(e) =>
                setNewPortfolio({
                  ...newPortfolio,
                  StartUpState: e.target.value,
                })
              }
              required
            />
          </div>
          <div className="form-group mb-3">
            <label>Startup City</label>
            <input
              type="text"
              className="form-control"
              value={newPortfolio.StartUpCity}
              onChange={(e) =>
                setNewPortfolio({
                  ...newPortfolio,
                  StartUpCity: e.target.value,
                })
              }
              required
            />
          </div>
          <div className="mb-3">
             <label htmlFor="startupId" className="form-label">
                Select Startup
             </label>
             <select
                className="form-control"
                id="startupId"
                value={newPortfolio.startupId}
                onChange={(e) =>
                  setNewPortfolio({
                    ...newPortfolio,
                    startupId: e.target.value,
                  })
                }
                required
              >
                <option value="">Select a Startup</option>
                {startups.map((startup) => (
                  <option key={startup._id} value={startup._id}>
                    {startup.startupName}
                  </option>
                ))}
              </select>
            </div>
          <Button variant="primary" type="submit">
            Add Portfolio
          </Button>
        </form>
      </Modal.Body>
    </Modal>
    

      {/* Modal for Delete Confirmation */}
      {showConfirmation && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white rounded-lg shadow-lg p-6 w-96">
      <h4 className="text-xl font-bold text-gray-800 mb-4">
        Delete Portfolio
      </h4>
      <p className="text-gray-600 mb-4">
        Are you sure you want to delete this portfolio?
      </p>
      <div className="flex justify-end space-x-2">
        <button
          className="btnn1"
          onClick={handleDeletePortfolio}
        >
          Delete
        </button>
        <button
          className="btnn"
          onClick={handleCancelDelete}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}


      <ToastContainer />
    </>
  );
};

export default InvestorPortfolio;


