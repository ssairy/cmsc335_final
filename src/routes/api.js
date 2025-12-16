const express = require('express');
const SavedBook = require('../models/SavedBook');

const router = express.Router();

router.post('/saved', async (req, res, next) => {
  const { workId, title, author, coverId, year } = req.body;

  if (!workId || !title) {
    return res.redirect('/');
  }

  try {
    await SavedBook.updateOne(
      { workId },
      {
        $setOnInsert: {
          workId,
          title,
          author: author || undefined,
          coverId: coverId ? Number(coverId) : undefined,
          year: year ? Number(year) : undefined
        }
      },
      { upsert: true }
    );
    res.redirect('/');
  } catch (err) {
    next(err);
  }
});

router.post('/saved/:id/delete', async (req, res, next) => {
  try {
    await SavedBook.deleteOne({ _id: req.params.id });
    res.redirect('/');
  } catch (err) {
    next(err);
  }
});

module.exports = router;
