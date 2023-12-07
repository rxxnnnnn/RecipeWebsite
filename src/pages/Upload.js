import React, {useContext, useState} from 'react'
import { AuthContext } from '../contexts/AuthContext';
import {useNavigate} from 'react-router-dom';

function Upload() {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');
    const [isUpload, setIsUpload] = useState(false)
    const handleUpload = async(e) => {
        e.preventDefault();
        try {
            const response = await fetch(process.env.REACT_APP_API_URL + '/content/insert', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "username": user.username,
                    "password": user.password,
                    "tableName": "food",
                    "fieldNameValues": {
                        "title": title,
                        "ingredients": ingredients,
                        "instructions": instructions
                    }
                }),
            });
            const data = await response.json();
            if (data && data.success) {
                setIsUpload(true);
            }
        } catch (error) {
            console.error('Error creating new recipe', error);
        }
    }

    const handleContinueUploading = () => {
        setIsUpload(false);
        setTitle('');
        setIngredients('');
        setInstructions('');
        navigate('/upload');
    };

    if (isUpload) {
        return (
            <div>
                <p>{title} is successfully uploaded!!</p>
                <button onClick={handleContinueUploading}>Continue Uploading New Recipe</button>
            </div>
        );
    }

    if (!user.id) {
        return <div>Log in to upload</div>
    }
    return (
        <div>
            <h2>Upload</h2>
            <form onSubmit={handleUpload}>
                <label htmlFor="title">Recipe Name</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Recipe Name"
                    required
                />
                <br />
                <label htmlFor="ingredients">Ingredients (seperated by comma)</label>
                <input
                    type="text"
                    id="ingredients"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    placeholder="ingredients"
                />
                <br />
                <label htmlFor="instructions">Instructions</label>
                <input
                    type="text"
                    id="instructions"
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    placeholder="intructions"
                    required
                />
                <button type="submit">Create Recipe</button>
            </form>
        </div>
    )
}

export default Upload
