// AuthContext.js
import React, { createContext, useState } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({
        id: null,
        username: null,
        password: null
    });
    // Function to update the user state, e.g., during login or logout
    const updateUser = ({ id, username, password }) => {
        setUser({ id, username, password });
    };

    return (
        <AuthContext.Provider value={{ user, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};


export default AuthContext
