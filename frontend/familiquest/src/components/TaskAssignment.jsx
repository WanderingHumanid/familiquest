import React, { useState } from 'react';
import { useTaskContext } from './TaskContext';
import './TaskAssignment.css';

const TaskAssignment = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('Easy');
  const [assignee, setAssignee] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { addTask } = useTaskContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask({ title, description, difficulty });
    setSubmitted(true);
  };

  return (
    <div className="assign-split-bg">
      <div className="assign-split-container">
        {/* Left: Add Task */}
        <section className="assign-form-panel">
          <div className="assign-card">
            <h2><span role="img" aria-label="assign">📝</span> Assign a New Task</h2>
            {submitted ? (
              <div className="assign-confirmation">
                <span role="img" aria-label="check">✅</span> Task assigned successfully!
                <button className="assign-another-btn" onClick={() => setSubmitted(false)}>Assign Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="assign-form">
                <div className="assign-input-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required
                    placeholder="e.g. Clean your room"
                  />
                </div>
                <div className="assign-input-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    required
                    placeholder="Add details for the task..."
                  />
                </div>
                <div className="assign-input-row">
                  <div className="assign-input-group">
                    <label htmlFor="difficulty">Difficulty</label>
                    <select
                      id="difficulty"
                      value={difficulty}
                      onChange={e => setDifficulty(e.target.value)}
                    >
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>
                  <div className="assign-input-group">
                    <label htmlFor="assignee">Assign To</label>
                    <input
                      type="text"
                      id="assignee"
                      value={assignee}
                      onChange={e => setAssignee(e.target.value)}
                      required
                      placeholder="e.g. Alex"
                    />
                  </div>
                </div>
                <button type="submit" className="assign-submit-btn">Assign Task</button>
              </form>
            )}
          </div>
        </section>
        {/* Right: Previously Assigned Tasks & Child Progress */}
        <aside className="assign-progress-panel">
          <div className="assign-progress-card">
            <h3>Previously Assigned Tasks</h3>
            <ul className="assign-task-list">
              <li className="assign-task-placeholder">No tasks assigned yet.</li>
              <li className="assign-task-placeholder">(Tasks from the database will appear here)</li>
            </ul>
          </div>
          <div className="assign-progress-card">
            <h3>Child Progress</h3>
            <div className="assign-progress-placeholder">
              <div className="assign-progress-avatar" />
              <div className="assign-progress-details">
                <div className="assign-progress-detail"><span>Level:</span> <span className="placeholder">--</span></div>
                <div className="assign-progress-detail"><span>Streak:</span> <span className="placeholder">--</span></div>
                <div className="assign-progress-detail"><span>Points:</span> <span className="placeholder">--</span></div>
                <div className="assign-progress-detail"><span>XP to next level:</span> <span className="placeholder">--</span></div>
              </div>
            </div>
            <div className="assign-progress-note">No progress data yet. (Will be loaded from the database.)</div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default TaskAssignment; 