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
    const { user, setUser } = useContext(AuthContext);
    console.log(user);
    if (!user.id) {
        const handleLogin = async (e) => {
            e.preventDefault();
            try {
                const response = await axios.post(
                    process.env.REACT_APP_API_URL + '/user/login', {
                        username,
                        password
                    }
                );
                if (response.data.success && response.data.data.category === "food") {
                    const id = response.data.data.id
                    updateUser({id, username, password});
                    navigate(`/user/${username}`);
                } else if (response.data.success) {
                    console.error("Login failed");
                    setUsername('');
                    setPassword('');
                    navigate(`/login`);
                }
            } catch (error) {
                console.error("Login failed:", error);
                setUsername('');
                setPassword('');
                navigate(`/login`);
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
            updateUser({id:null,username:null,password:null});
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
