# Recipe Website
## Introduction
A React Application for viewing recipes and getting recommendations. 

Functionalities: 
- user registration
- user login
- user can see their collection of recipes and get 10 recipe recommendations according to their collections
- view list of all recipes
- view detailed information of a recipe and 10 more similar recipes
- add recipe to user's collection / remove recipe from user's collection
- fuzzy search recipe using keywords
- search recipe by name
- upload new recipe

This application uses the services provided by https://github.com/4156-project/WhatToEatToday. \
APIs used:
- /user/register - user registration
- /user/login - user login
- /user/add/collection - add recipe to collection
- /user/delete/collection - remove recipe from collection
- /query/category/list/info - get the total number of recipes for display
- /query/content/ - get a list all recipes
- /query/content/single-condition - get detailed information of a recipe and search recipe by title
- /query/content/fuzzy - search recipe using keywords
- /content/insert - upload new recipe
- /recommend/item - find similar recipes of a recipe
- /recommend/user - provide recipe recommendations given a user's collection of recipes

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
   Make sure https://whattoeattoday-k6jwzq4mja-uc.a.run.app is running on the cloud. \
   To run the application in development mode:
    ```sh
    npm start
   ```
### Manual Test Guide

#### 1. User Registration
   Click **REGISTER** in the navigator bar -> enter Username, Password, and Email -> Click **Register** button
   - If successful, get a message "**{username} is successfully registered!!**". Click **Continue Registering** to go back to REGISTER page. Click **Login** to go to the LOGIN page.
   - If unsuccessful(ex: enter username rx, which is already registered), get a message "**User already exists!**". Choose to **Go Back to Register** or **Login**.

#### 2. User Login
   Click **LOGIN** in the navigator bar
   - if no user logged in, 
     - click each button in the navigator bar to check user can not get access to the content
     - enter Username and Password -> Click **Login** button
       - If successful, automatically get to the **USER** page
       - If unsuccessful, get a message "**login failed :(**". Click **Try Again** to go back to **Login** page.
   - if there is a user already logged in, there is a message "**Already logged in**" and a button to **Log Out**.

#### 3. User Page
Click **USER** in the navigator bar.
   - Click "**Get Some Recommendations!**" button to get 10 recipe recommendations according to the collections (takes about 2 minutes).
   - Can view your collections. If no collection, there is a message "**No Collection. Go to explore more!**"

#### 4. View list of all recipes
Click **RECIPES** in the navigator bar -> get to see all recipes with image and title linking to its own page -> move to other pages using the buttons at the bottom of the page

#### 5. Upload recipe
- Click **RECIPES** in the navigator bar
- Click "Upload a New Recipe"
- Enter Recipe Name, Ingredients and Instructions
- Click "**Create Recipe**" button
- if successful, get a message "**{recipe name} is successfully uploaded!!**". Click "**Continue Uploading New Recipe**" to go back.

#### 6. Individual Recipe Page
   From the list of all recipes, recipe recommendations and recipe collections -> click the **recipe title** -> get to recipe page
   - title
   - **Add to Collection**/**Remove from Collection** button
     - if the recipe is not in user's collection, click the **Add to Collection** to add it
       - Click "**USER**" in navigator bar to check it is added
     - if the recipe is already in user's collection, click the **Remove from Collection** to remove it
       - Click "**USER**" in navigator bar to check it is removed
   - image
   - ingredients
   - instructions
   - Click "**Get Similar Recipes**" -> get a list of 10 similar recipes (takes about 2 minutes)

#### 7. Search
Click SEARCH in the navigator bar
- Search by keyword
  - Enter keywords you want to search for
  - Click **Search**
  - Get 10 recipes with the keywords in the title, ingredients, or instructions
- Search by name
  - Enter recipe name you want to look up (must be exactly the same)
  - Click **Search**
  - Get up to 10 recipes with exactly the same name


### Building for Production
   To build the app for production to the build folder:
   ```sh
   npm run build
   ```
   This correctly bundles React in production mode and optimizes the build for the best performance.

