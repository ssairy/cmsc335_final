const express = require('express');
const SavedBook = require('../models/SavedBook');
const openLibrary = require('../services/openLibrary');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const books = await SavedBook.find().sort({ savedAt: -1 });
    res.render('home', { title: 'Saved Books', books });
  } catch (err) {
    next(err);
  }
});

router.get('/search', (req, res) => {
  res.render('search', { title: 'Search Books' });
});

router.get('/search/results', async (req, res) => {
  const q = (req.query.q || '').trim();

  if (!q) {
    return res.render('results', {
      title: 'Search Results',
      query: '',
      results: [],
      error: null
    });
  }

  try {
    const results = await openLibrary.search(q);
    res.render('results', {
      title: 'Search Results',
      query: q,
      results,
      error: null
    });
  } catch (err) {
    console.error('Open Library search failed:', err);
    res.render('results', {
      title: 'Search Results',
      query: q,
      results: [],
      error: 'Could not fetch books right now. Please try again.'
    });
  }
});

module.exports = router;
