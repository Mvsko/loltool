const cheerio = require('cheerio');
const fetchData = require('./fetchData');

async function getTier() {
  const pageData = await fetchData();
  if (pageData) {
    const $ = cheerio.load(pageData);
    const tier = $('div.champion-tier.media-query.media-query_MOBILE_LARGE__DESKTOP_LARGE').find('div.value').first().text();
    return tier.trim() || 'Tier not found';
  }
  return 'Data not available';
}

module.exports = getTier;

