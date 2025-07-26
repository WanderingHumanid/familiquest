import './Home.css';
function Home() {
  return (
    <>
      <section className="hero">
        <h2>Turn Your Family Chores into Epic Adventures</h2>
        <p>
          FamiliQuest gamifies household responsibilities to promote teamwork,
          healthy habits, and fun learning—all within your home.
        </p>
        <button>Get Started</button>
      </section>

      <section id="features" className="features">
        <h3>Core Features</h3>
        <div className="feature-grid">

          <div className="feature-card">
            <h4>Quest & Task System</h4>
            <ul>
              <li>Parents assign from a chore list</li>
              <li>Photo verification for tasks</li>
              <li>Track sleep and healthy habits</li>
              <li>Parents model behavior too</li>
            </ul>
          </div>

          <div className="feature-card">
            <h4>Energy & Gentle Consequences</h4>
            <ul>
              <li>Stamina bar teaches balance</li>
              <li>Missed tasks reset streaks, no punishment</li>
            </ul>
          </div>

          <div className="feature-card">
            <h4>Persona & Progression</h4>
            <ul>
              <li>Custom avatars for all</li>
              <li>XP, streaks, and leveling</li>
              <li>Badges and titles unlock</li>
            </ul>
          </div>

          <div className="feature-card">
            <h4>The Family Unit</h4>
            <ul>
              <li>Collaborative family profile</li>
              <li>Weekly group quests</li>
            </ul>
          </div>

        </div>
      </section>
      <footer id="contact" className="footer">
        <p>© 2025 FamiliQuest. All rights reserved.</p>
        <p>Email: support@familiquest.app</p>
      </footer>
    </>
  );
}


export default Home;