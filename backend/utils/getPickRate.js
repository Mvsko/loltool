const cheerio = require('cheerio');
const fetchData = require('./fetchData');

async function getPickRate() {
  const pageData = await fetchData();
  if (pageData) {
    const $ = cheerio.load(pageData);
    const pickRate = $('.pick-rate .value').first().text();
    return pickRate || 'Pick rate not found';
  }
  return 'Data not available';
}

module.exports = getPickRate;
