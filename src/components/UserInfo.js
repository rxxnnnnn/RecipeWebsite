import React, {useState, useContext, useEffect} from 'react';
import { AuthContext } from '../contexts/AuthContext';
import {useParams} from "react-router-dom";
import axios from "axios";
import RecipeListItem from "./RecipeListItem";

const UserInfo = () => {
    const { user } = useContext(AuthContext); // Assuming user info is stored in AuthContext
    const { username } = useParams();
    const [collections, setCollections] = useState([]);

    useEffect(() => {
        if (user.id && user.username === username) {
            const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: user.username,
                password: user.password,
            })
            };


            fetch(process.env.REACT_APP_API_URL + '/user/login/', requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log('API Data:', data);
                    if (data && data.success && data.data.collection) {
                        setCollections(data.data.collection);
                    }
                })
                .catch(error => console.error(error));
        }
    }, [user.id && user.username === username]);

    if (!user.id || user.username !== username) {
        return <p>Please log in to view user information.</p>;
    }
    return (
        <div>
            <h2>Hi {user.username} !</h2>
            <h3>Collection:</h3>
            {collections.length > 0 ? (
                collections.map((recipeID, index) => (
                    <RecipeListItem key={index} recipeId={recipeID} />
                ))
            ) : (
                <p>No Collection. Go to explore more!</p>
            )}
        </div>
    );
};

export default UserInfo;
