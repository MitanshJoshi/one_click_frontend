// ChatContext.js
import React, { createContext, useContext, useState } from 'react';

const ChatContext = createContext();

export const useChatContext = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const [chat, setchat] = useState([]);

  return (
    <ChatContext.Provider value={{ chat, setchat }}>
      {children}
    </ChatContext.Provider>
  );
};
