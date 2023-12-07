import React, {useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import RecipeListItem from "../components/RecipeListItem";
import { AuthContext } from '../contexts/AuthContext';

function RecipeDetail() {
    const [recipe, setRecipe] = useState(null);
    const { id } = useParams();
    const recipeId = parseInt(id)
    const [recommendedRecipes, setRecommendedRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useContext(AuthContext);
    const [inCollection, setInCollection] = useState(false)

    useEffect(() => {
        setRecommendedRecipes([]);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                categoryName: "food",
                fieldNames: ["id", "title", "ingredients", "instructions","image"],
                conditionField: "id",
                conditionValue: recipeId,
                pageNo: "1",
                pageSize: "1"
            })
        };

        fetch(process.env.REACT_APP_API_URL+'/query/content/single-condition', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log('API Data:', data);
                if (data && data.success && data.data.pageData) {
                    setRecipe(data.data.pageData);
                }
            })
            .catch(error => console.error(error));
    }, [recipeId]);

    useEffect(() => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: user.username,
                password: user.password
            })
        };

        fetch(process.env.REACT_APP_API_URL+'/user/login', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log('API Data:', data);
                if (data && data.success && data.data.category === "food" && data.data.collection) {
                    if (data.data.collection.includes(recipeId)) {
                        setInCollection(true);
                    }
                }
            })
            .catch(error => console.error(error));
    }, [user, recipeId]);


    if (!user.id) {
        return <div>Login to View</div>
    }
    if (!recipe) return <p>Loading...</p>;
    let ingredients = recipe[0].ingredients;
    let ingredientsList = [];
    if (ingredients) {
        try {
            // Replace single quotes with double quotes and parse
            ingredients = recipe[0].ingredients;
            if (ingredients.length > 0 && ingredients[0] === '[') {
                ingredients = ingredients.slice(1);
            }
            if (ingredients.length > 0 && ingredients[ingredients.length - 1] === ']') {
                ingredients = ingredients.slice(0, -1);
            }
            ingredientsList = ingredients
                .split(",")
                .map(item => {
                    return item.trim().replace(/^"|"$|^'|'$/g, '').trim();
                });
        } catch (error) {
            console.error("Error parsing ingredients:", error);
        }
    }

    const fetchRecommendations = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(process.env.REACT_APP_API_URL+'/recommend/item', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "categoryName": "food",
                    "fieldNameList": ["ingredients"],
                    "targetId": recipeId.toString(),
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

    const handleAddCollection = async() => {
        try {
            const response = await fetch(process.env.REACT_APP_API_URL + '/user/add/collection', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "username": user.username,
                    "password": user.password,
                    "category": "food",
                    "itemId": recipeId
                }),
            });
            const data = await response.json();
            if (data && data.success) {
                // Set inCollection to true after successfully adding to collection
                setInCollection(true);
            }
        } catch (error) {
            console.error('Error adding to collection', error);
        }
    }

    const handleRemoveCollection = async() => {
        try {
            const response = await fetch(process.env.REACT_APP_API_URL + '/user/delete/collection', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "username": user.username,
                    "password": user.password,
                    "category": "food",
                    "itemId": recipeId
                }),
            });
            const data = await response.json();
            if (data && data.success) {
                // Set inCollection to false after successfully adding to collection
                setInCollection(false);
            }
        } catch (error) {
            console.error('Error removing from collection', error);
        }
    }

    let imageUrl = ''
    if (recipe[0].image !== '') {
        imageUrl = process.env.PUBLIC_URL + '/FoodImages/' + recipe[0].image + '.jpg';
    }
    return (
        <div>
            <h2>{recipe[0].title}</h2>
            {user.id && !inCollection && <button onClick={handleAddCollection}>Add to Collection</button>}
            {user.id && inCollection && <button onClick={handleRemoveCollection}>Remove from Collection</button>}
            <br />
            <br />
            {imageUrl && <img src={imageUrl} alt={recipe.title} />}
            <h4>Ingredients:</h4>
            {ingredientsList.length > 0 ? (
                <ul>
                    {ingredientsList.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                </ul>
            ) : (
                <p>No ingredients available.</p>
            )}
            <h4>Instructions:</h4>
            <p>{recipe[0].instructions}</p>
            <button onClick={fetchRecommendations}>Get Similar Recipes</button>
            <br />
            {isLoading && <p>Loading...</p>}
            {!isLoading && recommendedRecipes && recommendedRecipes.length > 0 ? (
                recommendedRecipes.map((recipeID, index) => (
                    <RecipeListItem key={index} recipeId={Number(recipeID)} />
                ))
            ) : (
                <p></p>
            )}
        </div>
    );
}

export default RecipeDetail;
