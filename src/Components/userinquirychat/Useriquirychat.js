import { faMapMarkerAlt, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import SecondNavbar from "../Navbar/Navbar";
import { Container } from "react-bootstrap";
import { Form } from "react-router-dom";
import "./useiquirychat.css";
import { useSocketContext } from "../../context/SocketContext";
import { BASE_URL } from "../../BASE_URL";
import { toast, ToastContainer } from "react-toastify";
import { useLocation } from "react-router-dom";
import { Accordion, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";


const useListenMessages = ({ chat, setchat, setmessage }) => {
  const { socket } = useSocketContext();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      setchat([...chat, newMessage]);
    });

    return () => socket?.off("newMessage");
  }, [socket, setchat, chat, setmessage]);
};

export default function Useriquirychat() {
  const [showConfirmation, setshowConfirmation] = useState(false);

  const handleCancelDelete = () => {
    setshowConfirmation(false);
  };
  const handleStatus = () => {
    setshowConfirmation(true);
  };
  const [uid, setUID] = useState("");

  useEffect(() => {
    setUID(localStorage.getItem("userid"));
  }, []);

  const location = useLocation();
  const item = location.state && location.state;
  const [chat, setchat] = useState([]);
  const [message, setmessage] = useState("");
  useListenMessages({ chat, setchat, setmessage })
  const [inquiryId, setid] = useState(item.item._id);
  const [receiverId, setReceiverId] = useState();
  console.log(receiverId);

  useEffect(() => {
    setReceiverId(item.item.productDetails?.startupId)
  }, [item])
  
  

  const [userId, setuserId] = useState(item.item.userId);
  const screen = "user";  
  const handlechat = async () => {
    try {
      console.log("Sending request with data:", {
        inquiryId,
        message,
        receiverId,
        screen,
        userId,
      });
  
      const response = await fetch(
        "https://oneclick-sfu6.onrender.com/api/chat/chat-insert",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify({
            inquiryId,
            message,
            receiverId,
            screen,
            userId,
          }),
        }
      );
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error("Chat inquiry failed");
      }
  
      const responseData = await response.json();
      console.log("Response data:", responseData);
  
      display();
      setmessage("");
    } catch (error) {
      console.error("Caught error:", error);
      toast.error("Chat Inquiry failed!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
    }
  };
  
  const display = async () => {
    try {
      const response = await fetch(
        `https://oneclick-sfu6.onrender.com/api/chat/display-chat?inquiryId=${inquiryId}`,
        {
          method: "GET",
          headers: {
            // "Content-Type": "application/json",
            // "Access-Control-Allow-Origin": "*",
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      const Data = await response.json();
      setchat(Data?.data);
      console.log(setchat);
    } catch (error) {
      // console.error("Error fetching data from the backend", error);
    }
  };

  useEffect(() => {
    display();
  }, []);
  const [Status, setStatus] = useState("");
  const inquirydata = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/inquiry/userInquiry`, {
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
      setStatus(responseData.data[0]);
    } catch (error) {
      toast.error("Something went wrong!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
    }
  };
  useEffect(() => {
    inquirydata();
  }, []);
  const [messageComponent, setMessageComponent] = useState(false);
  const [status, setstatus] = useState("");
  const handleConfirmUpdate = async () => {
    try {
      const response = await fetch(
        `https://oneclick-sfu6.onrender.com/api/inquiry/updateStatus?inquiryId=${inquiryId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            // "Access-Control-Allow-Origin": "*",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify({
            status,
          }),
        }
      );
      setshowConfirmation(false);
      if (!response.ok) {
        throw new Error("Chat inquiry failed");
      }
      // toast.success(" Chat Inquiry Successful!", {
      //   position: toast.POSITION.BOTTOM_RIGHT,
      //   autoClose: 1000,
      // });
      // onStatuschange()
      display();
      setmessage("");
      inquirydata();
    } catch (error) {
      if (error) {
        toast.error(" Chat Inquiry failed!", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 1000,
        });
      }
    }
  };
  return (
    <>
      <SecondNavbar />
      <span
        onClick={() => setMessageComponent(true)}
        style={{
          position: "fixed",
          bottom: "4%",
          right: "4%",
          cursor: "pointer",
          zIndex: "111",
          width: "300px",
          border: "1px solid green",
          borderRadius: "10px",
          padding: "5px",
        }}
      >
        <img
          src="BioDisplayUser.png"
          alt=""
          style={{ width: "30px", height: "30px" }}
        />
        <span className="ps-3">pankaj</span>
      </span>
      <section className="mt-sm-5 mt-2 pt-4">
        <Container>
          <div className="container">
            <ToastContainer />

            <div>
              <div
                className="startup-profile "
                style={{ width: "1100px", height: "375px" }}
              >
                <div>
                  <div className="startup-profile-heading">
                    <div className="d-flex justify-content-between mb-md-5 mb-2">
                      <div className="d-flex align-items-sm-center align-items-start">
                        <div>
                          <img src="/webearl.png" alt="" />
                        </div>
                        <div className="ms-sm-4 ms-2">
                          <h4 className="mb-1">Webearl Technology Pvt Ltd</h4>
                          <p className="mb-0">Cradle, EDII</p>
                        </div>
                      </div>
                      <div className="ms-lg-0 ms-1">
                        <div className="d-flex align-item-center">
                          <img
                            src="/start.png"
                            alt=""
                            style={{ width: "230px", height: "40px" }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className=" d-flex align-item-center gap-5 w-100 d-flex  ">
                      <p className=" ms-md-3 ms-sm-2 ">
                        <span>
                          <img
                            src="/map-pin.png"
                            alt=""
                            style={{ width: "30px", height: "30px" }}
                          />
                        </span>
                        Ahmedabad
                      </p>
                      <p className=" ms-md-3 ms-sm-2">
                        <span>
                          <img
                            src="/map-pin.png"
                            alt=""
                            style={{ width: "30px", height: "30px" }}
                          />
                        </span>
                        Gujarat
                      </p>
                      <p className=" ms-md-3 ms-sm-2">
                        <span>
                          <img
                            src="/map-pin.png"
                            alt=""
                            style={{ width: "30px", height: "30px" }}
                          />
                        </span>
                        India
                      </p>
                    </div>
                    <div className="icone d-flex align-item center justify-content-start gap-5 mt-3">
                      <p className=" ms-md-3 ms-sm-2">
                        <span>
                          <img
                            src="/map-pin.png"
                            alt=""
                            style={{ width: "30px", height: "30px" }}
                          />
                        </span>
                        Incubation center
                      </p>
                      <p className=" ms-md-3 ms-sm-2">
                        {/* <FontAwesomeIcon icon={faMapMarkerAlt} /> */}
                        Centre for Advancing & Launching Enterprises (CrAdLE)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* profile  */}
            <div
              className="profile"
              style={{
                width: "1100px",
                height: "570px",
                marginTop: "80px",
                // marginLeft: "",
              }}
            >
              <div>
                <img
                  className="background-image img-fluid "
                  style={{ width: "100%" }}
                  src="/Frame.png"
                  alt="Background"
                />
              </div>
              <div className="d-flex justify-content-between align-items-center profile-image">
                <div className="d-flex align-items-end ms-sm-5 ms-2">
                  <div className="my-profile-relative">
                    <img
                      src="BioDisplayUser.png"
                      alt="User Display"
                      style={{
                        height: "150px",
                        width: "150px",
                        borderRadius: "50%",
                      }}
                    />
                  </div>
                  <div
                    className="profileDiv mt-5 "
                    style={{ marginLeft: "20px" }}
                  >
                    <h4 className="h4">Profile</h4>
                    <p className="lead mb-4 ">webearl</p>
                  </div>
                </div>
              </div>
              <div className="mt-5 d-flex align-item-center">
                <div>
                  <h3>Inquiry Information :</h3>
                </div>
                <div className="mt-2 ms-5">
                  <h5>Title={item.item.title}</h5>
                  <h5>Description={item.item.description}</h5>
                  <h5>
                    Best-Time To Connect= {item.item.best_time_to_connect}
                  </h5>
                </div>
                <div className="flex" style={{ marginLeft: "150px" }}>
                  <div>
                    <h3>
                      Inquiry Status:{" "}
                      <span style={{ color: "red" }}> {Status.status}</span>
                    </h3>
                  </div>
                  <div>
                    <div className="inquiry-label mt-2 d-flex gap-5">
                      <div className="select" style={{width:"150px"}}>
                        {/* <label htmlFor="">Best-Time To Connect</label> */}
                        <select
                          type="tel"
                          name=""
                          id=""
                          className="form-control select-with-arrow "
                          onChange={(e) => setstatus(e.target.value)}
                        >
                          <option value="">Select Status</option>
                          <option value="Active">Active</option>
                          <option value="Reject">Reject</option>
                          <option value="Cancel">Cancel</option>
                          <option value="Done">Done</option>
                        </select>
                      </div>
                      <div>
                        <button
                          className="btn btn-success"
                          onClick={handleStatus}
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 d-flex align-item-center">
                <div>
                  <h3>Product Information :{}</h3>
                </div>
                <div className="mt-2 ms-5 d-flex align-item-center">
                  <div>
                    <img
                      src="/shoe-list.png"
                      alt=""
                      style={{ width: "70px", height: "30px" }}
                    />
                  </div>
                  <div>
                  <h5>{item.item.productDetails && item.item.productDetails[0] ? item.item.productDetails[0].productName : ''}</h5>
                  </div>
                </div>
              </div>
            </div>
            {messageComponent && (
              <div
                style={{
                  position: "fixed",
                  bottom: "1%",
                  right: "4%",
                  zIndex: "2222",
                }}
              >
                <div className="space d-flex align-item-center- justify-content-end">
                  <div className="chatboxx">
                    <span></span>
                  </div>
                  <div className="accordian">
                    <div
                      className="chatpop"
                      style={{ width: "400px", height: "auto" }}
                    >
                      <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                          <Accordion.Header
                            onClick={() => setMessageComponent(false)}
                          >
                            <div className="profile d-flex justify-content-start">
                              <div className="img">
                                <img
                                  src="BioDisplayUser.png"
                                  alt=""
                                  style={{ width: "50px" }}
                                />{" "}
                              </div>
                              <div className="name pt-2 ps-2">
                                <h3>
                                {item.item.startupDetails && item.item.startupDetails[0] ? item.item.startupDetails[0].contactPerson : ''}

                                </h3>
                              </div>
                            </div>
                          </Accordion.Header>
                          <Accordion.Body>
                            <div
                              style={{
                                maxHeight: "300px", // Set the maximum height of the chat container
                                overflowY: "auto", // Enable vertical scrolling when content overflows
                                scrollbarColor: "green", // Set the scrollbar color to green
                                scrollbarWidth: "thin", // Optional: Set the scrollbar width to thin
                              }}
                            >
                              {chat &&
                                chat.map((e, index) => (
                                  <div
                                    key={index} // Add a unique key to each chat message
                                    className={`${
                                      uid === e.senderId
                                        ? "text-end"
                                        : "text-start"
                                    } p-3`}
                                  >
                                    <span
                                      style={{
                                        height: "20px",
                                        color: "black",
                                      }}
                                    >
                                      <img
                                        src="BioDisplayUser.png"
                                        alt=""
                                        style={{
                                          width: "30px",
                                          height: "30px",
                                          marginRight: "10px",
                                        }}
                                      />
                                      {e.message}
                                    </span>
                                  </div>
                                ))}
                            </div>
                            <div className="mt-2 From-Control ">
                              <input
                                value={message}
                                type="text "
                                style={{
                                  width: "85%",
                                  border: "1px solid green",
                                  borderRadius: "10px",
                                  height: "35px",
                                }}
                                onChange={(e) => setmessage(e.target.value)}
                                placeholder="Type your message here"
                              />
                              <span
                                className=""
                                style={{
                                  height: "30px",
                                  borderRadius: "50px",
                                  width: "50px",
                                }}
                              >
                                <img
                                  src="send.png"
                                  alt=""
                                  onClick={handlechat}
                                />
                              </span>
                            </div>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* <div
              className="userchat "
              style={{
                border: "3px solid gray",
                height: "auto",
                overflow: "scroll",
              }}
            >
              
              <hr style={{ width: "100%" }} />
              <div>
             

                {chat &&
                  chat.map((e) => (
                    <div
                      className={`${
                        uid === e.senderId ? "text-end" : "text-start"
                      } p-5`}
                    >
                      <span
                        style={{
                          height: "40px",
                          marginTop: "20px",
                          backgroundColor: "green",
                          padding: "5px",
                          margin: "auto",
                          color: "white",
                        }}
                      >
                        {e.message}
                      </span>
                    </div>
                  ))}
              </div>
              <div className="mt-5 From-Control">
                <input
                  value={message}
                  type="text "
                  style={{ width: "90%" }}
                  onChange={(e) => setmessage(e.target.value)}
                  placeholder="Type your message here"
                />
                <button
                  className="btn btn-success"
                  style={{
                    height: "35px",
                    borderRadius: "50px",
                    width: "80px",
                  }}
                  onClick={handlechat}
                >
                  Send
                </button>
              </div>
            </div> */}
          </div>
          {showConfirmation && (
            <div className="confirmation-modal">
              <div className="confirmation-content">
                <h3 className="confirmation-message">
                  Are you sure you want to Update this Status?
                </h3>
                <div className="buttons-container">
                  <button className="btng" onClick={handleConfirmUpdate}>
                    Yes
                  </button>
                  <button className="btnr" onClick={handleCancelDelete}>
                    No
                  </button>
                </div>
              </div>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
