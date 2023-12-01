import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import RecipeListItem from "./RecipeListItem";

function RecipeDetail() {
    const [recipe, setRecipe] = useState(null);
    const { id } = useParams();
    const recipeId = parseInt(id)
    const [recommendedRecipes, setRecommendedRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
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

    if (!recipe) return <p>Loading...</p>;
    let ingredientsList = [];
    try {
        // Replace single quotes with double quotes and parse
        ingredientsList = recipe[0].ingredients
            .slice(2, -2)
            .split("', '")
            .map(item => {
                return item.replace(/^'(.+)'$/, "$1");
            });
    } catch (error) {
        console.error("Error parsing ingredients:", error);
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
    const imageUrl = process.env.PUBLIC_URL + '/FoodImages/' + recipe[0].image + '.jpg';
    return (
        <div>
            <h2>{recipe[0].title}</h2>
            <img src={imageUrl} alt={recipe.title} />
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
