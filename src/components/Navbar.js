import React, { useContext } from 'react';
import {Link} from "react-router-dom";
import '../styles/Navbar.css';
import { AuthContext } from '../contexts/AuthContext';
export const Navbar = () => {
    const { user } = useContext(AuthContext);
    return (
        <div className="Navbar">
            <Link to="/"> HOME </Link>
            <Link to='/all'> RECIPES </Link>
            <Link to='/search'> SEARCH </Link>
            <Link to="/login">LOGIN</Link>
            <Link to="/register">REGISTER</Link>
            <Link to={`/user/${user}`}>USER</Link>
        </div>
    )
}

export default Navbar
