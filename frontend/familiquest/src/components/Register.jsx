import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [profileType, setProfileType] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Registration logic here (API call, etc.)
    if (profileType === 'parent') {
      navigate('/parent-dashboard');
    } else if (profileType === 'child') {
      navigate('/child-dashboard');
    }
  };

  return (
    <div className="register-container">
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
          />
        </div>
        <div className="input-group">
          <label>Profile Type:</label>
          <div>
            <label>
              <input
                type="radio"
                name="profileType"
                value="parent"
                checked={profileType === 'parent'}
                onChange={() => setProfileType('parent')}
                required
              />
              Parent
            </label>
            <label style={{ marginLeft: '1rem' }}>
              <input
                type="radio"
                name="profileType"
                value="child"
                checked={profileType === 'child'}
                onChange={() => setProfileType('child')}
                required
              />
              Child
            </label>
          </div>
        </div>
        <button type="submit" className="register-button">Register</button>
      </form>
    </div>
  );
};

export default Register;