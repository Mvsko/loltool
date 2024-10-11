const cheerio = require('cheerio');
const fetchData = require('./fetchData');

async function getEloSearched() {
  const pageData = await fetchData();
  if (pageData) {
    const $ = cheerio.load(pageData);
    const Elo = $('div.rank-option').find('span').first().text();
    let noSpaces = Elo.trim().replace(/\s+/g, '');
    return noSpaces || 'Elo not found';
  }
  return 'Data not available';
}

module.exports = getEloSearched;

