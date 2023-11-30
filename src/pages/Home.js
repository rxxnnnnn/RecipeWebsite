import React from 'react';

function Home() {
    const imageUrl = process.env.PUBLIC_URL + '/FoodImages/belgian-leek-tart-with-aged-goat-cheese-em-flamiche-aux-poireaux-em-350098.jpg';

    return (
    <div>
        <img src={imageUrl} alt="title"/>
        <h1> WHAT TO EAT TODAY?</h1>
    </div>
    );
}

export default Home
