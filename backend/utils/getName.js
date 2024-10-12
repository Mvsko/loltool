const cheerio = require('cheerio');
const fetchData = require('./fetchData');

async function getName() {
  const pageData = await fetchData();
  if (pageData) {
    const $ = cheerio.load(pageData);
    const Name = $('.champion-label .champion-name').first().text();
    return Name.trim() || 'Name not found';
  }
  return 'Data not available';
}

module.exports = getName;
