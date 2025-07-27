import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar({ user, onLogout }) {
    return (
        <div className="navbar">
            <div className="navbar-brand">
                <span className="navbar-title">FamiliQuest</span>
            </div>
            <ul>
                {user ? (
                    <>
                        <li><Link to="/dashboard">DASHBOARD</Link></li>
                        {user.type === 'parent' && <li><Link to="/assign-task">ASSIGN TASK</Link></li>}
                        <li><Link to="/customize-avatar">CUSTOMIZE</Link></li>
                        <li><button onClick={onLogout} className="logout-btn">LOGOUT</button></li>
                    </>
                ) : (
                    <>
                        <li><Link to="/">HOME</Link></li>
                        <li><Link to="/register">REGISTER</Link></li>
                        <li><Link to="/login">LOGIN</Link></li>
                        <li><Link to="/about">ABOUT</Link></li>
                    </>
                )}
            </ul>
        </div>
    );
}

export default Navbar;