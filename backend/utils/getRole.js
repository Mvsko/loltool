const cheerio = require('cheerio');
const fetchData = require('./fetchData');

async function getRole() {
  const pageData = await fetchData();
  if (pageData) {
    const $ = cheerio.load(pageData);
    const roleText = $('span.champion-title').text();

    const roles = ['top', 'jungle', 'mid', 'adc', 'support'];
    const foundRole = roles.find(role => roleText.toLowerCase().includes(role));

    return foundRole || 'Role not found';
  }
  return 'Data not available';
}

module.exports = getRole;
