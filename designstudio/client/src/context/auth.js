import { useState, useEffect, useContext, createContext } from "react";
import { json } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

//default axios
axios.defaults.headers.common['Authorization'] = auth?.token;
useEffect(() => {
    const data = localStorage.getItem('auth');
    if (data) {
        const parsedData = JSON.parse(data);
        setAuth({
            ...auth,
            user: parsedData.user,
            token: parsedData.token
        });
        console.log('Auth updated:', parsedData); // Debugging line
    }
}, []);

console.log('Providing auth:', auth);
    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    );
};

// custom hook
const useAuth = () => useContext(AuthContext);
export { useAuth, AuthProvider };

