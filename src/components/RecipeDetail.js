import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function RecipeDetail() {
    const [recipe, setRecipe] = useState(null);
    const { id } = useParams();
    const recipeId = parseInt(id)

    useEffect(() => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                categoryName: "food",
                fieldNames: ["id", "title", "ingredients", "instructions"],
                conditionField: "id",
                conditionValue: recipeId,
                pageNo: 1,
                pageSize: 5
            })
        };

        fetch('http://localhost:8080/query/content/single-condition', requestOptions)
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
        ingredientsList = JSON.parse(recipe[0].ingredients.replace(/'/g, '"'));
    } catch (error) {
        console.error("Error parsing ingredients:", error);
    }

    return (
        <div>
            <h2>{recipe[0].title}</h2>
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
        </div>
    );
}

export default RecipeDetail;
