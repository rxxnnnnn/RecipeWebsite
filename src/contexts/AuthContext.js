// AuthContext.js
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
/*
    useEffect(() => {
        // Initialize authentication state (e.g., check local storage)
        // This can be replaced with logic to check if the user is logged in
        const storedUser = localStorage.getItem('user');
        if (storedUser && storedUser !== 'null' ) {
            setUser(storedUser);
        }
    }, []);
*/
    // Function to update the user state, e.g., during login or logout
    const updateUser = (newUser) => {
        setUser(newUser);
    };

    return (
        <AuthContext.Provider value={{ user, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};


export default AuthContext
