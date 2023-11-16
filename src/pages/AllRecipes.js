import React, { useState, useEffect } from 'react';
import RecipeListItem from '../components/RecipeListItem';

function AllRecipes() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                categoryName: "food",
                fieldNames: ["id", "title", "ingredients", "instructions"],
                conditionField: "id",
                conditionValue: 1,
                pageNo: 1,
                pageSize: 5
            })
        };

        fetch('http://localhost:8080/query/content/single-condition', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log('API Data:', data);
                if (data && data.success && data.data.pageData) {
                    setRecipes(data.data.pageData);
                }
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            {recipes.length > 0 ? (
                recipes.map((recipe, index) => (
                    <RecipeListItem key={index} recipe={recipe} />
                ))
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default AllRecipes;
