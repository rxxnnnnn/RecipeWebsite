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
    const [isFailed, setIsFailed] = useState(false);
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
                } else {
                    setIsFailed(true);
                    console.error("Login failed");
                }
            } catch (error) {
                setIsFailed(true);
                console.error("Login failed:", error);
            }
        };

        const handleFail = () => {
            setIsFailed(false);
            setUsername('');
            setPassword('');
            navigate('/login');
        };

        if (isFailed) {
            return (
                <div>
                    <p>login failed :(</p>
                    <button onClick={handleFail}>Try Again</button>
                </div>
            );
        }

        return (
            <div>
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        required
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
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
