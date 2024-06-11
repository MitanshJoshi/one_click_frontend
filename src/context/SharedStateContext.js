// SharedStateContext.js
import React, { createContext, useContext, useState } from 'react';

const SharedStateContext = createContext();

export const useSharedState = () => useContext(SharedStateContext);

export const SharedStateProvider = ({ children }) => {
  const [sharedState, setSharedState] = useState(/* initial value */);

  return (
    <SharedStateContext.Provider value={[sharedState, setSharedState]}>
      {children}
    </SharedStateContext.Provider>
  );
};
