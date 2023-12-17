import React, {useContext, useState} from 'react'
import RecipeListItem from "../components/RecipeListItem";
import AuthContext from "../contexts/AuthContext";

function Search() {
    const [keyword, setKeyword] = useState('');
    const [keywordRecipes, setKeywordRecipes] = useState([]);
    const [title, setTitle] = useState('');
    const [titleRecipes, setTitleRecipes] = useState([]);
    const { user } = useContext(AuthContext);

    if (!user.id) {
        return <div>Login to Search</div>
    }
    const handleFuzzySearch = async(e) => {
        e.preventDefault()
        try {
            const response = await fetch(process.env.REACT_APP_API_URL + '/query/content/fuzzy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "categoryName": "food",
                    "pageNo":"1",
                    "pageSize":"10",
                    keyword
                }),
            });
            const data = await response.json();
            if (data && data.success && data.data.pageData) {
                setKeywordRecipes(data.data.pageData);
            }
        } catch (error) {
            console.error('Error in Searching', error);
        }
    }

    const handleTitleSearch = async(e) => {
        e.preventDefault()
        try {
            const response = await fetch(process.env.REACT_APP_API_URL + '/query/content/single-condition', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "categoryName":"food",
                    "fieldNames": ["id"],
                    "conditionField":"title",
                    "conditionValue": title,
                    "pageNo":"1",
                    "pageSize":"10"
                }),
            });
            const data = await response.json();
            if (data && data.success && data.data.pageData) {
                setTitleRecipes(data.data.pageData);
            }
        } catch (error) {
            console.error('Error in Searching', error);
        }
    }


    return (
        <div>
            <h1>Search by keyword</h1>
            <form onSubmit={handleFuzzySearch}>
                <label htmlFor="keyword">Keyword</label>
                <input
                    type="search"
                    id="keyword"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Keyword"
                    required
                />
                <button type="submit">Search</button>
            </form>
            <br />
            {keywordRecipes.length > 0 && (
                keywordRecipes.map((recipe, index) => (
                    <RecipeListItem key={index} recipeId={recipe.id} />
                ))
            )}
            <h1>Search by name</h1>
            <form onSubmit={handleTitleSearch}>
                <label htmlFor="title">Recipe Name</label>
                <input
                    type="search"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Recipe Name"
                    required
                />
                <button type="submit">Search</button>
            </form>
            <br />
            {titleRecipes.length > 0 && (
                titleRecipes.map((recipe, index) => (
                    <RecipeListItem key={index} recipeId={recipe.id} />
                ))
            )}
        </div>
    )
}

export default Search
