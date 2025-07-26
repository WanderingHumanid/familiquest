import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    return (
        <div className="navbar">
            <div className="navbar-brand">
                <span className="navbar-title">FamiliQuest</span>
            </div>
            <ul>
                <li><Link to="/">HOME</Link></li>
                <li><Link to="/register">REGISTER</Link></li>
                <li><Link to="/login">LOGIN</Link></li>
                <li><Link to="/about">ABOUT</Link></li>
                <li><Link to="/contact">CONTACT</Link></li>
            </ul>
        </div>
    );
}

export default Navbar;