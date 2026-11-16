
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import StudentsList from "./pages/StudentsList";

import "./App.css";

function App() {
    return (
        <BrowserRouter>

            <nav className="navbar">
                <h2>Mubuga TSS</h2>

                <div className="nav-links">
                    <Link to="/">Home</Link>
                    <Link to="/register">Registration</Link>
                    <Link to="/students">Students List</Link>
                </div>
            </nav>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/students" element={<StudentsList />} />
            </Routes>

        </BrowserRouter>
    );
}

export default App;
