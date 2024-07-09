import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { faList, faTableCells, faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import { BASE_URL } from "../../BASE_URL";

const Startup_team = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [listView, setListView] = useState(true);
  const [partners, setPartners] = useState([]);
  const [editingPartner, setEditingPartner] = useState(null);
  const [partnerDetails, setPartnerDetails] = useState(null);
  const [activeView, setActiveView] = useState('list'); 
 const [investorToken, setinvestorToken] = useState(localStorage.getItem("investorToken"))
  const navigate = useNavigate();
  const { _id } = useParams();

  const listStyle = {
    background: 'linear-gradient(to bottom, #9ad1a0, #00818a)',
};

const gridStyle = {
    background: 'linear-gradient(to bottom, #9ad1a0, #00818a)',
};

const inactiveStyle = {
    background: 'linear-gradient(to bottom, #c8dbca, #a4c7c9)',
};


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const token=investorToken?localStorage.getItem("investorToken"):localStorage.getItem("token");
    try {
      const response = await fetch(`${BASE_URL}/api/Partner/getPartner/${_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const responseData = await response.json();
      setPartners(responseData.data ? responseData.data : []);
    } catch (error) {
      // console.error("Error fetching data:", error);
      // toast.error("Something went wrong!", {
      //   position: toast.POSITION.BOTTOM_RIGHT,
      //   autoClose: 1000,
      // });
    }
  };

  const handleAddPartner = async () => {
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
      const response = await fetch(`${BASE_URL}/api/Partner/EditPartner/${editingPartner._id}`, {
        method: "PUT",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        body: formData,
      });

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
      const response = await fetch(`${BASE_URL}/api/Partner/DeletePartner/${partnerId}`, {
        method: "DELETE",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setShowConfirmation(false);
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
    navigate("/partnerEdit", { state: { _id, id: partner._id } });
  };

  const handleListView = () => {
    setActiveView('list');
    setListView(true);
  };

  const handleGridView = () => {
    setActiveView('grid');
    setListView(false);
  };

  return (
    <>
      <section className="mt-5">
        <ToastContainer />
        <div className="startup-products">
          <div>
            <div className="d-flex justify-content-between" style={{ marginTop: "40px" }}>
              <div className="startup-products-header">
                <h6>All Partners</h6>
              </div>
              <div className="d-flex">
               {!investorToken? <div className="startup-product-add-button">
                  <button onClick={handleAddPartner}>+ Add Partner</button>
                </div>:<></>}
                <div className="ms-4">
                  <FontAwesomeIcon
                    icon={faList}
                    className="startup-add-product-icons"
                    onClick={handleListView}
                    style={activeView === 'list' ? listStyle : inactiveStyle}
                  />
                  <FontAwesomeIcon
                    icon={faTableCells}
                    className="startup-add-product-icons startup-add-product-icons-2"
                    onClick={handleGridView}
                    style={activeView === 'grid' ? gridStyle : inactiveStyle}
                  />
                </div>
              </div>
            </div>

            {listView ? (
              <div className="mt-5">
                <div>
                  <div className="product-list-view d-flex align-item-center justify-content-between">
                    <div className="pe-5">
                      <p>Partner Name</p>
                    </div>
                    <div className="pe-5">
                      <p>Position</p>
                    </div>
                    <div className="pe-5">
                      <p>City</p>
                    </div>
                    <div className="pe-5">
                      <p>State</p>
                    </div>
                    <div className="pe-5">
                      <p>Country</p>
                    </div>
                    <div className="pe-5">
                      <p>Date of Birth</p>
                    </div>
                    {!investorToken?<div className="pe-5">
                      <p>Actions</p>
                    </div>:<></>}
                  </div>
                  {partners.map((partner) => (
                    <div key={partner._id} className="product-list-view product-list-view-content d-flex align-item-center">
                      <div>
                        <div className="d-flex align-items-center">
                          <h5 className="mb-0 me-5" style={{ width: "80px" }}>
                            {partner.partner_name}
                          </h5>
                        </div>
                      </div>
                      <div className="ml-[-52px] text-end">
                        <div className="d-flex align-items-center h-100">
                          <h5 className="" style={{ width: "80px" }}>
                            {partner.position}
                          </h5>
                        </div>
                      </div>
                      <div>
                        <div className="d-flex align-items-center h-100">
                          <h5 className="mb-0" style={{ width: "80px" }}>
                            {partner.city}
                          </h5>
                        </div>
                      </div>
                      <div>
                        <div className="d-flex align-items-center h-100">
                          <h5 className="mb-0" style={{ width: "80px" }}>
                            {partner.state}
                          </h5>
                        </div>
                      </div>
                      <div>
                        <div className="d-flex align-items-center h-100">
                          <h5 className="mb-0" style={{ width: "80px" }}>
                            {partner.country}
                          </h5>
                        </div>
                      </div>
                      <div className="w-[110px]">
                        <div className="d-flex align-items-center h-100">
                          <h5 className="mb-0" style={{ width: "80px" }}>
                            {new Date(partner.DOB).toLocaleDateString()}
                          </h5>
                        </div>
                      </div>
                      {!investorToken?<div className="w-[95px]">
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
                      </div>:<></>}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="row mt-5">
                {partners.map((partner) => (
                  <div key={partner._id} className="col-md-4 mb-4">
                    <div className="card">
                      <div className="card-body">
                        <div className="d-flex align-items-center mb-3 justify-between">
                          <div className="flex justify-center items-center">
                          <img
                            className="me-3"
                            src={partner.partner_photo}
                            alt=""
                            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                          />
                          <h5 className="mb-0">{partner.partner_name}</h5>
                          </div>
                          {!investorToken?<div className="d-flex">
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
                        </div>:<></>}
                        </div>
                        <p>Position: {partner.position}</p>
                        <p>City: {partner.city}</p>
                        <p>State: {partner.state}</p>
                        <p>Country: {partner.country}</p>
                        <p>Date of Birth: {new Date(partner.DOB).toLocaleDateString()}</p>
                        
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
      {showConfirmation && (
        <div className="confirmation-modal">
          <div className="confirmation-content">
            <h1 className="confirmation-message">
              Are you sure you want to delete this Partner?
            </h1>
            <div className="buttons-container">
              <button className="btng" onClick={() => handleDeletePartner(selectedPartner)}>Yes</button>
              <button className="btnr" onClick={handleCancelDelete}>No</button>
            </div>
          </div>
        </div>
      )}

      {/* <Modal show={showConfirmation} onHide={handleCancelDelete}>

        <Modal.Body className="pt-3">Are you sure you want to delete this partner?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDeletePartner(selectedPartner)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal> */}
    </>
  );
};

export default Startup_team;
