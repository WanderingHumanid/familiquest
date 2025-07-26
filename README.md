# FamiliQuest Backend

A Flask-based backend for FamiliQuest.

## Setup

1. Create a virtual environment:
    ```
    python3 -m venv venv
    source venv/bin/activate
    ```
2. Install dependencies:
    ```
    pip install -r requirements.txt
    ```
3. Copy `.env.example` to `.env` and set your secrets.
4. Run the app:
    ```
    python run.py
    ```

## Project Structure

- `app/` — Main application code (models, routes, utils)
- `instance/` — SQLite database (auto-created)
- `config.py` — App configuration
- `run.py` — Entry point
- `requirements.txt` — Dependencies
- `.env.example` — Environment variable template
- `render.yaml` — Render deployment config

## Sample API

- `POST /api/register` — Register a user
- `GET /api/quests` — List all quests

---

**Ready for further development!**
