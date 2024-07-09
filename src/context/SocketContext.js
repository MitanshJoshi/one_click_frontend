import { createContext, useState, useContext } from "react";
import io from "socket.io-client";
import { useAuthContext } from "./AuthContext";

const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { authUser } = useAuthContext();

    const initializeSocket = (id) => {
        if (id) {
            const newSocket = io("https://oneclick-sfu6.onrender.com", {
                query: {
                    id:id,
                },
                transports: ["websocket"],
                timeout: 20000,
                reconnectionAttempts: 5
            });

            newSocket.on("connect", () => {
                console.log("Socket connected:", newSocket.id);
            });

            newSocket.on("connect_error", (error) => {
                console.error("Socket connection error:", error);
            });

            newSocket.on("disconnect", (reason) => {
                console.log("Socket disconnected:", reason);
                if (reason === "io server disconnect") {
                    newSocket.connect();
                }
            });

            newSocket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
            });

            setSocket(newSocket);

            return () => newSocket.close();
        }
    };

    return (
        <SocketContext.Provider value={{ socket, onlineUsers, initializeSocket }}>
            {children}
        </SocketContext.Provider>
    );
};
