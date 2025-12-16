# BookSaver

A minimal Express + MongoDB app for CMSC335 that lets you search the Open Library API and save your favorite books.

## Required Submission Info
- **Submitted by:** _Add name (directory ID)_
- **Group Members:** _Add names + directory IDs_
- **App Description:** Search Open Library and save books to MongoDB for later viewing/removal.
- **YouTube Video Demo Link:** _Add link to your demo_
- **APIs:** Open Library Search (https://openlibrary.org/developers/api)
- **Contact Email:** _Add preferred contact_
- **Deployed App Link:** _Add your Render (or other) deployment URL_

## What it does
- `/` lists saved books from MongoDB and lets you remove entries.
- `/search` shows a single search box powered by Open Library Search.
- `/search/results` fetches results from Open Library; each result has a Save button that stores it.

## Getting started
1. Copy the environment template and fill in your MongoDB URI:
   ```bash
   cp .env.example .env
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the app:
   ```bash
   npm start
   ```
4. Visit http://localhost:3000.

## Environment variables
- `MONGODB_URI` – your MongoDB connection string (Atlas or local)
- `PORT` – optional port override (defaults to 3000)

## Tech stack
- Express 5, EJS views with express-ejs-layouts
- Mongoose for MongoDB persistence
- Open Library Search API for book data

## Project structure
```
src/
  server.js         # Entry point
  app.js            # Express setup + middleware
  config/db.js      # MongoDB connection
  models/SavedBook.js
  routes/pages.js   # Page routes: home, search, results
  routes/api.js     # Save/remove actions
  services/openLibrary.js
  views/            # layout + pages
  public/css/site.css
```

## Notes
- Saved books are upserted by `workId` to avoid duplicates.
- Covers are displayed when Open Library provides `cover_i`.
