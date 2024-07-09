import React, { useEffect, useState } from "react";
import SecondNavbar from "../Navbar/Navbar";
import { Container } from "react-bootstrap";
import "./useiquirychat.css";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faHeart, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import { useSocketContext } from "../../context/SocketContext";
import { useSharedState } from "../../context/SharedStateContext";
import Accordion from "react-bootstrap/Accordion";
import { useChatContext } from "../../context/chatcontext";
// import { Socket } from "socket.io-client";
import { useRef } from "react";
import { useMessageContext } from "../../context/setMessage";

export default function Userinquirychat() {
  const { sharedState, setSharedState } = useSharedState();
  const [showNewContent, setShowNewContent] = useState(false);
  const [chat, setchat]  = useState([]);
  const [ message, setmessage ] = useState("");
  const chatEndRef = useRef(null);
  const displayCalledRef = useRef(false);
  const location = useLocation();
  const item = location.state.item;
  const myData = location.state.data;

  console.log("data",myData);
  console.log("item:", item._id);

  const display = async () => {
    try {
      const response = await fetch(
        `https://oneclick-sfu6.onrender.com/api/chat/display-chat?inquiryId=${inquiryId}`,
        {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      const Data = await response.json();
      console.log("data is:",Data);
      setchat(Data?.data);
      // console.log(Data?.data);
    } catch (error) {
      console.error("Error fetching data from the backend", error);
    }
  };

  // const useListenMessages = ({ chat, setChat }) => {
  //   const { socket } = useSocketContext();
  //   useEffect(() => {
  //     console.log("useListenMessages useEffect triggered");
  //     console.log("Current chat:", chat);

  //     if (socket) {
  //       console.log("Socket is connected. Adding event listener.");
  //       socket?.on("newMessage", (newMessage) => {
  //         console.log("newMessage received:", newMessage);
  //         setChat((prevChat) => [...prevChat, newMessage]);
          
  //         if (!sharedState) {
  //           setSharedState(true);
  //           display();
  //         } // Increment shared state to trigger updates in both components
  //       });

  //       return () => {
  //         console.log("Cleaning up useEffect");
  //         socket?.off("newMessage");
  //       };
  //     } else {
  //       console.log("Socket is not connected. Skipping event listener registration.");
  //     }
  //   }, [socket, chat, setChat,sharedState]);
  // };

  // useListenMessages({ chat, setchat });
  const useListenMessages = ({ chat, setchat, setmessage }) => {

    const { socket } = useSocketContext();

    useEffect(() => {
      console.log('inquiryId',item._id);
      socket?.on("newMessage", (newMessage) => {
        console.log('socket messae  ....');
        console.log('inquiryId',item._id);
        
        if (newMessage.inquiryId == item._id) {
          console.log('data',myData);
                    
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

  useEffect(() => {
    display();
  }, []);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  const handleUpdateUserClick = () => {
    setShowNewContent(!showNewContent); 
  };

  const [uid, setUID] = useState("");

  useEffect(() => {
    setUID(localStorage.getItem("userid"));
  }, []);

  
  
  const [inquiryId, setid] = useState(item._id);
  // console.log(inquiryId);
  const [receiverId, setReceiverId] = useState(myData=="userinquiry"?item.startupDetails._id:item.userData._id)

  const [userId, setuserId] = useState(myData==="userinquiry"?localStorage.getItem("userid"):item.startupData._id);
  console.log("User Id:::"+localStorage.getItem("userid"))
  // setuserId(localStorage.getItem("userid"))
  const screen = "";

  const fetchChatData = async () => {
    try {
      const response = await fetch(
        `https://oneclick-sfu6.onrender.com/api/chat/display-chat?inquiryId=${inquiryId}`,
        {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("token"),
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
  
  const handlechat = async () => {
    try {
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
            isStartupReceiver:myData==="myinquiry"?false:true,
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

  // const display = async () => {
  //   try {
  //     const response = await fetch(
  //       `https://oneclick-sfu6.onrender.com/api/chat/display-chat?inquiryId=${inquiryId}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           Authorization: `${localStorage.getItem("token")}`,
  //         },
  //       }
  //     );
  //     const Data = await response.json();
  //     console.log(Data);
  //     setchat(Data?.data);
  //     console.log(Data?.data);
  //   } catch (error) {
  //     console.error("Error fetching data from the backend", error);
  //   }
  // };

  useEffect(() => {
    display();
  }, []);


  const [messageComponent, setMessageComponent] = useState(false);

  return (
    <>
      <SecondNavbar />
      <Container>
        <span
          onClick={() => setMessageComponent(true)}
          style={{
            position: "fixed",
            bottom: "4%",
            right: "4%",
            cursor: "pointer",
            zIndex: "1",
            width: "300px",
            border: "1px solid green",
            borderRadius: "10px",
            padding: "5px",
          }}
          className="flex items-center h-[50px]"
        >
          <img
            src="BioDisplayUser.png"
            alt=""
            style={{ width: "30px", height: "30px" }}
          />
          <span className="ps-3 font-bold">{myData==="userinquiry"?item.startupDetails.startupName:item.userData.name}</span>
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
                <div className="d-flex align-items-end ms-sm-5 ms-2">
                  <div className="-relative">
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
                    <p className="lead">
  {myData === "userinquiry" ? item.userDetails.name : item.startupData.startupName}
</p>
                  </div>
                </div>
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
                      <div className="d-flex align-items-sm-center align-items-start">
                        <div>
                          <img src="/webearl.png" alt="" />
                        </div>
                        <div className="ms-sm-4 ms-2">
                          <h4 className="mb-1">{myData==="userinquiry"?item.startupDetails.startupName:item.userData.name}</h4>
                          <p className="mb-0">{myData==="userinquiry"?item.startupDetails.address:item.userData.address}</p>
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
                        {myData==="userinquiry"?item.startupDetails.country:item.startupData.country}
                      </p>
                      <p className=" ms-md-3 ms-sm-2">
                        {myData==="userinquiry"?item.startupDetails.state:item.startupData.state}
                      </p>
                      <p className=" ms-md-3 ms-sm-2">
                      {myData==="userinquiry"?item.startupDetails.city:item.startupData.city}
                      </p>
                      <p className=" ms-md-3 ms-sm-2">

                        {myData==="userinquiry"?item.startupDetails.inqubationCenterCity:""}
                      </p>
                    </div>
                    <div className="mt-5 d-flex align-item-center ">
                      <div className="block text-gray-700 font-bold mb-2">
                        <h3>Inquiry Information :</h3>
                      </div>
                      <div className=" ms-5 w-[800px] flex justify-between">
                        <div>
                        <h5 className="block text-gray-700 font-bold mb-2">Title</h5>
                          <h5 className="mt-2">{myData==="userinquiry"?item.title:item.inquiryData.title}</h5>
                        </div>
                        <div>
                        <h5 className="block text-gray-700 font-bold mb-2">Description</h5>
                         <h5 className="mt-2 text-center"> {myData==="userinquiry"?item.description:item.inquiryData.description}</h5>
                         </div>
                         <div>

                        <h5 className="block text-gray-700 font-bold mb-2">
                          Best-Time To Connect{" "}</h5>
                         <h5 className="mt-2 text-center">{myData==="userinquiry"?item.best_time_to_connect:item.inquiryData.best_time_to_connect}
                        </h5>
                         </div>
                      </div>
                    </div>
                    <div className="mt-5 d-flex align-item-center">
                      <div className="block text-gray-700 font-bold mb-2">
                        <h3>Product Information :</h3>
                      </div>
                      <div className="mt-2 ms-5 d-flex align-item-center justify-between w-[437px]">
                        <div>
                          <h5 className="block text-gray-700 font-bold mb-2">Product image</h5>
                          <img
                            src="/shoe-list.png"
                            alt=""
                            className="mt-2"
                            style={{ width: "70px", height: "30px" }}
                          />
                        </div>
                        <div>
                          <h5 className="block text-gray-700 font-bold mb-2">Product Name</h5>
                          <h5 className="mt-2 text-center">{myData==="userinquiry"?item.productDetails.productName:item.productData.productName}</h5>
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
                className="backk"
              >
                <div className="space d-flex align-item-center- justify-content-end">
                  <div className="chatboxx">
                    <span></span>
                  </div>
                  <div className="accordian" >
                    <div
                      className="chatpop"
                      style={{ width: "400px", height: "auto" }}
                    >
                      <Accordion style={{backgroundColor:"black"}} defaultActiveKey="0">
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
                                <h3>{myData==="userinquiry"?item.startupDetails.startupName:item.userData.name}</h3>
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
