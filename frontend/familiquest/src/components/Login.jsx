import React, { useState } from 'react';
import { useTaskContext } from './TaskContext';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [profile, setProfile] = useState('');
    const { login, loading, error } = useTaskContext();
    const [localError, setLocalError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLocalError(null);
        if (!profile) {
            setLocalError('Please select a profile type');
            return;
        }
        try {
            await login(username, password, profile);
        } catch (err) {
            setLocalError('Invalid username, password, or role.');
        }
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
                        disabled={loading}
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
                        disabled={loading}
                    />
                </div>
                <div className="input-group">
                    <label>Profile Type:</label>
                    <div style={{ display: 'flex', gap: '2rem', marginTop: '0.5rem' }}>
                        <label>
                            <input
                                type="radio"
                                name="profileType"
                                value="parent"
                                checked={profile === 'parent'}
                                onChange={() => setProfile('parent')}
                                required
                                disabled={loading}
                            />
                            Parent
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="profileType"
                                value="child"
                                checked={profile === 'child'}
                                onChange={() => setProfile('child')}
                                required
                                disabled={loading}
                            />
                            Child
                        </label>
                    </div>
                </div>
                {(localError || error) && <div className="error-message">{localError || error}</div>}
                <button type="submit" className="login-button" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
};

export default Login;