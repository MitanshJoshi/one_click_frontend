import React, { useEffect, useState, useRef } from "react";
import SecondNavbar from "../Navbar/Navbar";
import { Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useSocketContext } from "../../context/SocketContext";
import { useSharedState } from "../../context/SharedStateContext";
import Accordion from "react-bootstrap/Accordion";
import { useChatContext } from "../../context/chatcontext";
import { useMessageContext } from "../../context/setMessage";
import "./myinquirychat.css";

export default function MyInquiryChat() {
  const { sharedState, setSharedState } = useSharedState();
  const { chat, setChat } = useChatContext();
  const { message, setMessage } = useMessageContext();
  const chatEndRef = useRef(null);
  const location = useLocation();
  const item = location.state && location.state.item;
  const [showNewContent, setShowNewContent] = useState(false);
  const [uid, setUID] = useState("");
  const [inquiryId, setInquiryId] = useState(item.item._id);
  const [receiverId, setReceiverId] = useState(item?.userData._id);
  const [userId, setUserId] = useState(localStorage.getItem("userid"));
  const [messageComponent, setMessageComponent] = useState(false);
  const screen = "";

  useEffect(() => {
    setUID(localStorage.getItem("userid"));
    display();
  }, []);

  const display = async () => {
    try {
      const response = await fetch(
        `https://oneclick-sfu6.onrender.com/api/chat/display-chat?inquiryId=${inquiryId}`,
        {
          method: "GET",
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      setChat(data?.data);
    } catch (error) {
      console.error("Error fetching data from the backend", error);
    }
  };

  const useListenMessages = ({ chat, setChat }) => {
    const { socket } = useSocketContext();

    useEffect(() => {
      socket?.on("newMessage", (newMessage) => {
        console.log('socket from myinqurychat');
        
        if (newMessage.inquiryId === inquiryId) {
          setChat((prevChat) => [...prevChat, newMessage]);
        }
      });

      return () => socket?.off("newMessage");
    }, [socket, chat, setChat]);
  };

  const useListenOnlineUsers = () => {
    const { socket, setOnlineUsers } = useSocketContext();

    useEffect(() => {
      socket?.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      return () => socket?.off("getOnlineUsers");
    }, [socket, setOnlineUsers]);
  };

  useListenMessages({ chat, setChat });
  useListenOnlineUsers();

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleUpdateUserClick = () => {
    setShowNewContent(!showNewContent);
  };

  const handleChat = async () => {
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
            screen,
            userId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Chat inquiry failed");
      }

      const responseData = await response.json();
      display();
      setMessage("");
      setChat([...chat, responseData.data.message]);
    } catch (error) {
      toast.error("Chat Inquiry failed!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
    }
  };

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
          <div className="container">
            <div className="profile">
              <div>
                <img
                  className="background-image img-fluid"
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
                  <div className="profileDiv mt-5" style={{ marginLeft: "20px" }}>
                    <h4 className="h4">Profile</h4>
                    <p className="lead ">webearl</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="startup-profile">
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
                  <div className="d-flex align-item-center gap-5 w-100 d-flex">
                    <p className="ms-md-3 ms-sm-2">
                      <span>
                        <img
                          src="/map-pin.png"
                          alt=""
                          style={{ width: "30px", height: "30px" }}
                        />
                      </span>
                      {item.startupData.city}
                    </p>
                    <p className="ms-md-3 ms-sm-2">
                      <span>
                        <img
                          src="/map-pin.png"
                          alt=""
                          style={{ width: "30px", height: "30px" }}
                        />
                      </span>
                      {item.startupData.state}
                    </p>
                    <p className="ms-md-3 ms-sm-2">
                      <span>
                        <img
                          src="/map-pin.png"
                          alt=""
                          style={{ width: "30px", height: "30px" }}
                        />
                      </span>
                      {item.startupData.country}
                    </p>
                  </div>
                  <div className="icone d-flex align-item center justify-content-start gap-5 mt-3">
                    <p className="ms-md-3 ms-sm-2">
                      <span>
                        <img
                          src="/map-pin.png"
                          alt=""
                          style={{ width: "30px", height: "30px" }}
                        />
                      </span>
                      {item.startupData.inqubationCenterCity}
                    </p>
                    <p className="ms-md-3 ms-sm-2">
                      Centre for Advancing & Launching Enterprises (CrAdLE)
                    </p>
                  </div>
                  <div className="mt-5 d-flex align-item-center">
                    <div>
                      <h3>Inquiry Information :</h3>
                    </div>
                    <div className="mt-2 ms-5">
                      <h5>Title={item.inquiryData.title}</h5>
                      <h5>Description={item.inquiryData.description}</h5>
                      <h5>
                        Best-Time To Connect={item.inquiryData.best_time_to_connect}
                      </h5>
                    </div>
                  </div>
                  <div className="mt-5 d-flex align-item-center">
                    <div>
                      <h3>Product Information :</h3>
                    </div>
                    <div className="mt-2 ms-5 d-flex align-item-center">
                      <div>
                        <img
                          src="/shoe-list.png"
                          alt=""
                          style={{ width: "100px", height: "100px" }}
                        />
                      </div>
                      <div className="ms-5">
                        <h5>Name= {item.productData.name}</h5>
                        <h5>Type= {item.productData.type}</h5>
                        <h5>Quantity={item.productData.quantity}</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header
                    onClick={handleUpdateUserClick}
                    style={{ color: "#0082ca" }}
                  >
                    <h5 style={{ color: "#0082ca" }}>
                      View Messages ({chat?.length || 0})
                    </h5>
                  </Accordion.Header>
                  <Accordion.Body className="chat-box">
                    <div className="chat">
                      {chat?.map((message, index) => (
                        <div
                          key={index}
                          className={`${
                            message?.userId?._id === userId
                              ? "chat-bubble-right"
                              : "chat-bubble-left"
                          }`}
                        >
                          <div className="message">
                            <img
                              className="chat-user-image"
                              src="/BioDisplayUser.png"
                              alt="User"
                            />
                            <div className="chat-text">{message.message}</div>
                          </div>
                        </div>
                      ))}
                      <div ref={chatEndRef} />
                    </div>
                    <div className="chat-input">
                      <textarea
                        rows="3"
                        placeholder="Type your message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                      <button onClick={handleChat} className="btn btn-primary">
                        Send
                      </button>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </div>
        </section>
        <ToastContainer />
      </Container>
    </>
  );
}
