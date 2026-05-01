# Anime Simple

A simple anime search and detail application built with Django for the backend and React for the frontend.

## Project Structure

- `backend/` - Django backend
- `frontend/` - React frontend

## Backend

The Django backend provides an API for searching anime and retrieving anime details.

### Setup

1. Activate your Python virtual environment:
   ```bash
   cd backend
   venv\Scripts\Activate.ps1
   ```
2. Install dependencies if not already installed:
   ```bash
   pip install -r requirements.txt
   ```
3. Run migrations:
   ```bash
   python manage.py migrate
   ```
4. Start the development server:
   ```bash
   python manage.py runserver
   ```

The backend will run on `http://127.0.0.1:8000/`.

## Frontend

The React frontend calls the Django API for anime search and detail pages.

### Setup

1. Install Node dependencies:
   ```bash
   cd frontend
   npm install
   ```
2. Start the development server:
   ```bash
   npm start
   ```

The frontend will run on `http://localhost:3000/`.

## Notes

- Make sure the backend server is running before using the frontend.
- CORS is configured for local development.
- The root `.gitignore` excludes common Python, Django, Node, and editor files.

## Git

To initialize and push the repository:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin master
```

If your branch is `main`, use `git push -u origin main` instead.
