# Household Expense Tracker

A beginner-friendly web app for tracking household expenses.

## Features

- Dashboard with key numbers
- Add expense form
- Category filter
- Monthly total (for the current month)
- Sample data preloaded

## Tech stack

- **React (via CDN)**
- Plain CSS

> This project uses one framework only: React.

## Option B (chosen): Host on GitHub Pages (no local setup needed)

Follow these exact steps in GitHub:

1. Push this project to a GitHub repository.
2. In GitHub, open your repo page.
3. Click the **Settings** tab.
4. In the left sidebar, click **Pages**.
5. Under **Build and deployment**:
   - **Source**: choose **GitHub Actions**.
6. Go back to the repo and click the **Actions** tab.
7. Click the workflow named **Deploy static site to GitHub Pages**.
8. Click **Run workflow** (top-right), then click the green **Run workflow** button.
9. Wait for the workflow to finish (green check mark).
10. Open **Settings → Pages** again and click the live site URL shown there.

Your app will be hosted at a URL like:

```text
https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/
```

## Optional local run (Mac)

If you still want to run it locally on Mac:

1. Open **Terminal**.
2. `cd` into the project folder.
3. Run:

```bash
python3 -m http.server 8000
```

4. Open:

```text
http://localhost:8000
```

## What you should see on screen

When the app opens, you should see:

1. A page title: **Household Expense Tracker**.
2. A **dashboard** with 3 cards:
   - Monthly Total
   - All-time Total
   - Expenses Count
3. An **Add Expense** form with fields:
   - Name
   - Amount
   - Category
   - Date
4. A **Filter by category** dropdown.
5. A table listing sample expenses (Groceries, Electric Bill, etc.).

### Quick working check

- Add an expense (example: `Water Bill`, `45`, `Utilities`, today).
- Click **Add Expense**.
- You should see a new row in the table and totals update.
- Change filter to **Utilities** and confirm only utility expenses remain.

## Project structure (plain English)

- `index.html` — Loads the page, React, and the app script.
- `styles.css` — Handles the clean, modern styling.
- `app.jsx` — Contains all app logic and UI (dashboard, form, filter, table).
- `.github/workflows/deploy-pages.yml` — Auto-deploys the app to GitHub Pages.
- `README.md` — Explains setup and usage.
