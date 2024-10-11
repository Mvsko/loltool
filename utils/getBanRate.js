const cheerio = require('cheerio');
const fetchData = require('./fetchData');

async function getBanRate() {
  const pageData = await fetchData();
  if (pageData) {
    const $ = cheerio.load(pageData);
    const BanRate = $('.ban-rate .value').first().text();
    return BanRate.trim() || 'BanRate not found';
  }
  return 'Data not available';
}

module.exports = getBanRate;

