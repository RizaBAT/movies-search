import "./App.css";
import Search from "./components/Search";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import MovieDetails from "./components/MovieDetails";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
      <Router>
       <Navbar/>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/search" element={<Search />} />
          <Route path="/movieDetails/:id" element={<MovieDetails />} />
        </Routes>
      </Router>
  );
}

export default App;
