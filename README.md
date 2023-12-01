# Recipe Website
## Introduction
A React Application for viewing recipes and getting recommendations. 

Functionalities: 
- user registration
- user login
- user can see their collection of recipes and get 10 recipe recommendations according to their collections
- view list of all recipes
- view detailed information of a recipe and 10 more similar recipes

This application uses the services provided by https://github.com/4156-project/WhatToEatToday. \
APIs used: 
- /recommend/item - find similar recipes of a recipe
- /recommend/user - provide recipe recommendations given a user's collection of recipes
- /user/register - user registration
- /user/login - user login
- /query/category/list/info - get the total number of recipes for display
- /query/content/ - get a list all recipes
- /query/content/single-condition - get detailed information of a recipe 

This application enhances user engagement and experience by offering personalized recipe recommendations based on individual interactions and collections. It caters to a diverse audience, from students, health care workers, engineers, parents to professional cook, appealing to anyone interested in cooking and seeking culinary inspiration. With its comprehensive functionalities, the application serves as a valuable resource for those who enjoy preparing their own meals and exploring new cooking ideas.

## How to Build, Test, and Run

These instructions will get you a copy of the project up and running on your local machine.

### Prerequisites

What things you need to install the software and how to install them:

- [Node.js](https://nodejs.org/) (preferably the latest version)
- A package manager like [npm](https://www.npmjs.com/) (usually comes with Node.js) 

### Installing

A step by step series of examples that tell you how to get a development environment running:

1. **Clone the Repository** 

   ```sh
   git clone https://github.com/rxxnnnnn/RecipeWebsite/
   ```
2. **Install Dependencies** \
   Inside the project directory, install the necessary packages:
    ```sh
    npm install
   ```
3. **Start the Development Server** \
   To run the application in development mode:
    ```sh
    npm start
   ```
### Manual Test Guide
1. Test user functions
   1. user registration \
      Click REGISTER in the navigator bar -> enter Username, Password, and Email -> Click Register button
      - If successful, get a message "{username} is successfully registered!!". Click Continue Registering to go back to REGISTER page. Click Login to go to the LOGIN page.
      - If unsuccessful(ex: enter username rx, which is already registered), get a message "User already exists!". Choose to Go Back to Register or Login.
   2. user login \
      Click LOGIN in the navigator bar
      - if no user logged in, enter Username and Password -> Click Login button
        - If successful, get to the USER page
      - if there is a user already logged in, there is a message "Already logged in" and a button to Log Out.
   3. user page \
      Click USER in the navigator bar. \
      Click "Get Some Recommendations!" button to get a list of recipe recommendations according to the collections. \
      Can view your collections. If no collection, there is a message "No Collection. Go to explore more!"
2. Test Recipe functions
   1. View list of all recipes \
      Click RECIPES in the navigator bar -> get to see all recipes -> move to other pages using the buttons at the bottom of the page.
   2. View detailed information of a recipe and 10 more similar recipes \
      From the list of all recipes, recipe recommendations and recipe collections -> click the recipe title -> get to recipe page
      - title
      - image
      - ingredients
      - instructions
      - Click "Get Similar Recipes" -> get a list of 10 similar recipes

### Building for Production
   To build the app for production to the build folder:
   ```sh
   npm run build
   ```
   This correctly bundles React in production mode and optimizes the build for the best performance.

