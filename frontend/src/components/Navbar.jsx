import { Link } from "react-router-dom";
import "../styles/navbar.css";
function Navbar() {
    return(
        <nav className="navbar">
            <Link to="/" className="logo">CareerCompass</Link>

            <ul className="nav-links">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="dashboard">Dashboard</Link>
                </li>
                <li>
             <Link to="/roadmap">Roadmap</Link>
                </li>

                <li>
                    <Link to="/practice">Practice</Link>
                </li>
                <li>
                    <Link to="/resume">Resume</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                </ul>
                </nav>
    );  
}
export default Navbar;
