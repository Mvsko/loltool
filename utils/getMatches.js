const cheerio = require('cheerio');
const fetchData = require('./fetchData');

async function getMatches() {
  const pageData = await fetchData();
  if (pageData) {
    const $ = cheerio.load(pageData);
    const Matches = $('.matches .value').first().text();
    return Matches || 'Matches not found';
  }
  return 'Data not available';
}

module.exports = getMatches;
