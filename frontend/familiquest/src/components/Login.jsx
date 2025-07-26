import React, { useState } from 'react';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [profile, setProfile] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`Logging in as ${profile}: ${username}`);
        // Redirect logic can be added here
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Profile Type:</label>
                    <div>
                        <label>
                            <input
                                type="radio"
                                name="profile"
                                value="parent"
                                checked={profile === 'parent'}
                                onChange={() => setProfile('parent')}
                                required
                            />
                            Parent
                        </label>
                        <label style={{ marginLeft: '1rem' }}>
                            <input
                                type="radio"
                                name="profile"
                                value="child"
                                checked={profile === 'child'}
                                onChange={() => setProfile('child')}
                                required
                            />
                            Child
                        </label>
                    </div>
                </div>
                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    );
};

export default Login;