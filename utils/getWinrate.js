const cheerio = require('cheerio');
const fetchData = require('./fetchData');

async function getWinrate() {
  const pageData = await fetchData();
  if (pageData) {
    const $ = cheerio.load(pageData);
    const Winrate = $('.win-rate .value').first().text();
    return Winrate || 'Win rate not found';
  }
  return 'Data not available';
}

module.exports = getWinrate;
