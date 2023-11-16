import React from 'react';
import {Link} from "react-router-dom";
import '../styles/Navbar.css';
export const Navbar = () => {
    return (
        <div className="Navbar">
            <Link to="/"> HOME </Link>
            <Link to='/all'> RECIPES </Link>
            <Link to='/search'> SEARCH </Link>
            <Link to='/user'> USER </Link>
        </div>
    )
}

export default Navbar
