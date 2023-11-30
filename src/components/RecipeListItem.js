// RecipeListItem.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you are using React Router for navigation

function RecipeListItem({ recipe }) {
    const imageUrl = process.env.PUBLIC_URL + '/FoodImages/' + recipe.image + '.jpg';
    return (
        <div>
            <img src={imageUrl} alt={recipe.title} />
            <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
        </div>
    );
}

export default RecipeListItem;
