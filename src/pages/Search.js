import React, {useState} from 'react'
import RecipeListItem from "../components/RecipeListItem";

function Search() {
    const [keyword, setKeyword] = useState('');
    const [recipes, setRecipes] = useState([]);
    const handleSearch = async(e) => {
        e.preventDefault()
        try {
            const response = await fetch(process.env.REACT_APP_API_URL + '/query/content/fuzzy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "categoryName": "food",
                    keyword
                }),
            });
            const data = await response.json();
            if (data && data.success && data.data.pageData) {
                setRecipes(data.data.pageData);
            }
        } catch (error) {
            console.error('Error in Searching', error);
        }
    }


    return (
        <div>
            <h1>Search</h1>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Search for..."
                    required
                />
                <button type="submit">Search</button>
            </form>
            <br />
            {recipes.length > 0 && (
                recipes.map((recipe, index) => (
                    <RecipeListItem key={index} recipeId={recipe.id} />
                ))
            )}
        </div>
    )
}

export default Search
