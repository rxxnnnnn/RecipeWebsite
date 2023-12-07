// RecipeListItem.jsx
import React, {useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import AuthContext from "../contexts/AuthContext";

function RecipeListItem({ recipeId }) {
    const [recipe, setRecipe] = useState(null);
    const { user } = useContext(AuthContext);
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
        if (user.id) {
            fetch(process.env.REACT_APP_API_URL + '/query/content/single-condition', requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log('API Data:', data);
                    if (data && data.success && data.data.pageData) {
                        setRecipe(data.data.pageData);
                    }
                })
                .catch(error => console.error(error));
        }
    }, [recipeId, user.id]);

    if (!user.id) {
        return <div>Login to View</div>
    }
    if (!recipe) return <p>Loading</p>;
    let imageUrl = ''
    if (recipe[0].image) {
        imageUrl = process.env.PUBLIC_URL + '/FoodImages/' + recipe[0].image + '.jpg';
    }
    return (
        <div>
            {imageUrl!=='' && <img src={imageUrl} alt={recipe.title} />}
            <Link to={`/recipe/${recipe[0].id}`}>{recipe[0].title}</Link>
        </div>
    );
}

export default RecipeListItem;
