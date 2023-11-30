import React, { useState, useEffect } from 'react';
import RecipeListItem from '../components/RecipeListItem';
import PaginationComponent from "../components/Pagination";

function AllRecipes() {
    const [recipes, setRecipes] = useState([]);
    const [curPage, setCurPage] = useState(1);
    const pageSize = 50;
    const [totalRecipes, setTotalRecipes] = useState(0);


    useEffect(() => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                categoryName: "food"
            })
        };

        fetch(process.env.REACT_APP_API_URL + '/query/category/list/info', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log('API Data:', data);
                if (data && data.success && data.data) {
                    setTotalRecipes(data.data.rowNum);
                }
            })
            .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                categoryName: "food",
                pageNo: curPage.toString(),
                pageSize: pageSize.toString()
            })
        };

        fetch(process.env.REACT_APP_API_URL + '/query/content/', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log('API Data:', data);
                if (data && data.success && data.data.pageData) {
                    setRecipes(data.data.pageData);
                }
            })
            .catch(error => console.error(error));
    }, [curPage]);

    const onPageChange = (newPage) => {
        setCurPage(Number(newPage));
        window.scrollTo(0, 0);
    };
    console.log('Current Page in AllRecipes:', curPage);
    return (
        <div>
            {recipes.length > 0 ? (
                recipes.map((recipe, index) => (
                    <RecipeListItem key={index} recipe={recipe} />
                ))
            ) : (
                <p>Loading...</p>
            )}
            <PaginationComponent currentPage={curPage} onPageChange={onPageChange} totalItems={totalRecipes} itemsPerPage={pageSize} />
        </div>
    );
}
export default AllRecipes;
