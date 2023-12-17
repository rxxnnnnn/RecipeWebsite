import React, {useState, useContext, useEffect} from 'react';
import { AuthContext } from '../contexts/AuthContext';
import {useParams} from "react-router-dom";
import RecipeListItem from "../components/RecipeListItem";

const UserInfo = () => {
    const { user } = useContext(AuthContext); // Assuming user info is stored in AuthContext
    const { username } = useParams();
    const [collections, setCollections] = useState([]);
    const [recommendedRecipes, setRecommendedRecipes] = useState([]);
    const [recommendedRecipesCollection, setRecommendedRecipesCollection] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

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

    useEffect(() => {
        // Check if the recommendedRecipesCollection is empty and isLoading is false
        if (isLoading && (!recommendedRecipesCollection || recommendedRecipesCollection.length === 0)) {
            fetchRecommendations();
        }
    }, [recommendedRecipesCollection, isLoading]);

    if (!user.id || user.username !== username) {
        return <p>Please log in to view user information.</p>;
    }
    const fetchRecommendations = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(process.env.REACT_APP_API_URL+'/recommend/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "categoryName": "food",
                    "fieldNameList": ["ingredients"],
                    "userId": user.id.toString(),
                    "rankTopSize": 10
                }),
            });

            const data = await response.json();
            if (data && data.success) {
                setRecommendedRecipes(data.data); // Assuming the API returns an array of recipe IDs
            }
        } catch (error) {
            console.error('Error fetching recommendations:', error);
        }
        setIsLoading(false);
    };



    const fetchRecommendationsCollection = async () => {
        try {
            const response = await fetch(process.env.REACT_APP_API_URL+'/recommend/similar-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "username": user.username,
                    "password": user.password,
                    "category": "food",
                    "rankTopSize": 10
                }),
            });

            const data = await response.json();
            if (data && data.success) {
                setRecommendedRecipesCollection(data.data); // Assuming the API returns an array of recipe IDs
            }
        } catch (error) {
            console.error('Error fetching recommendations:', error);
        }
        if (!recommendedRecipesCollection ||recommendedRecipesCollection.length === 0) {
            setIsLoading(true);
        } else {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h2>Hi {user.username} !</h2>
            <button onClick={fetchRecommendationsCollection}>Get Some Recommendations!</button>
            {recommendedRecipesCollection && recommendedRecipesCollection.length > 0 ? (
                    recommendedRecipesCollection.map((recipeID, index) => (
                        <RecipeListItem key={index} recipeId={Number(recipeID)} />
                    ))
            ) : (
                <>
                    {isLoading && <p>No Similar User. Recommendation is Loading...</p>}
                    {!isLoading && recommendedRecipes && recommendedRecipes.length > 0 && (
                        recommendedRecipes.map((recipeID, index) => (
                            <RecipeListItem key={index} recipeId={Number(recipeID)} />
                        ))
                    )}
                </>
            )}
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
