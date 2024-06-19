import React, { useState, useEffect } from "react";
// import "./start-up.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams,useLocation } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {
  faList,
  faTableCells,
  faTrashAlt,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { Nav } from "react-bootstrap";
import { BASE_URL } from "../../BASE_URL";

const Startup_team = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [listView, setListView] = useState(true);
  const [partners, setPartners] = useState([]);
  const [newPartnerData, setNewPartnerData] = useState({
    partner_name: "",
    position: "",
    city: "",
    state: "",
    country: "",
    DOB: "",
    file: null,
  });
  const [editingPartner, setEditingPartner] = useState(null);
  const [partnerDetails, setPartnerDetails] = useState(null);

  useEffect(() => {
      fetchData();
  }, []);

  const navigate = useNavigate();
  const { _id } = useParams();

  const fetchData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/Partner/getPartner/${_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
  
      if (!response.ok) {
        throw new Error("Request failed");
      }
  
      const responseData = await response.json();
      console.log("responseData:", responseData);

      setPartners(responseData.data?responseData.data:[]);
  
      console.log("partners:", partners);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Something went wrong!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
    }
  };

  // useEffect(() => {
  //   fetchData();
  // }, []);
  
  
  
  const fetchPartnerDetails = async (partnerId) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/Partner/getPartner/${partnerId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      if (!response.ok) {
        throw new Error("Request failed");
      }
      const responseData = await response.json();
      setPartnerDetails(responseData);
    } catch (error) {
      toast.error("Something went wrong!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
    }
  };

  const handleAddPartner = async (e) => {
    navigate("/addpartner", { state: { _id } });
  };

  const handleEditPartner = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("partner_name", editingPartner.partner_name);
    formData.append("position", editingPartner.position);
    formData.append("city", editingPartner.city);
    formData.append("state", editingPartner.state);
    formData.append("country", editingPartner.country);
    formData.append("DOB", editingPartner.DOB);
    formData.append("file", editingPartner.file_photo);

    try {
      const response = await fetch(
        `${BASE_URL}/api/Partner/EditPartner/${editingPartner._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setEditingPartner(null);
      fetchData();
      toast.success("Partner updated successfully!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
    } catch (error) {
      toast.error("Something went wrong!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
    }
  };

  const handleDeletePartner = async (partnerId) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/Partner/DeletePartner/${partnerId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
  
      if (!response.ok) {
        throw new Error("Request failed");
      }
  
      // Close confirmation modal after successful deletion
      setShowConfirmation(false);
  
      // Update partners list after deletion
      fetchData();
  
      toast.success("Partner deleted successfully!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
    } catch (error) {
      toast.error("Something went wrong!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
    }
  };
  

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  const handleEdit = (partner) => {
    setEditingPartner(partner);
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
                <h6>All Partners</h6>
                <img src="" alt="" />
              </div>
              <div className="d-flex">
                <div className="startup-product-add-button">
                  <button onClick={handleAddPartner}>+ Add Partner</button>
                </div>
                <div className="ms-4">
                  <FontAwesomeIcon
                    icon={faList}
                    className="startup-add-product-icons"
                    onClick={handleListView}
                  />
                  <FontAwesomeIcon
                    icon={faTableCells}
                    className="startup-add-product-icons startup-add-product-icons-2"
                    onClick={handleGridView}
                  />
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
                          <p>Partner Name</p>
                        </div>
                      </div>
                      <div className="pe-5">
                        <div>
                          <p>Position</p>
                        </div>
                      </div>
                      <div className="pe-5">
                        <div>
                          <p>City</p>
                        </div>
                      </div>
                      <div className="pe-5">
                        <div>
                          <p>State</p>
                        </div>
                      </div>
                      <div className="pe-5">
                        <div>
                          <p>Country</p>
                        </div>
                      </div>
                      <div className="pe-5">
                        <div>
                          <p>Date of Birth</p>
                        </div>
                      </div>
                      <div className="pe-5">
                        <div>
                          <p>Actions</p>
                        </div>
                      </div>
                    </div>
                    {partners.map((partner) => (
                      <div
                        key={partner._id}
                        className="product-list-view product-list-view-content d-flex align-item-center"
                      >
                        <div className="">
                          <div className="d-flex align-items-center">
                            <img className="me-3" src={partner.partner_photo} alt="" />
                            <h5 className="mb-0 me-5" style={{ width: "80px" }}>
                              {partner.partner_name}
                            </h5>
                          </div>
                        </div>
                        <div className="">
                          <div className="d-flex align-items-center h-100">
                            <h5 className="ms-3" style={{ width: "80px" }}>
                              {partner.position}
                            </h5>
                          </div>
                        </div>
                        <div className="">
                          <div className="d-flex align-items-center h-100">
                            <h5 className="mb-0 ms-2" style={{ width: "80px" }}>
                              {partner.city}
                            </h5>
                          </div>
                        </div>
                        <div className="">
                          <div className="d-flex align-items-center h-100">
                            <h5 className="mb-0" style={{ width: "80px" }}>
                              {partner.state}
                            </h5>
                          </div>
                        </div>
                        <div className="">
                          <div className="d-flex align-items-center h-100">
                            <h5 className="mb-0 ms-2" style={{ width: "80px" }}>
                            {partner.country}
                            </h5>
                          </div>
                        </div>
                        <div className="">
                          <div className="d-flex align-items-center h-100">
                            <h5 className="mb-0 ms-2" style={{ width: "80px" }}>
                              {new Date(partner.DOB).toLocaleDateString()}
                            </h5>
                          </div>
                        </div>
                        <div className="">
                          <div className="d-flex align-items-center h-100">
                            <FontAwesomeIcon
                              icon={faEdit}
                              className="me-3 cursor-pointer"
                              onClick={() => handleEdit(partner)}
                            />
                            <FontAwesomeIcon
                              icon={faTrashAlt}
                              className="cursor-pointer"
                              onClick={() => {
                                setSelectedPartner(partner._id);
                                setShowConfirmation(true);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="row mt-5">
                {partners.map((partner) => (
                  <div key={partner._id} className="col-md-4 mb-4">
                    <div className="card">
                      <div className="card-body">
                        <div className="d-flex align-items-center mb-3">
                          <img
                            className="me-3"
                            src={partner.partner_photo}
                            alt=""
                            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                          />
                          <h5 className="mb-0">{partner.partner_name}</h5>
                        </div>
                        <p className="mb-1">
                          <strong>Position:</strong> {partner.position}
                        </p>
                        <p className="mb-1">
                          <strong>City:</strong> {partner.city}
                        </p>
                        <p className="mb-1">
                          <strong>State:</strong> {partner.state}
                        </p>
                        <p className="mb-1">
                          <strong>Country:</strong> {partner.country}
                        </p>
                        <p className="mb-1">
                          <strong>Date of Birth:</strong> {new Date(partner.DOB).toLocaleDateString()}
                        </p>
                        <div className="d-flex justify-content-between mt-3">
                          <FontAwesomeIcon
                            icon={faEdit}
                            className="me-3 cursor-pointer"
                            onClick={() => handleEdit(partner)}
                          />
                          <FontAwesomeIcon
                            icon={faTrashAlt}
                            className="cursor-pointer"
                            onClick={() => {
                              setSelectedPartner(partner._id);
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

      {/* Modal for Edit Partner */}
      {editingPartner && (
        <Modal show={true} onHide={() => setEditingPartner(null)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Partner</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleEditPartner}>
              <div className="form-group mb-3">
                <label>Partner Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={editingPartner.partner_name}
                  onChange={(e) =>
                    setEditingPartner({
                      ...editingPartner,
                      partner_name: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label>Position</label>
                <input
                  type="text"
                  className="form-control"
                  value={editingPartner.position}
                  onChange={(e) =>
                    setEditingPartner({
                      ...editingPartner,
                      position: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label>City</label>
                <input
                  type="text"
                  className="form-control"
                  value={editingPartner.city}
                  onChange={(e) =>
                    setEditingPartner({
                      ...editingPartner,
                      city: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label>State</label>
                <input
                  type="text"
                  className="form-control"
                  value={editingPartner.state}
                  onChange={(e) =>
                    setEditingPartner({
                      ...editingPartner,
                      state: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label>Country</label>
                <input
                  type="text"
                  className="form-control"
                  value={editingPartner.country}
                  onChange={(e) =>
                    setEditingPartner({
                      ...editingPartner,
                      country: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label>Date of Birth</label>
                <input
                  type="date"
                  className="form-control"
                  value={editingPartner.DOB}
                  onChange={(e) =>
                    setEditingPartner({
                      ...editingPartner,
                      DOB: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label>Profile Picture</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) =>
                    setEditingPartner({
                      ...editingPartner,
                      file_photo: e.target.files[0],
                    })
                  }
                />
              </div>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </form>
          </Modal.Body>
        </Modal>
      )}

      {/* Modal for Delete Confirmation */}
      <Modal show={showConfirmation} onHide={handleCancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this partner?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDelete}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => handleDeletePartner(selectedPartner)}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Startup_team;

