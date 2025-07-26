import React from 'react';
import { useTaskContext } from './TaskContext';
import Avatar from './Avatar';
import './Dashboard.css';

const Dashboard = () => {
  const { user, tasks, userProgress, completeTask, loading, error } = useTaskContext();
  const isParent = user?.type === 'parent';

  const handleCompleteTask = async (taskId) => {
    try {
      await completeTask(taskId);
    } catch (err) {
      console.error('Failed to complete task:', err);
    }
  };

  if (!user) {
    return (
      <div className="dashboard-split-bg">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h2>Please log in to view your dashboard</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-split-bg">
      <div className="dashboard-split-container">
        {/* Left: Tasks */}
        <section className="dashboard-tasks-panel">
          <header className="dashboard-tasks-header">
            <h2>{isParent ? 'Tasks to Assign' : 'Your Tasks'}</h2>
            {isParent && <button className="dashboard-assign-btn">Assign New Task</button>}
          </header>
          {loading && <div style={{ textAlign: 'center', padding: '20px' }}>Loading...</div>}
          {error && <div style={{ color: 'red', textAlign: 'center', padding: '10px' }}>{error}</div>}
          <ul className="dashboard-task-list">
            {tasks.length === 0 && !loading && (
              <li className="dashboard-task-empty">No tasks yet! {isParent ? 'Assign one to get started.' : 'Enjoy your free time!'}</li>
            )}
            {tasks.map(task => (
              <li key={task.id} className={`dashboard-task-card${task.completed ? ' completed' : ''}`}>
                <span className="dashboard-task-icon" role="img" aria-label="task">📝</span>
                <div className="dashboard-task-info">
                  <span className="dashboard-task-title">{task.title}</span>
                  <span className="dashboard-task-meta">
                    <span className={`dashboard-task-difficulty diff-${task.difficulty.toLowerCase()}`}>{task.difficulty}</span>
                    {task.completed && <span className="dashboard-task-status" title="Completed">✔️</span>}
                    {!task.completed && !isParent && (
                      <button 
                        onClick={() => handleCompleteTask(task.id)}
                        style={{
                          background: '#7C3AED',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '4px 8px',
                          fontSize: '0.8rem',
                          cursor: 'pointer',
                          marginLeft: '8px'
                        }}
                      >
                        Complete
                      </button>
                    )}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </section>
        {/* Right: Avatar & Stats */}
        <aside className="dashboard-user-panel">
          <div className="dashboard-avatar-box">
            <Avatar />
            <button className="dashboard-customize-btn">Customize</button>
          </div>
          <div className="dashboard-user-stats">
            <div className="dashboard-stat-card">
              <span className="dashboard-stat-label">Streak</span>
              <span className="dashboard-stat-value">🔥 {userProgress.streak} days</span>
            </div>
            <div className="dashboard-stat-card">
              <span className="dashboard-stat-label">Level</span>
              <span className="dashboard-stat-value">{userProgress.level}</span>
              <div className="dashboard-level-bar">
                <div 
                  className="dashboard-level-bar-inner" 
                  style={{ 
                    width: `${Math.min((userProgress.xp % 100) / 100 * 100, 100)}%` 
                  }} 
                />
              </div>
              <span className="dashboard-stat-sub">{userProgress.xp} XP</span>
            </div>
            <div className="dashboard-stat-card">
              <span className="dashboard-stat-label">Points</span>
              <span className="dashboard-stat-value">{userProgress.points}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Dashboard; 