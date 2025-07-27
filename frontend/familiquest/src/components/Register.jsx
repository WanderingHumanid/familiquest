import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTaskContext } from './TaskContext';
import './Login.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [profileType, setProfileType] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const navigate = useNavigate();
  const { login, user } = useTaskContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setAlreadyRegistered(false);
    try {
      // Register user
      const res = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, role: profileType })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');
      // Auto-login after registration
      await login(username, password, profileType);
      navigate('/dashboard');
    } catch (err) {
      // If user is already logged in and a network error occurs, show custom message
      if (user && (err.message === 'Failed to fetch' || err.message === 'NetworkError when attempting to fetch resource.')) {
        setAlreadyRegistered(true);
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
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
            onChange={e => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div className="input-group">
          <label>Profile Type:</label>
          <div className="profile-radio-group">
            <label className="profile-radio-label">
              <input
                type="radio"
                name="profileType"
                value="parent"
                checked={profileType === 'parent'}
                onChange={() => setProfileType('parent')}
                required
                disabled={loading}
              />
              <span className="profile-radio-custom"></span>
              Parent
            </label>
            <label className="profile-radio-label">
              <input
                type="radio"
                name="profileType"
                value="child"
                checked={profileType === 'child'}
                onChange={() => setProfileType('child')}
                required
                disabled={loading}
              />
              <span className="profile-radio-custom"></span>
              Child
            </label>
          </div>
        </div>
        {alreadyRegistered ? (
          <div className="error-message">
            This user is already registered and logged in.<br />
            <button type="button" className="login-button" onClick={() => navigate('/login')} style={{ marginTop: '12px' }}>
              Go to Login
            </button>
          </div>
        ) : error && <div className="error-message">{error}</div>}
        <button type="submit" className="login-button" disabled={loading || !profileType}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Register;