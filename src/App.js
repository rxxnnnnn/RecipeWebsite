import "./App.css";
import Navbar from "./components/Navbar";
import RecipeDetail from "./components/RecipeDetail";
import Home from "./pages/Home";
import AllRecipes from "./pages/AllRecipes";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
function App() {
  return (
    <div className="App">
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" exact element={<Home />}/>
                <Route path="/all" exact element={<AllRecipes />}/>
                <Route path="/recipe/:id" exact element={<RecipeDetail />} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;
