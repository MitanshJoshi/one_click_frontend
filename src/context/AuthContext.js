import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(() => {
        try {
            const userId = localStorage.getItem("userid");
            const token = localStorage.getItem("token");
            const investorToken = localStorage.getItem("investorToken");
            const tokenType = token ? 'token' : investorToken ? 'investorToken' : null;
            
            return { id: userId, tokenType: tokenType };
        } catch (error) {
            console.error("Error parsing JSON from localStorage:", error);
            return { id: null, tokenType: null };
        }
    });

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    );
};
