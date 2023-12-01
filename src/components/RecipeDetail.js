import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

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

    if (!recipe) return <p>Invalid Content ID</p>;
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
        </div>
    );
}

export default RecipeDetail;
