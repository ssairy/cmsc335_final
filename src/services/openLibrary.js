const fetch = (...args) => import('node-fetch').then(({ default: fetchFn }) => fetchFn(...args));

const BASE_URL = 'https://openlibrary.org/search.json';

function formatWorkId(key = '') {
  return key.replace('/works/', '');
}

async function search(query) {
  if (!query) {
    return [];
  }

  const url = `${BASE_URL}?q=${encodeURIComponent(query)}&limit=10&fields=key,title,author_name,cover_i,first_publish_year`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Open Library request failed with status ${response.status}`);
  }

  const data = await response.json();

  return (data.docs || []).map((doc) => ({
    workId: formatWorkId(doc.key),
    title: doc.title || 'Untitled',
    author: doc.author_name ? doc.author_name[0] : '',
    coverId: doc.cover_i,
    year: doc.first_publish_year
  }));
}

module.exports = { search };
