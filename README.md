# Recipe Website
## Introduction
A React Application for viewing recipes and getting recommendations. \
Functionalities: 
- user registration
- user login
- view list of all recipes
- view detailed information of recipe and 10 more similar recipes
- 

This application uses the services provided by https://github.com/4156-project/WhatToEatToday. \
APIs used: 
- /recommend/item - find similar recipes of a recipe
- /recommend/user - provide recipe recommendations given a user's collection of recipes
- /user/register - user registration
- /user/verify - user login
- /query/category/list/info - get the total number of recipes for display
- /query/content/ - get a list all recipes
- /query/content/single-condition - get detailed information of a recipe \

By using the service, users of this application can get recipe recommendation according to their interactions and collections. In this way, users can better engage with this website and get a better user experience.

## How to Build, Test, and Run

These instructions will get you a copy of the project up and running on your local machine.

### Prerequisites

What things you need to install the software and how to install them:

- [Node.js](https://nodejs.org/) (preferably the latest version)
- A package manager like [npm](https://www.npmjs.com/) (usually comes with Node.js) or [yarn](https://yarnpkg.com/)

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
### Test Guide
1. Test user functions
   1. REGISTER

### Building for Production
   To build the app for production to the build folder:
   ```sh
   npm run build
   ```
   This correctly bundles React in production mode and optimizes the build for the best performance.

