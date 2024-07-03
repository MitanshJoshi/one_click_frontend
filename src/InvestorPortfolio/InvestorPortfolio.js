// import React, { useState, useEffect } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEdit,faTrashAlt } from "@fortawesome/free-regular-svg-icons";
// import { toast, ToastContainer } from "react-toastify";
// import Modal from "react-bootstrap/Modal";
// import Button from "react-bootstrap/Button";
// import { BASE_URL } from "../BASE_URL";

// const InvestorPortfolio = () => {
//   const [showConfirmation, setShowConfirmation] = useState(false);
//   const [selectedPortfolio, setSelectedPortfolio] = useState(null);
//   const [logoFile, setLogoFile] = useState(null);
//   const [listView, setListView] = useState(true);
//   const [portfolios, setPortfolios] = useState([]);
//   const [editingPortfolio, setEditingPortfolio] = useState(null);
//   const [newPortfolio, setNewPortfolio] = useState({
//     startupTradeName: "",
//     startupBrandName: "",
//     InvestedAmount: "",
//     InvestmentDate: new Date().toISOString().split("T")[0],
//     file: null,
//     StartUpCountry: "",
//     StartUpState: "",
//     StartUpCity: "",
//     startupId: "", // New state for selected startup ID
//   });
//   const [startups, setStartups] = useState([]); // State for startup names

//   const [showAddModal, setShowAddModal] = useState(false);

//   useEffect(() => {
//     fetchPortfolios();
//     fetchStartupNames(); // Fetch startup names when component mounts
//   }, []);

//   const fetchPortfolios = async () => {
//     try {
//       const response = await fetch(`${BASE_URL}/api/investorPortfolio/getPortfolio`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: localStorage.getItem("investorToken"),
//         },
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch portfolios");
//       }

//       const responseData = await response.json();
//       setPortfolios(responseData.portfolio);
//     } catch (error) {
//       console.error("Error fetching portfolios:", error);
//       toast.error("Something went wrong!", {
//         position: toast.POSITION.BOTTOM_RIGHT,
//         autoClose: 1000,
//       });
//     }
//   };

//   const fetchStartupNames = async () => {
//     try {
//       const response = await fetch(`${BASE_URL}/api/startup/getAllStartup`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: localStorage.getItem("investorToken"),
//         },
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch startup names");
//       }

//       const responseData = await response.json();
//       console.log('resp',responseData);
      
//       setStartups(responseData.startups);
//     } catch (error) {
//       console.error("Error fetching startup names:", error);
//       toast.error("Something went wrong!", {
//         position: toast.POSITION.BOTTOM_RIGHT,
//         autoClose: 1000,
//       });
//     }
//   };

//   const handleAddPortfolioSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const formData = new FormData();
//       formData.append("startupTradeName", newPortfolio.startupTradeName);
//       formData.append("startupBrandName", newPortfolio.startupBrandName);
//       formData.append("InvestedAmount", newPortfolio.InvestedAmount);
//       formData.append("InvestmentDate", newPortfolio.InvestmentDate);
//       formData.append("InvestorId", localStorage.getItem("userid"));
//       formData.append("startupId", newPortfolio.startupId); // Use selected startup ID
//       formData.append("file", newPortfolio.file);
//       formData.append("StartUpCountry", newPortfolio.StartUpCountry);
//       formData.append("StartUpState", newPortfolio.StartUpState);
//       formData.append("StartUpCity", newPortfolio.StartUpCity);

//       const response = await fetch(`${BASE_URL}/api/investorPortfolio/addPortfolio`, {
//         method: "POST",
//         headers: {
//           Authorization: localStorage.getItem("investorToken"),
//         },
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error("Failed to add portfolio");
//       }

//       setShowAddModal(false);
//       fetchPortfolios();
//       toast.success("Portfolio added successfully!", {
//         position: toast.POSITION.BOTTOM_RIGHT,
//         autoClose: 1000,
//       });
//     } catch (error) {
//       console.error("Error adding portfolio:", error);
//       toast.error("Something went wrong!", {
//         position: toast.POSITION.BOTTOM_RIGHT,
//         autoClose: 1000,
//       });
//     }
//   };

//   const handleEditPortfolio = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(
//         `${BASE_URL}/api/investorPortfolio/updatePortfolio/${editingPortfolio._id}`,
//         {
//           method: "PUT",
//           headers: {
//             Authorization: localStorage.getItem("investorToken"),
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(editingPortfolio),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to edit portfolio");
//       }

//       setEditingPortfolio(null);
//       fetchPortfolios();
//       toast.success("Portfolio updated successfully!", {
//         position: toast.POSITION.BOTTOM_RIGHT,
//         autoClose: 1000,
//       });
//     } catch (error) {
//       console.error("Error editing portfolio:", error);
//       toast.error("Something went wrong!", {
//         position: toast.POSITION.BOTTOM_RIGHT,
//         autoClose: 1000,
//       });
//     }
//   };

//   const handleDeletePortfolio = async () => {
//     try {
//       const response = await fetch(
//         `${BASE_URL}/api/investorPortfolio/deletePortfolio/${selectedPortfolio}`,
//         {
//           method: "DELETE",
//           headers: {
//             Authorization: localStorage.getItem("investorToken"),
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to delete portfolio");
//       }

//       setShowConfirmation(false);
//       fetchPortfolios();
//       toast.success("Portfolio deleted successfully!", {
//         position: toast.POSITION.BOTTOM_RIGHT,
//         autoClose: 1000,
//       });
//     } catch (error) {
//       console.error("Error deleting portfolio:", error);
//       toast.error("Something went wrong!", {
//         position: toast.POSITION.BOTTOM_RIGHT,
//         autoClose: 1000,
//       });
//     }
//   };

//   const handleEdit = (portfolio) => {
//     setEditingPortfolio(portfolio);
//   };

//   const handleListView = () => {
//     setListView(true);
//   };

//   const handleGridView = () => {
//     setListView(false);
//   };

//   return (
//     <>
//       <section className="mt-sm-5 mt-4">
//         <div className="startup-products">
//           <div>
//             <div
//               className="d-flex justify-content-between "
//               style={{ marginTop: "40px" }}
//             >
//               <div className="startup-products-header ml-[90px]">
//                 <h6>All Portfolios</h6>
//               </div>
//               <div className="d-flex">
//                 <div className="startup-product-add-button">
//                   <button onClick={() => setShowAddModal(true)}>+ Add Portfolio</button>
//                 </div>
//               </div>
//             </div>

//             {listView ? (
//               <>
//                 <div className="mt-5">
//                   <div className="tab-container-maintain">
//                     <div className="product-list-view d-flex align-item-center justify-content-between">
//                       <div className="pe-5">
//                         <div>
//                           <p>Trade Name</p>
//                         </div>
//                       </div>
//                       <div className="pe-5">
//                         <div>
//                           <p>Brand Name</p>
//                         </div>
//                       </div>
//                       <div className="pe-5">
//                         <div>
//                           <p>Invested Amount</p>
//                         </div>
//                       </div>
//                       <div className="pe-5">
//                         <div>
//                           <p>Investment Date</p>
//                         </div>
//                       </div>
//                       <div className="pe-5">
//                         <div>
//                           <p>Actions</p>
//                         </div>
//                       </div>
//                     </div>
//                     {portfolios.map((portfolio) => (
//                       <div
//                         key={portfolio._id}
//                         className="product-list-view product-list-view-content d-flex align-item-center"
//                       >
//                         <div className="">
//                           <h5 className="mb-0 me-5">
//                             {portfolio.startupTradeName}
//                           </h5>
//                         </div>
//                         <div className="">
//                           <h5 className="ms-3">{portfolio.startupBrandName}</h5>
//                         </div>
//                         <div className="">
//                           <h5 className="mb-0 ms-2">{portfolio.InvestedAmount}</h5>
//                         </div>
//                         <div className="">
//                           <h5 className="mb-0">
//                             {new Date(portfolio.InvestmentDate).toLocaleDateString()}
//                           </h5>
//                         </div>
//                         <div className="w-[95px]">
//                           <FontAwesomeIcon
//                             icon={faEdit}
//                             className="me-3 cursor-pointer"
//                             onClick={() => handleEdit(portfolio)}
//                           />
//                           <FontAwesomeIcon
//                             icon={faTrashAlt}
//                             className="cursor-pointer"
//                             onClick={() => {
//                               setSelectedPortfolio(portfolio._id);
//                               setShowConfirmation(true);
//                             }}
//                           />
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </>
//             ) : (
//               <>
//                 <div className="mt-5">
//                   <div className="d-flex flex-wrap justify-content-between">
//                     {portfolios.map((portfolio) => (
//                       <div
//                         key={portfolio._id}
//                         className="card startup-product-card mb-4"
//                       >
//                         <div className="card-body">
//                           <div className="d-flex align-items-center justify-content-between">
//                             <div className="product-card-info">
//                               <h5 className="mb-0">
//                                 {portfolio.startupTradeName}
//                               </h5>
//                               <p>{portfolio.startupBrandName}</p>
//                               <p>{portfolio.InvestedAmount}</p>
//                               <p>
//                                 {new Date(portfolio.InvestmentDate).toLocaleDateString()}
//                               </p>
//                             </div>
//                             <div className="product-card-actions">
//                               <FontAwesomeIcon
//                                 icon={faEdit}
//                                 className="me-3 cursor-pointer"
//                                 onClick={() => handleEdit(portfolio)}
//                               />
//                               <FontAwesomeIcon
//                                 icon={faTrashAlt}
//                                 className="cursor-pointer"
//                                 onClick={() => {
//                                   setSelectedPortfolio(portfolio._id);
//                                   setShowConfirmation(true);
//                                 }}
//                               />
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </section>

//       {/* Add Portfolio Modal */}
//       <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Add Portfolio</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <form onSubmit={handleAddPortfolioSubmit}>
//             <div className="mb-3">
//               <label htmlFor="startupTradeName" className="form-label">
//                 Trade Name
//               </label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="startupTradeName"
//                 value={newPortfolio.startupTradeName}
//                 onChange={(e) =>
//                   setNewPortfolio({
//                     ...newPortfolio,
//                     startupTradeName: e.target.value,
//                   })
//                 }
//                 required
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="startupBrandName" className="form-label">
//                 Brand Name
//               </label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="startupBrandName"
//                 value={newPortfolio.startupBrandName}
//                 onChange={(e) =>
//                   setNewPortfolio({
//                     ...newPortfolio,
//                     startupBrandName: e.target.value,
//                   })
//                 }
//                 required
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="InvestedAmount" className="form-label">
//                 Invested Amount
//               </label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="InvestedAmount"
//                 value={newPortfolio.InvestedAmount}
//                 onChange={(e) =>
//                   setNewPortfolio({
//                     ...newPortfolio,
//                     InvestedAmount: e.target.value,
//                   })
//                 }
//                 required
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="InvestmentDate" className="form-label">
//                 Investment Date
//               </label>
//               <input
//                 type="date"
//                 className="form-control"
//                 id="InvestmentDate"
//                 value={newPortfolio.InvestmentDate}
//                 onChange={(e) =>
//                   setNewPortfolio({
//                     ...newPortfolio,
//                     InvestmentDate: e.target.value,
//                   })
//                 }
//                 required
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="startupId" className="form-label">
//                 Select Startup
//               </label>
//               <select
//                 className="form-control"
//                 id="startupId"
//                 value={newPortfolio.startupId}
//                 onChange={(e) =>
//                   setNewPortfolio({
//                     ...newPortfolio,
//                     startupId: e.target.value,
//                   })
//                 }
//                 required
//               >
//                 <option value="">Select a Startup</option>
//                 {startups.map((startup) => (
//                   <option key={startup._id} value={startup._id}>
//                     {startup.startupName}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="mb-3">
//               <label htmlFor="file" className="form-label">
//                 Upload Logo
//               </label>
//               <input
//                 type="file"
//                 className="form-control"
//                 id="file"
//                 onChange={(e) => setLogoFile(e.target.files[0])}
//                 required
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="StartUpCountry" className="form-label">
//                 Country
//               </label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="StartUpCountry"
//                 value={newPortfolio.StartUpCountry}
//                 onChange={(e) =>
//                   setNewPortfolio({
//                     ...newPortfolio,
//                     StartUpCountry: e.target.value,
//                   })
//                 }
//                 required
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="StartUpState" className="form-label">
//                 State
//               </label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="StartUpState"
//                 value={newPortfolio.StartUpState}
//                 onChange={(e) =>
//                   setNewPortfolio({
//                     ...newPortfolio,
//                     StartUpState: e.target.value,
//                   })
//                 }
//                 required
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="StartUpCity" className="form-label">
//                 City
//               </label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="StartUpCity"
//                 value={newPortfolio.StartUpCity}
//                 onChange={(e) =>
//                   setNewPortfolio({
//                     ...newPortfolio,
//                     StartUpCity: e.target.value,
//                   })
//                 }
//                 required
//               />
//             </div>
//             <div className="mb-3 text-center">
//               <button type="submit" className="btn btn-primary">
//                 Add Portfolio
//               </button>
//             </div>
//           </form>
//         </Modal.Body>
//       </Modal>

//       {/* Confirmation Modal */}
//       <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Delete Portfolio</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p>Are you sure you want to delete this portfolio?</p>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowConfirmation(false)}>
//             Cancel
//           </Button>
//           <Button variant="danger" onClick={handleDeletePortfolio}>
//             Delete
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       <ToastContainer />
//     </>
//   );
// };

// export default InvestorPortfolio;
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { faList, faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { BASE_URL } from "../BASE_URL";

const InvestorPortfolio = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [logoFile, setLogoFile] = useState(null); // State for logo file
  const [listView, setListView] = useState(true);
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
    // Reset the form state for adding a new portfolio
    setNewPortfolio({
      startupTradeName: "",
      startupBrandName: "",
      InvestedAmount: "",
      startupId:"",
      InvestorId:"",
      InvestmentDate: new Date().toISOString().split("T")[0], // Today's date
      file: null,
      StartUpCountry: "",
      StartUpState: "",
      StartUpCity: "",
    });
    setShowAddModal(true);
  };

  const handleAddPortfolioSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("startupTradeName", newPortfolio.startupTradeName);
      formData.append("startupBrandName", newPortfolio.startupBrandName);
      formData.append("InvestedAmount", newPortfolio.InvestedAmount);
      formData.append("InvestmentDate", newPortfolio.InvestmentDate);
      formData.append("InvestorId", localStorage.getItem("userid"));
      formData.append("startupId", newPortfolio.startupId);
      formData.append("file", newPortfolio.file);
      formData.append("StartUpCountry", newPortfolio.StartUpCountry);
      formData.append("StartUpState", newPortfolio.StartUpState);
      formData.append("StartUpCity", newPortfolio.StartUpCity);

      const response = await fetch(`${BASE_URL}/api/investorPortfolio/addPortfolio`, {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("investorToken"),
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to add portfolio");
      }

      setShowAddModal(false);
      fetchPortfolios();
      toast.success("Portfolio added successfully!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
    } catch (error) {
      console.error("Error adding portfolio:", error);
      toast.error("Something went wrong!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
    }
  };

  const handleEditPortfolio = async (e) => {
    e.preventDefault();
    try{
      const response = await fetch(
        `${BASE_URL}/api/investorPortfolio/updatePortfolio/${editingPortfolio._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: localStorage.getItem("investorToken"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editingPortfolio),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to edit portfolio");
      }

      setEditingPortfolio(null);
      fetchPortfolios();
      toast.success("Portfolio updated successfully!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
    } catch (error) {
      console.error("Error editing portfolio:", error);
      toast.error("Something went wrong!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
    }
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

  const handleListView = () => {
    setListView(true);
  };

  const handleGridView = () => {
    setListView(false);
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
              <div className="startup-products-header ml-[90px]">
                <h6>All Portfolios</h6>
              </div>
              <div className="d-flex">
                <div className="startup-product-add-button">
                  <button onClick={handleAddPortfolio}>+ Add Portfolio</button>
                </div>
              </div>
            </div>

            {listView ? (
              <>
                <div className="mt-5">
                  <div className="tab-container-maintain">
                    <div className="product-list-view d-flex align-item-center justify-content-between">
                      <div className="pe-5">
                        <div>
                          <p>Trade Name</p>
                        </div>
                      </div>
                      <div className="pe-5">
                        <div>
                          <p>Brand Name</p>
                        </div>
                      </div>
                      <div className="pe-5">
                        <div>
                          <p>Invested Amount</p>
                        </div>
                      </div>
                      <div className="pe-5">
                        <div>
                          <p>Investment Date</p>
                        </div>
                      </div>
                      <div className="pe-5">
                        <div>
                          <p>Actions</p>
                        </div>
                      </div>
                    </div>
                    {portfolios.map((portfolio) => (
                      <div
                        key={portfolio._id}
                        className="product-list-view product-list-view-content d-flex align-item-center"
                      >
                        <div className="">
                          <h5 className="mb-0 me-5">
                            {portfolio.startupTradeName}
                          </h5>
                        </div>
                        <div className="">
                          <h5 className="ms-3">{portfolio.startupBrandName}</h5>
                        </div>
                        <div className="">
                          <h5 className="mb-0 ms-2">{portfolio.InvestedAmount}</h5>
                        </div>
                        <div className="">
                          <h5 className="mb-0">
                            {new Date(portfolio.InvestmentDate).toLocaleDateString()}
                          </h5>
                        </div>
                        <div className="w-[95px]">
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
                        <h5 className="mb-1">{portfolio.startupTradeName}</h5>
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
                        <div className="d-flex justify-content-between mt-3">
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
            value={editingPortfolio.InvestmentDate.substring(0, 10)} // Ensure correct format for date input
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
        <form onSubmit={handleAddPortfolioSubmit}>
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
      <Modal show={showConfirmation} onHide={handleCancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Portfolio</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this portfolio?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeletePortfolio}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </>
  );
};

export default InvestorPortfolio;


