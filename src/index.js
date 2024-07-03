import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { AuthContextProvider } from "./context/AuthContext";
import { SocketContextProvider } from "./context/SocketContext";
import { ChatProvider } from "./context/chatcontext";
import { SharedStateProvider } from "./context/SharedStateContext";
import App from "./App";
import { MessageProvider } from "./context/setMessage";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <SocketContextProvider>
        <SharedStateProvider>
          <ChatProvider>
            <MessageProvider>
              <App />
            </MessageProvider>
          </ChatProvider>
        </SharedStateProvider>
      </SocketContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
