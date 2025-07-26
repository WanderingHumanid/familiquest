# 🏰 FamiliQuest: Turn Your Family Chores into Epic Adventures!

**Tagline**: *Level up your family life, one quest at a time.*

FamiliQuest transforms everyday chores and responsibilities into an engaging role-playing game (RPG) for families. With gamification at its heart, it fosters teamwork, builds positive habits in children, and strengthens family bonds — all through fun quests, XP rewards, streaks, avatars, and boss battles.

---

## 🚀 Features

### 🎯 Quest Management
- **Parents as Quest Masters** assign tasks like "Tidy Your Chamber" or "Master Algebra".
- Tasks categorized into **Daily**, **Weekly**, and **Epic Quests**.
- Require **proof via photo uploads**, verified by parents.
- Includes **sleep/screen-time tracking** as recurring wellness quests.

### 🧙‍♂️ Character Progression
- Customizable **avatars** level up with completed quests.
- Unlock **new outfits, accessories, and gear** as rewards.
- XP, levels, **badges**, and **titles** (e.g., "Master of Tidiness").

### 🔥 Streaks and Rewards
- Maintain **daily and weekly streaks** for bonus XP.
- Special **Family Rewards**: Pizza Night, No-Chore Weekends, etc.
- **Skill Trees** for Responsibility, Creativity, Academics.

### 🛡️ Family-Wide System
- Shared **Family Persona** that levels up together.
- Collaborative **Boss Battles** like "The Great Garage Clean-out Dragon".
- Private **Family Feed** to celebrate each other’s wins with "Kudos".

---

## 🛠️ Tech Stack

| Layer         | Tech Used         |
|---------------|------------------|
| Frontend      | React.js, Tailwind CSS |
| Backend       | Flask (Python), Flask-SQLAlchemy |
| Database      | SQLite (lightweight, serverless) |
| Auth (Basic)  | Simple JS-based mock validation |
| Deployment    | Render.com |
| VCS           | Git + GitHub |

---

## 🧠 Future Scope

- 🧾 **OCR-Based Chore Verification**: Automate proof of task completion from text/images (e.g., homework photos).
- 🧠 **AI-Generated Quest Suggestions**: Suggest chores dynamically based on child’s past activity and age.
- 📱 **Mobile App Version**: For push notifications and easier task tracking.
- 🔐 **Gamified Time Lock for Screen Time**: Auto-lock screens if streaks are broken.
- 🧩 **Integrations**: Smart Home API support (e.g., smart lights, switches) to detect chores in real-time.
- 🎮 **Sibling PvP Challenges**: Friendly competitions with parent-approved quests.
- 🗺️ **Quests World Map UI**: A visual world map to unlock areas as quests are completed.

---

## ⚙️ Getting Started (Backend)

```bash
git clone https://github.com/WanderingHumanoid/familiquest.git
cd familiquest
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
export FLASK_APP=run.py
flask shell
# Then run inside shell:
# >>> from app import db, create_app
# >>> app = create_app()
# >>> with app.app_context():
# ...     db.create_all()