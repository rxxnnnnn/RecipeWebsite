// RecipeListItem.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you are using React Router for navigation

function RecipeListItem({ recipe }) {
    return (
        <div>
            <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
        </div>
    );
}

export default RecipeListItem;
