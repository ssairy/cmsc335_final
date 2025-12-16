const { Schema, model } = require('mongoose');

const savedBookSchema = new Schema({
  workId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  author: { type: String },
  coverId: { type: Number },
  year: { type: Number },
  savedAt: { type: Date, default: Date.now }
});

module.exports = model('SavedBook', savedBookSchema);
