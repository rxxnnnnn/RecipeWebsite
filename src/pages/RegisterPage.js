// RegisterPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                process.env.REACT_APP_API_URL + '/user/register', {
                    username, password, email, category: "food"});
            if (response.data.success) {
                setIsRegistered(true);
            } else {
                setLoginError(response.data.message || "Login failed.");
            }
        } catch (error) {
            setLoginError(error.response?.data?.message || "An error occurred during login.");
        }
    };

    const handleContinueRegistering = () => {
        setIsRegistered(false);
        setUsername('');
        setPassword('');
        setEmail('');
        setLoginError('');
        navigate('/register');
    };

    if (isRegistered) {
        return (
            <div>
                <p>{username} is successfully registered!!</p>
                <button onClick={handleContinueRegistering}>Continue Registering</button>
                <button onClick={() => navigate('/login')}>Login</button>
            </div>
        );
    }
    if (loginError !== '') {
        return (
            <div>
                <p>{loginError}</p>
                <button onClick={handleContinueRegistering}>Go Back to Register</button>
                <button onClick={() => navigate('/login')}>Login</button>
            </div>
        );
    }

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
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
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                {/* Include additional fields as necessary */}
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterPage;
