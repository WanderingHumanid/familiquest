# FamiliQuest

**Making Family Tasks Rewarding, One Quest at a Time**

FamiliQuest is a chore and habit management app that uses light gamification to help families build healthy routines and shared accountability. Designed for all ages, the app turns everyday responsibilities into structured, trackable **quests**, motivating children and parents alike through progress, achievements, and gentle feedback.

---

## The Problem

Traditional chore charts often fall short:
- Children lose motivation without consistent positive feedback.
- Parents face overhead in assigning and tracking responsibilities.
- There's little sense of shared progress or recognition.

---

## Our Solution

FamiliQuest offers a simple, fun, and collaborative way for families to organize tasks.

- **Parents** assign quests from a pre-made task list and verify completion.
- **Children** complete quests to earn XP, unlock avatar items, and build habits.
- The **Family** works together toward shared achievements and weekly goals.

---

## Key Features

### 1. Task & Quest System

- **Pre-defined Quests:** Parents assign tasks from a curated list (clean room, do homework, brush teeth, etc.) to reduce management time.
- **Task Difficulty Levels:**
  - Easy — 15 XP  
  - Medium — 30 XP  
  - Hard — 50 XP  
- **Completion Proof (Optional):** Tasks can require a photo before marking as complete.
- **Wellness Habits:** Supports recurring routines like tracking sleep or brushing teeth.
- **Adult Participation:** Parents can assign and complete quests too, modeling shared responsibility.

---

### 2. Gentle Feedback System

- **Streaks & XP Bonuses:** 

- **Missed Quests:**
  - Streak bonus resets
  - Stamina regeneration slows temporarily (stamina = quest energy system)

- **Stamina System:**
  - Each quest consumes stamina (encourages pacing)
  - Stamina regenerates daily or after breaks

---

### 3. Progression & Rewards

- **XP-Based Leveling Curve:**
  - Level 1 → 2 = 10 XP  
  - Level 2 → 3 = 20 XP  
  - Level 3 → 4 = 40 XP  
  - Up to level 10 included in MVP  

- **Points System:**
  - Earn 10 points per 1 XP
  - Use points to purchase avatar customizations

- **Avatar Customization:**
  - Start with a basic avatar
  - Unlock new items (shirts, accessories, pets) by leveling up and spending points

- **Achievements & Badges:**
  - First Quest Completed
  - 5-Day Streak
  - Family Collaboration
  - Cosmetic Collector (buy 5 items)

---

### 4. Family Dashboard

- **Family View:** See each member’s progress, avatar, level, and badges in one place
- **Shared Quests:** Weekly group tasks like “Clean the garage” or “Tidy the living room”
- **Family Rewards:** Completing shared quests unlocks simple rewards like:
  - Choose the weekend movie
  - No chores on Sunday

---

## Tech Stack

| Category      | Technology         |
|---------------|--------------------|
| Frontend      | ReactJS            |
| Backend       | Python + Flask     |
| Database      | SQLite             |
| Styling       | CSS                |
| Deployment    | Render             |

---

## Getting Started (Local Dev)

1. **Clone the repository:**
    ```bash
    git clone https://github.com/WanderingHumanid/familiquest.git
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd FamiliQuest
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Start the development server:**
    ```bash
    npm run dev
    ```

5. Open your browser and go to `http://localhost:3000`.

---


### Future Scope

-   **Smart Quest Suggestions (AI-Based):** Leverage AI/ML to recommend age-appropriate quests based on past performance, calendar events, and behavioral analytics.
-   **OCR-Based Task Verification:** Use Optical Character Recognition (OCR) to automatically verify image-based tasks, such as homework snapshots or room cleanliness.
-   **Mobile App Integration (React Native):** Develop a cross-platform mobile app with push notifications and offline support.

---

### Team Technocrats