import React, { useState, useEffect } from 'react';
import { useTaskContext } from './TaskContext';
import { useNavigate } from 'react-router-dom';
import * as api from '../services/api';
import Avatar from './Avatar';
import './Dashboard.css';

const Dashboard = () => {
  const { user, tasks, userProgress, completeTask, loading, error } = useTaskContext();
  const [allChildrenTasks, setAllChildrenTasks] = useState([]);
  const [children, setChildren] = useState([]);
  const navigate = useNavigate();
  const isParent = user?.type === 'parent';

  // Load children and their tasks for parents
  useEffect(() => {
    if (isParent) {
      loadChildrenAndTasks();
    }
  }, [isParent]);

  const loadChildrenAndTasks = async () => {
    try {
      // Load all users (children)
      const usersData = await api.getUsers();
      const childrenData = usersData.filter(user => user.role === 'child');
      setChildren(childrenData);

      // Load tasks for all children
      const allTasks = [];
      for (const child of childrenData) {
        try {
          const childTasks = await api.getQuests(child.id);
          allTasks.push(...childTasks.map(task => ({
            ...task,
            childName: child.username,
            childId: child.id
          })));
        } catch (err) {
          console.error(`Failed to load tasks for child ${child.username}:`, err);
        }
      }
      setAllChildrenTasks(allTasks);
    } catch (err) {
      console.error('Failed to load children and tasks:', err);
    }
  };

  const handleCompleteTask = async (taskId) => {
    try {
      await completeTask(taskId);
    } catch (err) {
      console.error('Failed to complete task:', err);
    }
  };

  const handleVerifyTask = async (taskId) => {
    try {
      await api.verifyQuest(taskId);
      loadChildrenAndTasks(); // Refresh the list
    } catch (err) {
      console.error('Failed to verify task:', err);
    }
  };

  const handleRejectTask = async (taskId) => {
    try {
      await api.rejectQuest(taskId);
      loadChildrenAndTasks(); // Refresh the list
    } catch (err) {
      console.error('Failed to reject task:', err);
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
            <h2>{isParent ? 'Children\'s Tasks' : 'Your Tasks'}</h2>
            {isParent && (
              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  className="dashboard-assign-btn" 
                  onClick={() => navigate('/assign-task')}
                >
                  Assign New Task
                </button>
                <button 
                  className="dashboard-assign-btn" 
                  onClick={loadChildrenAndTasks}
                  style={{ background: '#6B7280' }}
                >
                  Refresh
                </button>
              </div>
            )}
          </header>
          {loading && <div style={{ textAlign: 'center', padding: '20px' }}>Loading...</div>}
          {error && <div style={{ color: 'red', textAlign: 'center', padding: '10px' }}>{error}</div>}
          <ul className="dashboard-task-list">
            {isParent ? (
              // Parent view: Show all children's tasks
              <>
                {allChildrenTasks.length === 0 && !loading && (
                  <li className="dashboard-task-empty">No tasks assigned to children yet. Assign one to get started!</li>
                )}
                {allChildrenTasks.map(task => (
                  <li key={task.id} className={`dashboard-task-card${task.completed ? ' completed' : ''}${task.verified ? ' verified' : ''}`}>
                    <span className="dashboard-task-icon" role="img" aria-label="task">📝</span>
                    <div className="dashboard-task-info">
                      <span className="dashboard-task-title">{task.title}</span>
                      <span className="dashboard-task-meta">
                        <span className={`dashboard-task-difficulty diff-${task.difficulty.toLowerCase()}`}>{task.difficulty}</span>
                        <span className="dashboard-task-assignee">Assigned to: {task.childName}</span>
                        {task.verified && <span className="dashboard-task-status" title="Verified">✅</span>}
                        {task.completed && !task.verified && <span className="dashboard-task-status" title="Pending Verification">⏳</span>}
                        {!task.completed && <span className="dashboard-task-status" title="Not Started">📋</span>}
                      </span>
                    </div>
                    {task.completed && !task.verified && (
                      <div className="dashboard-task-actions">
                        <button 
                          onClick={() => handleVerifyTask(task.id)}
                          style={{
                            background: '#10B981',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            padding: '4px 8px',
                            fontSize: '0.8rem',
                            cursor: 'pointer',
                            marginRight: '8px'
                          }}
                        >
                          Verify
                        </button>
                        <button 
                          onClick={() => handleRejectTask(task.id)}
                          style={{
                            background: '#EF4444',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            padding: '4px 8px',
                            fontSize: '0.8rem',
                            cursor: 'pointer'
                          }}
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </li>
                ))}
              </>
            ) : (
              // Child view: Show only their own tasks
              <>
                {tasks.length === 0 && !loading && (
                  <li className="dashboard-task-empty">No tasks yet! Enjoy your free time!</li>
                )}
                {tasks.map(task => (
                  <li key={task.id} className={`dashboard-task-card${task.completed ? ' completed' : ''}${task.verified ? ' verified' : ''}`}>
                    <span className="dashboard-task-icon" role="img" aria-label="task">📝</span>
                    <div className="dashboard-task-info">
                      <span className="dashboard-task-title">{task.title}</span>
                      <span className="dashboard-task-meta">
                        <span className={`dashboard-task-difficulty diff-${task.difficulty.toLowerCase()}`}>{task.difficulty}</span>
                        {task.verified && <span className="dashboard-task-status" title="Verified">✅</span>}
                        {task.completed && !task.verified && <span className="dashboard-task-status" title="Pending Verification">⏳</span>}
                        {!task.completed && (
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
              </>
            )}
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