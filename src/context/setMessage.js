// messagecontext.js
import React, { createContext, useContext, useState } from 'react';

const MessageContext = createContext();

export const useMessageContext = () => useContext(MessageContext);

export const MessageProvider = ({ children }) => {
  const [message, setmessage] = useState('');

  return (
    <MessageContext.Provider value={{ message, setmessage }}>
      {children}
    </MessageContext.Provider>
  );
};
