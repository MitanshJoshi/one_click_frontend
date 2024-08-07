import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast, ToastContainer } from "react-toastify";
import { useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { faList, faTrashAlt, faEdit, faTableCells } from "@fortawesome/free-solid-svg-icons";
import { BASE_URL } from "../../BASE_URL";

const Startup_grant = () => {
  const { _id } = useParams();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedGrant, setSelectedGrant] = useState(null);
  const [listView, setListView] = useState(true);
  const [grants, setGrants] = useState([]);
  const [activeView, setActiveView] = useState('list'); 
  const [editingGrant, setEditingGrant] = useState(null);
  const [investorToken, setinvestorToken] = useState(localStorage.getItem("investorToken"));
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchGrants();
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

  const fetchGrants = async () => {
    const token=investorToken?localStorage.getItem("investorToken"):localStorage.getItem("token");
    try {
      const response = await fetch(`${BASE_URL}/api/Grant/getGrant/${_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch grants");
      }

      const responseData = await response.json();
      setGrants(responseData.grants);
    } catch (error) {
      console.error("Error fetching grants:", error);
      toast.error("Something went wrong!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
    }
  };

  const handleAddGrant = () => {
    navigate("/addgrant", { state: { _id } });
  };

  const handleEditGrant = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${BASE_URL}/api/Grant/EditGrant/${editingGrant._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editingGrant),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to edit grant");
      }

      setEditingGrant(null);
      fetchGrants();
      toast.success("Grant updated successfully!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
    } catch (error) {
      console.error("Error editing grant:", error);
      toast.error("Something went wrong!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
    }
  };

  const handleDeleteGrant = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/Grant/deleteGrant/${selectedGrant}`,
        {
          method: "DELETE",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete grant");
      }

      setShowConfirmation(false);
      fetchGrants();
      toast.success("Grant deleted successfully!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
    } catch (error) {
      console.error("Error deleting grant:", error);
      toast.error("Something went wrong!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

const handleEdit = (grant) => {
  // const navigate = useNavigate();
  navigate(`/editgrant/${grant._id}`); // Example assuming grantId is passed
};

  const handleListView = () => {
    setListView(true);
    setActiveView("list")
  };

  const handleGridView = () => {
    setListView(false);
    setActiveView("grid");
  };

  return (
    <>
      <section className="mt-5">
        {/* <ToastContainer /> */}
        <div className="startup-products">
          <div>
            <div
              className="d-flex justify-content-between "
              style={{ marginTop: "40px" }}
            >
              <div className="startup-products-header">
                <h6>All Grants</h6>
                <img src="" alt="" />
              </div>
              <div className="d-flex">
               {!investorToken? <div className="startup-product-add-button">
                  <button onClick={handleAddGrant}>+ Add Grant</button>
                </div>:<></>}
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
                    <div className="product-list-view d-flex align-item-center justify-content-between">
                      <div className="product-info ">
                        <div>
                          <p>Grant Name</p>
                        </div>
                      </div>
                      <div className="product-info">
                        <div>
                          <p>Grant Amount</p>
                        </div>
                      </div>
                      <div className="product-info">
                        <div>
                          <p>Date Available</p>
                        </div>
                      </div>
                      <div className="product-info">
                        <div>
                          <p>Grant From</p>
                        </div>
                      </div>
                      {!investorToken?<div className="product-info">
                        <div>
                          <p>Actions</p>
                        </div>
                      </div>:<></>}
                    </div>
                    {grants.map((grant) => (
                      <div
                        key={grant._id}
                        className="product-list-view product-list-view-content d-flex align-item-center"
                      >
                        <div className="product-info">
                          <h5 className="" style={{ width: "" }}>
                            {grant.grant_name}
                          </h5>
                        </div>
                        <div className="product-info">
                          <h5 className="">
                            {grant.grant_amount}
                          </h5>
                        </div>
                        <div className="product-info">
                          <h5 className="mb-0 ">
                            {new Date(grant.date_when_available).toLocaleDateString()}
                          </h5>
                        </div>
                        <div className="product-info">
                          <h5 className="mb-0" >
                            {grant.grant_from}
                          </h5>
                        </div>
                       {!investorToken? <div className="product-info">
                        <div className="d-flex justify-center items-center h-100">
                          <FontAwesomeIcon
                            icon={faEdit}
                            className="me-3 cursor-pointer"
                            onClick={() => handleEdit(grant)}
                          />
                          <FontAwesomeIcon
                            icon={faTrashAlt}
                            className="cursor-pointer"
                            onClick={() => {
                              setSelectedGrant(grant._id);
                              setShowConfirmation(true);
                            }}
                          />
                        </div>
                        </div>:<></>}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="row mt-5">
                {grants.map((grant) => (
                  <div key={grant._id} className="col-md-4 mb-4">
                    <div className="card">
                      <div className="card-body">
                        <div className="flex justify-between items-center">
                        <h5 className="mb-1">{grant.grant_name}</h5>
                        {!investorToken?<div className="d-flex mt-3 items-center justify-center">
                          <FontAwesomeIcon
                            icon={faEdit}
                            className="me-3 cursor-pointer"
                            onClick={() => handleEdit(grant)}
                          />
                          <FontAwesomeIcon
                            icon={faTrashAlt}
                            className="cursor-pointer"
                            onClick={() => {
                              setSelectedGrant(grant._id);
                              setShowConfirmation(true);
                            }}
                          />
                        </div>:<></>}
                        </div>
                        <p className="mb-1">
                          <strong>Grant Amount:</strong> {grant.grant_amount}
                        </p>
                        <p className="mb-1">
                          <strong>Date Available:</strong>{" "}
                          {new Date(grant.date_when_available).toLocaleDateString()}
                        </p>
                        <p className="mb-1">
                          <strong>Grant From:</strong> {grant.grant_from}
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

      {/* Modal for Edit Grant */}
      {editingGrant && (
        <Modal show={true} onHide={() => setEditingGrant(null)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Grant</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleEditGrant}>
              <div className="form-group mb-3">
                <label>Grant Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={editingGrant.grant_name}
                  onChange={(e) =>
                    setEditingGrant({
                      ...editingGrant,
                      grant_name: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label>Grant Amount</label>
                <input
                  type="number"
                  className="form-control"
                  value={editingGrant.grant_amount}
                  onChange={(e) =>
                    setEditingGrant({
                      ...editingGrant,
                      grant_amount: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label>Date Available</label>
                <input
                  type="date"
                  className="form-control"
                  value={new Date(editingGrant.date_when_available).toISOString().substring(0, 10)}
                  onChange={(e) =>
                    setEditingGrant({
                      ...editingGrant,
                      date_when_available: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label>Grant From</label>
                <input
                  type="text"
                  className="form-control"
                  value={editingGrant.grant_from}
                  onChange={(e) =>
                    setEditingGrant({
                      ...editingGrant,
                      grant_from: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="startup-product-add-button">
              <Button type="submit">
                Save Changes
              </Button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      )}

      {/* Modal for Delete Confirmation */}
      {showConfirmation && (
        <div className="confirmation-modal">
          <div className="confirmation-content">
            <h1 className="confirmation-message">
              Are you sure you want to delete this Grant?
            </h1>
            <div className="buttons-container">
              <button className="btng" onClick={handleDeleteGrant}>Yes</button>
              <button className="btnr" onClick={handleCancelDelete}>No</button>
            </div>
          </div>
        </div>
      )}
      {/* <Modal show={showConfirmation} onHide={handleCancelDelete}>
        <Modal.Header className="">
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body className="mb-3">Are you sure you want to delete this grant?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteGrant}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal> */}
    </>
  );
};

export default Startup_grant;
