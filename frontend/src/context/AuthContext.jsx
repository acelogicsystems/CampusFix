import { createContext, useEffect, useState } from "react";
import { getCurrentUser } from "../services/authService";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');

        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [loading, setLoading] = useState(true);

   
    const login = (userData, token) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));

        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

     useEffect(() => {
        const verifyUser = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                setLoading(false);
                return;
            }
            
            try {
                const response = await getCurrentUser();

                if (response.success) {
                    setUser(response.user);
                } else {
                    logout();
                }
        // eslint-disable-next-line no-unused-vars
        } catch (error) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
               setUser(null);
        } finally {
            setLoading(false);
        }
    };
     verifyUser();
}, []);


    return (
        <AuthContext.Provider 
          value={{ user, login, logout, loading }}
          >
            {children}
          </AuthContext.Provider>
    )
}