const mongoose = require('mongoose');

async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('MONGODB_URI is not set in the environment');
  }

  // Guard against leaving placeholder values in .env (common when copying templates)
  const stillTemplate =
    uri.includes('<username>') ||
    uri.includes('<password>') ||
    uri.includes('<cluster-url>');
  if (stillTemplate) {
    throw new Error(
      'MONGODB_URI still has placeholders. Set it to a real connection string, e.g. ' +
        'mongodb://127.0.0.1:27017/booksaver for local MongoDB or your Atlas URI.'
    );
  }

  mongoose.set('strictQuery', false);
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
  console.log('MongoDB connected');
}

module.exports = connectDB;
