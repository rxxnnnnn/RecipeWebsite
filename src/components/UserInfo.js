import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import {useParams} from "react-router-dom";

const UserInfo = () => {
    const { user } = useContext(AuthContext); // Assuming user info is stored in AuthContext
    const { username } = useParams();


    if (!user || user !== username) {
        return <p>Please log in to view user information.</p>;
    }

    return (
        <div>
            <h2>Hi {username}!</h2>
        </div>
    );
};

export default UserInfo;
