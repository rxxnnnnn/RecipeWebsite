import "./App.css";
import Navbar from "./components/Navbar";
import RecipeDetail from "./components/RecipeDetail";
import UserInfo from './components/UserInfo';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Home from "./pages/Home";
import AllRecipes from "./pages/AllRecipes";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
function App() {
  return (
    <div className="App">
        <Router>
            <AuthProvider>
                <Navbar />
                <Routes>
                    <Route path="/" exact element={<Home />}/>
                    <Route path="/all" exact element={<AllRecipes />}/>
                    <Route path="/recipe/:id" exact element={<RecipeDetail />} />
                    <Route path="/user/:username" element={<UserInfo />} />
                    <Route path="/login" exact element={<LoginPage />} />
                    <Route path="/register" exact element={<RegisterPage />} />
                </Routes>
            </AuthProvider>
        </Router>
    </div>
  );
}

export default App;
