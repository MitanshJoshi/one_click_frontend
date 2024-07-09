// import React, { useEffect, useState } from "react";
// import SecondNavbar from "../Components/Navbar/Navbar";
// import { useLocation } from "react-router-dom";
// import { toast } from "react-toastify";
// import { Container } from "react-bootstrap";
// import { BASE_URL } from "../BASE_URL";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faFilter, faHeart, faLocationDot } from "@fortawesome/free-solid-svg-icons";

// export default function OutgoingFromStartupChat() {
//   const [inquiry, setInquiry] = useState(null);
//   const state = useLocation();
//   const item = state.state.item;
//   const token=localStorage.getItem("token");
//   const investorToken=localStorage.getItem("investorToken");
//   console.log("item is", item);

//   const id = state.state.item._id;
//   console.log(id);

//   const inquiryData = async () => {
//     try {
//       const response = await fetch(
//         `${BASE_URL}/api/investorInquiry/getInquiryById/${id}`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: token?token:investorToken,
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Request failed");
//       }
//       const responseData = await response.json();
//       setInquiry(responseData.inquiry || {});
//       console.log("inquiry", responseData.inquiry);
//     } catch (error) {
//       toast.error("Something went wrong!", {
//         position: toast.POSITION.BOTTOM_RIGHT,
//         autoClose: 1000,
//       });
//     }
//   };

//   useEffect(() => {
//     inquiryData();
//   }, []);

//   if (!inquiry) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <>
//        <SecondNavbar />
//       <Container>
//         <span
//           style={{
//             position: "fixed",
//             bottom: "4%",
//             right: "4%",
//             cursor: "pointer",
//             zIndex: "111",
//             width: "300px",
//             border: "1px solid green",
//             borderRadius: "10px",
//             padding: "5px",
//           }}
//         >
//            {token?<div className="flex justify-start items-center h-[50px]">
//           <img
//             src={inquiry.investorData.InvestorPhoto}
//             alt=""
//             // style={{ width: "30px", height: "30px" }}
//             className="w-[40px] h-[40px] rounded-full"
//           />
//           <span className="ps-3">{inquiry.investorData.InvestorName}</span>
//           </div>:<div className="flex justify-start items-center h-[50px]">
//           <img
//             src={inquiry.startupData.startupLogo}
//             alt=""
//             // style={{ width: "30px", height: "30px" }}
//             className="w-[40px] h-[40px] rounded-full"
//           />
//           <span className="ps-3">{inquiry.startupData.startupName}</span>
//           </div>}
//         </span>
//         <section className="mt-sm-5 mt-2 pt-4 ">
//           <div className="container">
//             {/* <ToastContainer/> */}
//             {/* profile  */}
//             <div
//               className="profile"
//             >
//               <div>
//                 <img
//                   className="background-image img-fluid "
//                   style={{ width: "100%" }}
//                   src="/Frame.png"
//                   alt="Background"
//                 />
//               </div>
//               <div className="d-flex justify-content-between align-items-center profile-image">
//                {token?<div className="d-flex align-items-end ms-sm-5 ms-2">
//                   <div className="-relative">
//                     <img
//                       src={inquiry.startupData.startupLogo}
//                       alt="User Display"
//                       style={{
//                         height: "150px",
//                         width: "150px",
//                         borderRadius: "50%",
//                       }}
//                     />
//                   </div>
//                   <div
//                     className="profileDiv mt-5 "
//                     style={{ marginLeft: "20px" }}
//                   >
//                     <h4 className="h4">Profile</h4>
//                     <p className="lead ">{inquiry.startupData.startupName}</p>
//                   </div>
//                 </div>:<div className="d-flex align-items-end ms-sm-5 ms-2">
//                   <div className="-relative">
//                     <img
//                       src={inquiry.investorData.InvestorPhoto}
//                       alt="User Display"
//                       style={{
//                         height: "150px",
//                         width: "150px",
//                         borderRadius: "50%",
//                       }}
//                     />
//                   </div>
//                   <div
//                     className="profileDiv mt-5 "
//                     style={{ marginLeft: "20px" }}
//                   >
//                     <h4 className="h4">Profile</h4>
//                     <p className="lead ">{inquiry.investorData.InvestorName}</p>
//                   </div>
//                 </div>}
//               </div>
//             </div>

//             {/* detail  */}
//             <div className="mt-[20px]">
//               <div
//                 className="startup-profile"
//               >
//                 <div>
//                   <div className="startup-profile-heading">
//                     <div className="d-flex justify-content-between mb-md-5 mb-2 w-[100%]">
//                      {token?<div className="d-flex align-items-sm-center align-items-start">
//                         <div>
//                           <img src={inquiry.investorData.InvestorPhoto} alt="" className="rounded-full"/>
//                         </div>
//                         <div className="ms-sm-4 ms-2">
//                           <h4 className="mb-1">{inquiry.investorData.InvestorName}</h4>
//                           <p className="mb-0">{inquiry.investorData.FirmName}</p>
//                         </div>
//                       </div>:<div className="d-flex align-items-sm-center align-items-start">
//                         <div>
//                           <img src={inquiry.startupData.startupLogo} alt="" className="rounded-full"/>
//                         </div>
//                         <div className="ms-sm-4 ms-2">
//                           <h4 className="mb-1">{inquiry.startupData.startupName}</h4>
//                           <p className="mb-0">{inquiry.startupData.address}</p>
//                         </div>
//                       </div>}
//                       <div className="ms-lg-0 ms-1">
//                         <div className="d-flex align-item-center">
//                           <img
//                             src="/start.png"
//                             alt=""
//                             style={{ width: "230px", height: "40px" }}
//                           />
//                         </div>
//                       </div>
//                     </div>
//                     <div className=" d-flex align-item-center gap-2 w-100 d-flex">
//                       <div>
//                       <p className=" ms-md-3 ms-sm-2">
//                         <span>
//                         <FontAwesomeIcon
//                                       icon={faLocationDot}
//                                       className=""
//                                       style={{
//                                         fontSize: "20px",
//                                         color: "#74CC7E",
//                                       }}
//                                     />
//                                     </span>
//                       </p>
//                       </div>
//                       <p className=" ms-md-3 ms-sm-2">
//                         {inquiry.startupData.country}
//                       </p>
//                       <p className=" ms-md-3 ms-sm-2">
//                         {inquiry.startupData.state}
//                       </p>
//                       <p className=" ms-md-3 ms-sm-2">
//                       {inquiry.startupData.city}
//                       </p>
//                       <p className=" ms-md-3 ms-sm-2">

//                         {inquiry.startupData.inqubationCenterCity}
//                       </p>
//                     </div>
//                     <div className="mt-5 d-flex align-item-center ">
//                       <div className="block text-gray-700 font-bold mb-2">
//                         <h3>Inquiry Information :</h3>
//                       </div>
//                       <div className=" ms-5 w-[800px] flex justify-between">
//                         <div>
//                         <h5 className="block text-gray-700 font-bold mb-2">Title</h5>
//                           <h5 className="mt-2">{inquiry.title}</h5>
//                         </div>
//                         <div>
//                         <h5 className="block text-gray-700 font-bold mb-2">Description</h5>
//                          <h5 className="mt-2 text-center"> {inquiry.description}</h5>
//                          </div>
//                          <div>
//                         <h5 className="block text-gray-700 font-bold mb-2">
//                           Best-Time To Connect{" "}</h5>
//                          <h5 className="mt-2 text-center"> {inquiry.best_time_to_connect}
//                         </h5>
//                          </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </Container>
//     </>
//   );
// }
