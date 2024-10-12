const cheerio = require('cheerio');
const fetchData = require('./fetchData');

async function getRank() {
  const pageData = await fetchData();
  if (pageData) {
    const $ = cheerio.load(pageData);
    const rank = $('.overall-rank .value').first().text();
    let noSpaces = rank.trim().replace(/\s+/g, '');
    return noSpaces || 'Rank not found';
  }
  return 'Data not available';
}

module.exports = getRank;
