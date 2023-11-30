// LoginPage.jsx
import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { updateUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    if (!user) {
        const handleLogin = async (e) => {
            e.preventDefault();
            try {
                const response = await axios.post(
                    process.env.REACT_APP_API_URL + '/user/verify', {
                        username,
                        password,
                        category: "food"
                    }
                );
                if (response.data.success) {
                    updateUser(username);
                    navigate(`/user/${username}`);
                } else {
                    console.error("Login failed");
                }
            } catch (error) {
                console.error("Login failed:", error);
                // Handle login error (show message to user)
            }
        };

        return (
            <div>
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                    <button type="submit">Login</button>
                </form>
            </div>
        );
    } else {
        const handleLogout = () => {
            updateUser(null);
            navigate('/login');
        };
        return (
            <div>
                <p>Already logged in</p>
                <button onClick={handleLogout}>Log Out</button>
            </div>
        );
    }
};

export default LoginPage;
