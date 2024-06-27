import React, { useState, useEffect } from "react";
import "./supplier-full-detail.css";
import SecondNavbar from "../Navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import ReviewList from "../Review-list/ReviewList";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Supplier_full_detail = ({ onShoesChange }) => {
  const [id, setId] = useState("");
  const [startupId, setStartupId] = useState(onShoesChange.shoes.startup._id);
  const [startup, setStartup] = useState({});
  const [more, setMore] = useState([]);
  const [awards, setAwards] = useState([]);
  const [grants, setGrants] = useState([]);
  const [investments, setInvestments] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [activeTab, setActiveTab] = useState("product"); // State for active tab

  const navigate = useNavigate();

  const handleInquiry = () => {
    navigate("/inquiryform", { state: { id: id, startUpId: startupId } });
  };

  useEffect(() => {
    const fetchStartupDetails = async () => {
      try {
        const response = await axios.get(
          `https://oneclick-sfu6.onrender.com/api/startup/displaydetail?startupId=${startupId}`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        const startupData = response.data.data[0];
        setStartup(startupData);
        setMore(startupData.product || []);
        setAwards(startupData.award || []);
        setGrants(startupData.grant || []);
        setInvestments(startupData.investment || []);
        setTeamMembers(startupData.partner || []);
        setId(onShoesChange._id);
      } catch (error) {
        console.error("Error fetching startup details:", error);
      }
    };

    fetchStartupDetails();
  }, [startupId, onShoesChange]);

  return (
    <div>
      <SecondNavbar />
      <section className="mt-5">
        <div className="container">
          <div>
            <div className="row">
              <div className="col-4">
                <div>
                  <div>
                    <div className="supplier-full-detail">
                      <div>
                        <div className="about-supplier-title-photo">
                          <img
                            src="./supplier-1.png"
                            alt=""
                            className="img-fluid"
                          />
                        </div>
                        <div className="supplier-follow-buttons mt-3">
                          <button>Follow</button>
                        </div>
                        <div className="supplier-details-info mt-4">
                          <div className="mb-3">
                            <h4>{startup.startupName}</h4>
                          </div>
                          <div className="mb-2 d-flex justify-content-between">
                            <h6 className="mb-0">Phone Number</h6>
                            <p className="mb-0">{startup.contactNumber}</p>
                          </div>
                          <div className="mb-2 d-flex justify-content-between">
                            <h6 className="mb-0">Email Id</h6>
                            <p className="mb-0">{startup.email}</p>
                          </div>
                          <div className="mb-2 d-flex justify-content-between">
                            <h6 className="mb-0">Name</h6>
                            <p className="mb-0">{startup.contactPerson}</p>
                          </div>
                          <div className="mb-2 d-flex justify-content-between">
                            <h6 className="mb-0">Address</h6>
                            <p className="mb-0">{startup.address}</p>
                          </div>
                          <div className="mb-2 d-flex justify-content-between">
                            <h6 className="mb-0">State</h6>
                            <p className="mb-0">{startup.state}</p>
                          </div>
                          <div className="mb-2 d-flex justify-content-between">
                            <h6 className="mb-0">Pincode</h6>
                            <p className="mb-0">{startup.pincode}</p>
                          </div>
                          <div className="mb-2 d-flex justify-content-between">
                            <h6 className="mb-0">Category</h6>
                            <p className="mb-0">
                              {startup.category &&
                                startup.category[0] &&
                                startup.category[0].name}
                            </p>
                          </div>
                          <div className="mb-2 d-flex justify-content-between">
                            <h6 className="mb-0">Subcategory</h6>
                            <p className="mb-0">
                              {startup.subcategory &&
                                startup.subcategory[0] &&
                                startup.subcategory[0].name}
                            </p>
                          </div>
                          <div className="mb-2 d-flex justify-content-between">
                            <h6 className="mb-0">Incubation Center City</h6>
                            <p className="mb-0">
                              {startup.inqubationCenterCity}
                            </p>
                          </div>
                          <div className="detail-about-supplier-button mt-4">
                            <button className="mt-3" onClick={handleInquiry}>
                              INQUIRY NOW
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-8">
                <div className="tabs flex space-x-4 mb-4 justify-between">
                  <button
                    onClick={() => setActiveTab("product")}
                    className={`tab py-2 px-4 ${
                      activeTab === "product"
                        ? "border-b-2 border-blue-500 text-blue-500"
                        : "text-gray-500"
                    }`}
                  >
                    Product
                  </button>
                  <button
                    onClick={() => setActiveTab("awards")}
                    className={`tab py-2 px-4 ${
                      activeTab === "awards"
                        ? "border-b-2 border-blue-500 text-blue-500"
                        : "text-gray-500"
                    }`}
                  >
                    Awards
                  </button>
                  <button
                    onClick={() => setActiveTab("grants")}
                    className={`tab py-2 px-4 ${
                      activeTab === "grants"
                        ? "border-b-2 border-blue-500 text-blue-500"
                        : "text-gray-500"
                    }`}
                  >
                    Grants
                  </button>
                  <button
                    onClick={() => setActiveTab("investment")}
                    className={`tab py-2 px-4 ${
                      activeTab === "investment"
                        ? "border-b-2 border-blue-500 text-blue-500"
                        : "text-gray-500"
                    }`}
                  >
                    Investment
                  </button>
                  <button
                    onClick={() => setActiveTab("team")}
                    className={`tab py-2 px-4 ${
                      activeTab === "team"
                        ? "border-b-2 border-blue-500 text-blue-500"
                        : "text-gray-500"
                    }`}
                  >
                    Team
                  </button>
                </div>

                <div className="tab-content">
                  {activeTab === "product" && (
                    <div>
                         <div className="review-list-title">
                        <h3>Products</h3>
                      </div>
                      <div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {more.map((e) => (
                            <div
                              key={e._id}
                            >
                              <div className="shoes-detail-box">
                                <div className="shoes-detail-head">
                                  <p className="mb-0">RFQ</p>
                                  <FontAwesomeIcon
                                    icon={faHeart}
                                    style={{ color: "red" }}
                                  />
                                </div>
                                <div className="shoes-image-box">
                                  <img
                                    src="/shoes.png"
                                    alt=""
                                    className="img-fluid w-full h-40 object-cover rounded-md"
                                  />
                                </div>
                                <div className="shoes-detail-content">
                                  <div className="shoes-detail-title">
                                    <h6
                                      className="mb-1"
                                      style={{ fontWeight: "600" }}
                                    >
                                      {e.productName}
                                    </h6>
                                    <span>{e.description}</span>
                                  </div>
                                  <div className="shoes-detail-location">
                                    <FontAwesomeIcon
                                      icon={faLocationDot}
                                      style={{
                                        fontSize: "10px",
                                        color: "#74CC7E",
                                      }}
                                    />
                                    <p className="mb-0 ms-1">{e.location}</p>
                                  </div>
                                  <div className="shoes-price d-flex align-items-center ">
                                    <span>₹</span>
                                    <p className="mb-0">{e.productprice}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  {activeTab === "awards" && (
                    <div>
                      <div className="review-list-title">
                        <h3>Awards</h3>
                      </div>
                      <div className="mb-3">
                        <div className="row">
                          {awards.map((e) => (
                            <div className="col-3" key={e._id}>
                              <div className="overflow-content-hide">
                                <div className="awards-relative">
                                  <img
                                    src="/awards.png"
                                    alt=""
                                    className="w-100"
                                  />
                                </div>
                                <div className="flex justify-between">
                                    <h4 className="text-[12px]  font-bold">Award Name</h4>
                                    <h4 className="text-[12px] font-bold">Comp Name</h4>
                                </div>
                                <div className="flex justify-between text-[12px]">
                                  <h6 >{e.achievementName}</h6>  
                                  <h6>{e.competitionName}</h6>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  {activeTab === "grants" && (
                    <div>
                      <div className="review-list-title">
                        <h3>Grants</h3>
                      </div>
                      <div className="mb-3">
                        <div className="row">
                          {activeTab === "grants" && (
                            // <div className="mt-5">
                              <table className="table table-striped">
                                <thead>
                                  <tr>
                                    <th>Grant Name</th>
                                    <th>Grant Amount</th>
                                    <th>Date Available</th>
                                    <th>Grant From</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {grants.map((grant) => (
                                    <tr key={grant._id}>
                                      <td>{grant.grant_name}</td>
                                      <td>{grant.grant_amount}</td>
                                      <td>
                                        {new Date(
                                          grant.date_when_available
                                        ).toLocaleDateString()}
                                      </td>
                                      <td>{grant.grant_from}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            // </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  {activeTab === "investment" && (
                     <div className="">
                      <div className="review-list-title">
                        <h3>Investments</h3>
                      </div>
                     <table className="table table-striped ml-[-12px]">
                       <thead>
                         <tr>
                           <th>Investor Name</th>
                           <th>Investment Amount</th>
                           <th>Investment Date</th>
                         </tr>
                       </thead>
                       <tbody>
                         {investments.map((investment) => (
                           <tr key={investment._id}>
                             <td>{investment.investor_name}</td>
                             <td>{investment.investment_amount}</td>
                             <td>{new Date(investment.date_when_available).toLocaleDateString()}</td>
                             <td>{investment.investment_type}</td>
                           </tr>
                         ))}
                       </tbody>
                     </table>
                   </div>
                  )}
                  {activeTab === "team" && (
                      <div className="">
                        <div className="review-list-title">
                        <h3>Partners</h3>
                      </div>
                      <table className="table table-striped ml-[-12px]">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Role</th>
                            <th>DOB</th>
                            <th>Country</th>
                            <th>State</th>
                            <th>City</th>
                          </tr>
                        </thead>
                        <tbody>
                          {teamMembers.map((member) => (
                            <tr key={member.id}>
                              <td>{member.partner_name}</td>
                              <td>{member.position}</td>
                              <td>{new Date(member.DOB).toLocaleDateString()}</td>
                              <td>{member.country}</td>
                              <td>{member.state}</td>
                              <td>{member.city}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-12 mt-5 ">
                <div className="review-list-title p-[10px] text-[30px] ml-[40px]">
                  <h1>Reviews</h1>
                </div>
                <div className="mt-[20px]">
                  <ReviewList />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Supplier_full_detail;
