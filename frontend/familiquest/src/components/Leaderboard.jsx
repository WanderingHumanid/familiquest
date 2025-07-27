import React, { useEffect, useState } from 'react';
import * as api from '../services/api';
import './Leaderboard.css';

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await api.getLeaderboard();
        setLeaders(data);
      } catch (err) {
        setError('Failed to load leaderboard');
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  return (
    <div className="leaderboard-container">
      <h2>Leaderboard</h2>
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {!loading && !error && (
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Username</th>
              <th>XP</th>
              <th>Points</th>
              <th>Level</th>
            </tr>
          </thead>
          <tbody>
            {leaders.map((child, idx) => (
              <tr key={child.username}>
                <td>{idx + 1}</td>
                <td>{child.username}</td>
                <td>{child.xp}</td>
                <td>{child.points}</td>
                <td>{child.level}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Leaderboard; 