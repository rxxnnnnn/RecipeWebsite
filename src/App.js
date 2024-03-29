import "./App.css";
import Navbar from "./components/Navbar";
import RecipeDetail from "./pages/RecipeDetail";
import UserInfo from './pages/UserInfo';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Home from "./pages/Home";
import Search from "./pages/Search";
import AllRecipes from "./pages/AllRecipes";
import Upload from "./pages/Upload"
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
                    <Route path="/search" exact element={<Search />} />
                    <Route path="/upload" exact element={<Upload />} />
                </Routes>
            </AuthProvider>
        </Router>
    </div>
  );
}

export default App;
