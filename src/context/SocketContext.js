// import { createContext, useState, useEffect, useContext } from "react";
// import io from "socket.io-client";
// import { useAuthContext } from "./AuthContext";

// const SocketContext = createContext();

// export const useSocketContext = () => {
//     return useContext(SocketContext);
// };

// export const SocketContextProvider = ({ children }) => {
//     const [socket, setSocket] = useState(null);
//     const [onlineUsers, setOnlineUsers] = useState([]);
//     const { authUser } = useAuthContext();

//     useEffect(() => {
//         if (authUser) {
//             const newSocket = io("https://oneclick-sfu6.onrender.com", {
//                 query: {
//                     userId: authUser.id,
//                 },
//                 transports: ["websocket"], // Uncommented this line
//                 timeout: 20000, // Extended timeout to 20 seconds
//                 reconnectionAttempts: 5 // Number of reconnection attempts
//             });
//             console.log("id is:", authUser.id);
            
//             newSocket.on("connect", () => {
//                 console.log("Socket connected:", newSocket.id);
//             });

//             newSocket.on("connect_error", (error) => {
//                 console.error("Socket connection error:", error);
//             });

//             newSocket.on("disconnect", (reason) => {
//                 console.log("Socket disconnected:", reason);
//                 if (reason === "io server disconnect") {
//                     // If the server explicitly disconnected the socket
//                     newSocket.connect();
//                 }
//             });

//             newSocket.on("getOnlineUsers", (users) => {
//                 setOnlineUsers(users);
//             });

//             setSocket(newSocket);

//             return () => newSocket.close();
//         } else {
//             if (socket) {
//                 socket.close();
//                 setSocket(null);
//             }
//         }
//     }, [authUser]);

//     return <SocketContext.Provider value={{ socket, setOnlineUsers, onlineUsers }}>{children}</SocketContext.Provider>;
// };
import { createContext, useState, useEffect, useContext } from "react";
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

    // console.log('Aut User'+authUser.id)

	useEffect(() => {
		if (authUser) {
			const socket = io("https://oneclick-sfu6.onrender.com", {
				query: {
					userId: authUser.id,
				},
			});

			setSocket(socket);

			socket.on("getOnlineUsers", (users) => {
				setOnlineUsers(users);
			});

			return () => socket.close();
		} else {
			if (socket) {
				socket.close();
				setSocket(null);
			}
		}
	}, [authUser]);

	return <SocketContext.Provider value={{ socket,setOnlineUsers, onlineUsers }}>{children}</SocketContext.Provider>;
};