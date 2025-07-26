import React from 'react';
import { useTaskContext } from './TaskContext';
import Avatar from './Avatar';
import './Dashboard.css';

const Dashboard = () => {
  const { user, tasks } = useTaskContext();
  const isParent = user.type === 'parent';
  // Mock stats for now
  const streak = 4;
  const level = 3;
  const points = 1200;
  const xp = 180;
  const xpToNext = 40;

  return (
    <div className="dashboard-split-bg">
      <div className="dashboard-split-container">
        {/* Left: Tasks */}
        <section className="dashboard-tasks-panel">
          <header className="dashboard-tasks-header">
            <h2>{isParent ? 'Tasks to Assign' : 'Your Tasks'}</h2>
            {isParent && <button className="dashboard-assign-btn">Assign New Task</button>}
          </header>
          <ul className="dashboard-task-list">
            {tasks.length === 0 && (
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
              <span className="dashboard-stat-value">🔥 {streak} days</span>
            </div>
            <div className="dashboard-stat-card">
              <span className="dashboard-stat-label">Level</span>
              <span className="dashboard-stat-value">{level}</span>
              <div className="dashboard-level-bar">
                <div className="dashboard-level-bar-inner" style={{ width: `${(xp/(xp+xpToNext))*100}%` }} />
              </div>
              <span className="dashboard-stat-sub">{xp} XP / {xp+xpToNext} XP</span>
            </div>
            <div className="dashboard-stat-card">
              <span className="dashboard-stat-label">Points</span>
              <span className="dashboard-stat-value">{points}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Dashboard; 