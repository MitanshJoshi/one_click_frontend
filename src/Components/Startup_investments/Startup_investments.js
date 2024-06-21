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

const Startup_investments = () => {
    const { _id } = useParams();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedInvestment, setSelectedInvestment] = useState(null);
  const [listView, setListView] = useState(true);
  const [investments, setInvestments] = useState([]);
  const [editingInvestment, setEditingInvestment] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
        fetchInvestments();
    }, []);

  const fetchInvestments = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/Investment/getInvestment/${_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
      console.log('id is:',_id);
      
      if (!response.ok) {
        throw new Error("Failed to fetch investments");
      }

      const responseData = await response.json();
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

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  const handleEdit = (investment) => {
    setEditingInvestment(investment);
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
                <h6>All Investments</h6>
                <img src="" alt="" />
              </div>
              <div className="d-flex">
                <div className="startup-product-add-button">
                  <button onClick={handleAddInvestment}>+ Add Investment</button>
                </div>
              </div>
            </div>

            {listView ? (
              <>
                <div className="mt-5">
                  <div>
                    <div className="product-list-view d-flex align-item-center justify-content-between">
                      <div className="pe-5 ">
                        <div>
                          <p>Investor Name</p>
                        </div>
                      </div>
                      <div className="pe-5">
                        <div>
                          <p>Investment Amount</p>
                        </div>
                      </div>
                      <div className="pe-5">
                        <div>
                          <p>Date Available</p>
                        </div>
                      </div>
                      <div className="pe-5">
                        <div>
                          <p>Other Details</p>
                        </div>
                      </div>
                      <div className="pe-5">
                        <div>
                          <p>Actions</p>
                        </div>
                      </div>
                    </div>
                    {investments.map((investment) => (
                      <div
                        key={investment._id}
                        className="product-list-view product-list-view-content d-flex align-item-center"
                      >
                        <div className="">
                          <h5 className="mb-0 me-5" style={{ width: "150px" }}>
                            {investment.investor_name}
                          </h5>
                        </div>
                        <div className="">
                          <h5 className="ms-3" style={{ width: "80px" }}>
                            {investment.investment_amount}
                          </h5>
                        </div>
                        <div className="">
                          <h5 className="mb-0 ms-2" style={{ width: "180px" }}>
                            {new Date(investment.date_when_available).toLocaleDateString()}
                          </h5>
                        </div>
                        <div className="">
                          <h5 className="mb-0" style={{ width: "100px" }}>
                            {investment.other_details}
                          </h5>
                        </div>
                        <div className="">
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
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            </form>
          </Modal.Body>
        </Modal>
      )}

      {/* Confirmation Modal for Deletion */}
      <Modal show={showConfirmation} onHide={handleCancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this investment?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteInvestment}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Startup_investments;
