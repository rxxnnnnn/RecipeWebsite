import React, {useState, useEffect, useContext} from 'react';
import RecipeListItem from '../components/RecipeListItem';
import PaginationComponent from "../components/Pagination";
import { useNavigate } from 'react-router-dom';
import AuthContext from "../contexts/AuthContext";
import '../styles/AllRecipes.css';

function AllRecipes() {
    const [recipes, setRecipes] = useState([]);
    const [curPage, setCurPage] = useState(1);
    const pageSize = 50;
    const [totalRecipes, setTotalRecipes] = useState(0);
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const storedCategory = sessionStorage.getItem('selectedCategory') || 'All';
    const [selectedCategory, setSelectedCategory] = useState(storedCategory);
    const categories = ['All', 'Healthy', 'Low-Sodium', 'Broccoli', 'Salmon', 'Spinach', 'Kale', 'Gluten-Free', 'Omega-3', 'Olive Oil', 'Ginger'];

    useEffect(() => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                categoryName: "food"
            })
        };
        if (user.id && selectedCategory === 'All') {
            fetch(process.env.REACT_APP_API_URL + '/query/category/list/info', requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log('API Data:', data);
                    if (data && data.success && data.data) {
                        setTotalRecipes(data.data.rowNum);
                    }
                })
                .catch(error => console.error(error));
        }
    }, [user.id]);

    useEffect(() => {
        let requestOptions;
        let apiEndpoint;

        if (selectedCategory === 'All') {
            apiEndpoint = '/query/content/';
            requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    categoryName: "food",
                    pageNo: curPage.toString(),
                    pageSize: pageSize.toString()
                })
            };
        } else {
            apiEndpoint = '/query/content/fuzzy';
            requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    categoryName: "food",
                    keyword: selectedCategory.toLowerCase(),
                    pageNo: curPage.toString(),
                    pageSize: pageSize.toString()
                })
            };
        }

        if (user.id) {
            fetch(process.env.REACT_APP_API_URL + apiEndpoint, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log('API Data:', data);
                    if (data && data.success && data.data.pageData) {
                        setRecipes(data.data.pageData);
                    }
                })
                .catch(error => console.error(error));
        }
    }, [curPage, user.id, selectedCategory]);

    useEffect(() => {
        sessionStorage.setItem('selectedCategory', selectedCategory);
    }, [selectedCategory]);

    const onPageChange = (newPage) => {
        setCurPage(Number(newPage));
        window.scrollTo(0, 0);
    };

    const  handleUpload = () => {
        navigate(`/upload`);
    }

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        setCurPage(1);
    };
    const isSelectedCategory = (category) => {
        return selectedCategory.toLowerCase() === category.toLowerCase();
    };

    if (!user.id) {
        return <div>Login to View</div>
    }

    return (
        <div>
            <br />
            <button onClick={handleUpload}>Upload a New Recipe</button>
            <br />
            {categories.map((category, index) => (
                <button
                    key={index}
                    onClick={() => handleCategoryClick(category)}
                    className={isSelectedCategory(category) ? 'selected-category' : ''}
                >
                    {category}
                </button>
            ))}
            {recipes.length > 0 ? (
                recipes.map((recipe, index) => (
                    <RecipeListItem key={index} recipeId={recipe.id} />
                ))
            ) : (
                <p>Loading...</p>
            )}
            {selectedCategory === 'All' && (
                <PaginationComponent currentPage={curPage} onPageChange={onPageChange} totalItems={totalRecipes} itemsPerPage={pageSize} />
            )}
        </div>
    );
}
export default AllRecipes;
