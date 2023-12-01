// RecipeListItem.jsx
import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom'; // Assuming you are using React Router for navigation

function RecipeListItem({ recipeId }) {
    const [recipe, setRecipe] = useState(null);
    console.log(recipeId);
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

    if (!recipe) return <p>Loading</p>;

    const imageUrl = process.env.PUBLIC_URL + '/FoodImages/' + recipe[0].image + '.jpg';
    return (
        <div>
            <img src={imageUrl} alt={recipe[0].title} />
            <Link to={`/recipe/${recipe[0].id}`}>{recipe[0].title}</Link>
        </div>
    );
}

export default RecipeListItem;
