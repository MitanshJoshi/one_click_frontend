import React, { useEffect, useState } from "react";
import SecondNavbar from "../Components/Navbar/Navbar";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useSocketContext } from "../context/SocketContext";
import { Container } from "react-bootstrap";
import { BASE_URL } from "../BASE_URL";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Accordion from "react-bootstrap/Accordion";
import { faFilter, faHeart, faLocationDot } from "@fortawesome/free-solid-svg-icons";

export default function ChatWithInvestor() {
  const [inquiry, setInquiry] = useState(null);
   const [chat, setchat]  = useState([]);
   const [messageComponent, setMessageComponent] = useState(false);
  const [ message, setmessage ] = useState("");
  
  const state = useLocation();
  const myData = state.state.data;
  console.log('myadata:',myData);
  
  const item = state.state.item;
  console.log('changed itemm:',item);
  
  
  const [inquiryId, setid] = useState(item._id);


  const [userId, setuserId] = useState(myData==="investor"?item.investorId:item.startupId);
  console.log("User Id:::",userId)

  const token=localStorage.getItem("token");
  const investorToken=localStorage.getItem("investorToken");
  const [receiverId, setReceiverId] = useState(myData==="investor"?item.startupId:item.investorId)
  console.log("item is", item);

  const id = state.state.item._id;
  console.log(id);

  const [uid, setUID] = useState("");

  useEffect(() => {
    setUID(localStorage.getItem("userid"));
  }, []);

  const display = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/chat/display-chat?inquiryId=${item._id}`,
        {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("token")?localStorage.getItem("token"):localStorage.getItem("investorToken"),
          },
        }
      );
      const Data = await response.json();
      console.log("data is:",Data);
      setchat(Data?.data);
      console.log('chat iss',chat);
      
    } catch (error) {
      console.error("Error fetching data from the backend", error);
    }
  };


  const handlechat = async () => {
    try {
      const response = await fetch(
        "https://oneclick-sfu6.onrender.com/api/chat/chat-insert",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token")?localStorage.getItem("token"):localStorage.getItem("investorToken"),
          },
          body: JSON.stringify({
            inquiryId,
            message,
            isStartupReceiver: myData==="startup"?false:true,
            receiverId,
            senderId:userId,
          }),
        }
      );
      console.log('receiver',receiverId);
      console.log('user',userId);

      
      // setSharedState(prevState => prevState + 1);
      if (!response.ok) {
        throw new Error("Chat inquiry failed");
      }
      
      const responseData = await response.json();
      
      display();
      setmessage("");
      setchat([...chat, responseData.data.message])
    } catch (error) {
      if (error) {
        toast.error(" Chat Inquiry failed!", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 1000,
        });
      }
    }
  };

  const inquiryData = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/investorInquiry/getInquiryById/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token?token:investorToken,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Request failed");
      }
      const responseData = await response.json();
      setInquiry(responseData.inquiry || {});
      console.log("inquiry", responseData.inquiry);
    } catch (error) {
      toast.error("Something went wrong!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
    }
  };

  const useListenMessages = ({ chat, setchat, setmessage }) => {

    const { socket } = useSocketContext();

    useEffect(() => {
      console.log('inquiryId',item._id);
      socket?.on("newMessage", (newMessage) => {
        console.log('socket messae  ....');
        console.log('inquiryId',item._id);
        console.log('message is',newMessage);
        
        if (newMessage.inquiryId == item._id) {
          console.log('message===',newMessage.inquiryId);
          
        
          setchat([...chat, newMessage]);
        }
      });

      return () => socket?.off("newMessage");
    }, [socket, chat, setchat, setmessage]);
  };
  const useListenOnlineUsers = () => {
    const { socket, setOnlineUsers, onlineUsers } = useSocketContext();

    useEffect(() => {
      socket?.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });
      return () => socket?.off("getOnlineUsers");
    }, [socket, setOnlineUsers, onlineUsers]);
  };
  useListenMessages({ chat, setchat, setmessage })
  useListenOnlineUsers();
  const fetchChatData = async () => {
    try {
      const response = await fetch(
        `https://oneclick-sfu6.onrender.com/api/chat/display-chat?inquiryId=${inquiryId}`,
        {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("token")?localStorage.getItem("token"):localStorage.getItem("investorToken"),
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch chat data");
      }

      const Data = await response.json();
      setchat(Data?.data);

      if (Data?.data && Data?.data.length > 0) {
        const firstChat = Data.data[0];
        const inquiryDetails = firstChat.inquiryDetails[0];
        // console.log('data is:',Data);
        // console.log('inquiryy',firstChat);
        console.log('receiver id is',receiverId);
        console.log(userId);
        
      }
    } catch (error) {
      console.error("Error fetching data from the backend", error);
    }
  }
  useEffect(() => {
    fetchChatData();
  }, []);

  useEffect(() => {
    display();
  }, []);

  useEffect(() => {
    inquiryData();
  }, []);

  if (!inquiry) {
    return <div>Loading...</div>;
  }

  

  return (
    <>
       <SecondNavbar />
      <Container>
        <span onClick={() => setMessageComponent(true)}
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
           {token? <div className="flex justify-start items-center h-[50px]">
          <img
            src={inquiry.investorData.InvestorPhoto}
            alt=""
            // style={{ width: "30px", height: "30px" }}
            className="w-[40px] h-[40px] rounded-full"
          />
          <span className="ps-3">{inquiry.investorData.InvestorName}</span>
          </div>:<div className="flex justify-start items-center h-[50px]">
          <img
            src={inquiry.startupData.startupLogo}
            alt=""
            // style={{ width: "30px", height: "30px" }}
            className="w-[40px] h-[40px] rounded-full"
          />
          <span className="ps-3">{inquiry.startupData.startupName}</span>
          </div>}
        </span>
        <section className="mt-sm-5 mt-2 pt-4 ">
          <div className="container">
            {/* <ToastContainer/> */}
            {/* profile  */}
            <div
              className="profile"
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
                {token?<div className="d-flex align-items-end ms-sm-5 ms-2">
                  <div className="-relative">
                    <img
                      src={inquiry.startupData.startupLogo}
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
                    <p className="lead ">{inquiry.startupData.startupName}</p>
                  </div>
                </div>:<><div className="d-flex align-items-end ms-sm-5 ms-2">
                  <div className="-relative">
                    <img
                      src={inquiry.investorData.InvestorPhoto}
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
                    <p className="lead ">{inquiry.investorData.InvestorName}</p>
                  </div>
                </div></>}
              </div>
            </div>

            {/* detail  */}
            <div className="mt-[20px]">
              <div
                className="startup-profile"
              >
                <div>
                  <div className="startup-profile-heading">
                    <div className="d-flex justify-content-between mb-md-5 mb-2 w-[100%]">
                      {token?<div className="d-flex align-items-sm-center align-items-start">
                        <div>
                          <img src={inquiry.investorData.InvestorPhoto} alt="" className="rounded-full"/>
                        </div>
                        <div className="ms-sm-4 ms-2">
                          <h4 className="mb-1">{inquiry.investorData.InvestorName}</h4>
                          <p className="mb-0">{inquiry.investorData.FirmName}</p>
                        </div>
                      </div>:<div className="d-flex align-items-sm-center align-items-start">
                        <div>
                          <img src={inquiry.startupData.startupLogo} alt="" className="rounded-full"/>
                        </div>
                        <div className="ms-sm-4 ms-2">
                          <h4 className="mb-1">{inquiry.startupData.startupName}</h4>
                          <p className="mb-0">{inquiry.startupData.address}</p>
                        </div>
                      </div>}
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
                    <div className=" d-flex align-item-center gap-2 w-100 d-flex">
                      <div>
                      <p className=" ms-md-3 ms-sm-2">
                        <span>
                        <FontAwesomeIcon
                                      icon={faLocationDot}
                                      className=""
                                      style={{
                                        fontSize: "20px",
                                        color: "#74CC7E",
                                      }}
                                    />
                                    </span>
                      </p>
                      </div>
                      <p className=" ms-md-3 ms-sm-2">
                        {inquiry.startupData.country}
                      </p>
                      <p className=" ms-md-3 ms-sm-2">
                        {inquiry.startupData.state}
                      </p>
                      <p className=" ms-md-3 ms-sm-2">
                      {inquiry.startupData.city}
                      </p>
                      <p className=" ms-md-3 ms-sm-2">

                        {inquiry.startupData.inqubationCenterCity}
                      </p>
                    </div>
                    <div className="mt-5 d-flex align-item-center ">
                      <div className="block text-gray-700 font-bold mb-2">
                        <h3>Inquiry Information :</h3>
                      </div>
                      <div className=" ms-5 w-[800px] flex justify-between">
                        <div>
                        <h5 className="block text-gray-700 font-bold mb-2">Title</h5>
                          <h5 className="mt-2">{inquiry.title}</h5>
                        </div>
                        <div>
                        <h5 className="block text-gray-700 font-bold mb-2">Description</h5>
                         <h5 className="mt-2 text-center"> {inquiry.description}</h5>
                         </div>
                         <div>
                        <h5 className="block text-gray-700 font-bold mb-2">
                          Best-Time To Connect{" "}</h5>
                         <h5 className="mt-2 text-center"> {inquiry.best_time_to_connect}
                        </h5>
                         </div>
                      </div>
                    </div>
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
                                <h3>{myData==="investor"?item.startupName:item.InquiryBy}</h3>
                              </div>
                            </div>
                          </Accordion.Header>
                          <Accordion.Body>
                            <div
                              style={{
                                maxHeight: "300px", 
                                overflowY: "auto", 
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
                            <div className="mt-5 From-Control ">
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
          </div>
        </section>
      </Container>
    </>
  );
}
