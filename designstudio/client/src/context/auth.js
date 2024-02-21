import { useState, useEffect, useContext, createContext } from "react";
import { json } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        token: "",
    });

    // Set default axios headers whenever auth state changes
    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = auth?.token;
    }, [auth.token]);

    useEffect(() => {
        const data = localStorage.getItem('auth')
        if (data) {
            const parseData = JSON.parse(data)
            setAuth(prevAuth => ({
                ...prevAuth,
                user: parseData.user,
                token: parseData.token
            }));
        }    
    }, []);

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
